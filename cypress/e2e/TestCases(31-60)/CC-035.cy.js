import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('Validar configuración de impresión para Factura Carta', () => {
  beforeEach('Visitar página e iniciar sesión', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función que realiza el inicio de sesión
  });

  it('Validar que, al deseleccionar la opción "Generar" para el formato "Factura Carta", esta no esté visible ni disponible al imprimir', () => {
    // Abrir configuración de impresiones
    abrirParametros();

    // Acceder a la configuración específica de "Factura Carta"
    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').should('be.visible').click();

    // Desactivar la opción "Generar" para Factura Carta si está activada
    cy.get('#chk_val_1_2').should('be.visible').then(($switch) => {
      if ($switch.is(':checked')) {
        cy.wrap($switch).click(); // Desactiva la opción
        cy.log('✅ Opción "Generar" para Factura Carta desactivada.');
      } else {
        cy.log('👍 Opción "Generar" para Factura Carta ya estaba desactivada.');
      }
    });

    // Cerrar el modal de configuración
    closeModal();
    cy.wait(1000);

    // Acceder a la lista de facturas
    abrirListaFacturacion();

    // Seleccionar una factura específica
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();

    // Verificar que la opción "Factura Carta" no esté visible
    cy.get('[value="Carta"]').scrollIntoView().then(($opcion) => {
        if ($opcion.length === 0) {
          cy.log('✅ La opción "Factura Carta" no está disponible para selección, como se esperaba.');
        } else {
          cy.log('❌ La opción "Factura Carta" todavía está disponible, esto no debería ocurrir.');
          throw new Error('La opción "Factura Carta" sigue visible a pesar de haber sido desactivada.');
        }
      });

    // Cerrar el modal del detalle de la factura (si aplica)
     cy.get('#btnDlgShowFacturaClose').click();
  });

  afterEach(() => {
    SingOut(); // Función para cerrar sesión
  });
});

// Manejo de excepciones globales
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba por errores irrelevantes
  }
});
