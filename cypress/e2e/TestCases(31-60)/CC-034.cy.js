import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('Validar la configuración e impresión de factura Rollo55', () => {
  beforeEach('Visitar la página e iniciar sesión', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  });

  it('Validar que, al activar la opción "Incluir Ticket" para el formato "Factura Rollo55", se incluya un ticket adicional al momento de imprimir la factura.', () => {
    // Inicio de sesión
    login();

    // Acceder a las configuraciones de impresión
    abrirParametros();

    // Abrir las configuraciones específicas de Rollo55
    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line')
      .should('be.visible')
      .click();

    // Activar la opción "Generar para Rollo55" si no está activa
    cy.get('#chk_val_1_1').should('be.visible').then(($switch) => {
        if (!$switch.is(':checked')) {
          cy.wrap($switch).click();
          cy.log('✅ Opción "Generar para Rollo55" activada.');
        } else {
          cy.log('👍 Opción "Generar para Rollo55" ya estaba activada.');
        }
      });

    // Activar la opción "Incluir Ticket para Rollo55" si no está activa
    cy.get('#chk_val_2_1').should('be.visible').then(($switch) => {
        if (!$switch.is(':checked')) {
          cy.wrap($switch).click();
          cy.log('✅ Opción "Incluir Ticket para Rollo55" activada.');
        } else {
          cy.log('👍 Opción "Incluir Ticket para Rollo55" ya estaba activada.');
        }
      });

    // Cerrar el modal de configuración
    closeModal();
    cy.wait(1000);

    // Acceder a la lista de facturas
    abrirListaFacturacion();

    // Seleccionar una factura específica
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();

    // Verificar que la opción "Rollo55" sea visible y seleccionable
    cy.get('[value="Rollo55"]').scrollIntoView().should('be.visible').focus().then(($rollo) => {
        if ($rollo.is(':checked')) {
          cy.log('✅ La opción "Rollo55" está visible y seleccionada.');
        } else {
          cy.log('❌ Error: La opción "Rollo55" no está seleccionada.');
          throw new Error('La opción "Rollo55" no cumple con la condición esperada.');
        }
      });

    cy.wait(5000);

    // Cerrar el modal de detalles de factura
    cy.get('#btnDlgShowFacturaClose').click();
  });

  afterEach(() => {
    // Cerrar sesión al final de cada prueba
    SingOut();
  });
});

// Manejo de excepciones globales
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba por errores no relevantes
  }
});
