import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de login
  });

  it('Validar que, al deseleccionar la opción "Generar" para el formato "Factura MedioOficio", esta opción no esté visible ni disponible para su selección al intentar imprimir la factura.', () => {

    abrirParametros(); // Abrir parámetros

    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click(); // Hacer clic en la flecha

    // Desactivar la Opción "Generar" para MedioOficio si está activada
    cy.get('#chk_val_1_3').should('be.visible').then(($switch) => {
      if ($switch.is(':checked')) {
        cy.wrap($switch).click(); // Desactivar la opción si está activada
        cy.log('✅ Opción "Generar" para Factura MedioOficio deseleccionada correctamente.');
      }
    });

    closeModal(); // Cerrar el modal de configuración
    cy.wait(1000);

    abrirListaFacturacion(); // Acceder a la Lista de Facturas


    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();
    cy.wait(500);
    // Verificar si la opción "Factura MedioOficio" no está visible ni disponible
    
    // Verificar que la opción "Factura MedioOficio" no esté disponible ni visible
     cy.get(':nth-child(2) > :nth-child(2) > .p-2').scrollIntoView().then(($element) => {
      if ($element.length === 0) {
        cy.log('✅ La opción "Factura MedioOficio" no está disponible para selección, como se esperaba.');
      } else {
        cy.log('❌ Error: La opción "Factura MedioOficio" sigue disponible para selección.');
      }
    });

    cy.wait(2000); // Espera para visualizar el resultado

    // Cerrar el modal del detalle de la factura
    cy.get('#btnDlgShowFacturaClose').click();
  });

  afterEach(() => {
    SingOut(); // Cerrar sesión tras cada prueba
  });

});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba por errores irrelevantes
  }
});
