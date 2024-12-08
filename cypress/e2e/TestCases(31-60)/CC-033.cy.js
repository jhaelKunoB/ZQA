import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {
  beforeEach('Visitar la página e iniciar sesión', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  });

  it('Validar que, al seleccionar la opción "Defecto" para Factura Rollo55, el formato Factura Rollo55 esté preseleccionado al imprimir la factura.', () => {
    login();
    abrirParametros();

    // Navegar a la sección de "Facturas y Comprobantes"
    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line')
      .should('be.visible')
      .click();

    // Activar la opción "Defecto" para Factura Rollo55 si no está activa
    cy.get('#chk_val_3_1').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click();
        cy.log('Opción "Defecto" activada para Factura Rollo55.');
      }
    });

    // Cerrar el modal y continuar con la validación
    closeModal();
    cy.wait(1000);

    // Abrir la lista de facturación
    abrirListaFacturacion();

    // Validar que Factura Rollo55 esté visible y seleccionada por defecto
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click(); // Abrir el detalle de la factura

    cy.get('[value="Rollo55"]')
      .scrollIntoView()
      .should('be.checked')
      .then(($el) => {
        if ($el.is(':checked')) {
          cy.log('✅ Factura Rollo55 está visible y seleccionada por defecto.');
        } else {
          cy.log('❌ Error: Factura Rollo55 no está seleccionada por defecto.');
        }
      });

    cy.wait(500);
    // Cerrar el modal de detalles
    cy.get('#btnDlgShowFacturaClose').click();
  });

  afterEach(() => {
    SingOut();
  });
});

// Manejo de errores globales
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});
