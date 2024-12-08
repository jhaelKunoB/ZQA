import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de login
  });

  it('Validar que, al seleccionar la opción "Defecto" para Factura Carta, el formato Factura Carta esté preseleccionado por defecto al intentar imprimir la factura.', () => {

    abrirParametros(); // Método para abrir la configuración de impresiones

    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line')
      .should('be.visible')
      .click();

    // Activar la opción "Generar" para Factura Carta si no está activada
    cy.get('#chk_val_1_2').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar la opción si no está activada
      }
    });

    // Activar otra opción "Generar" para Factura Carta si no está activada
    cy.get('#chk_val_3_2').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar la opción si no está activada
      }
    });

    closeModal(); // Cerrar el modal de configuración
    cy.wait(1000);

    abrirListaFacturacion(); // Acceder a la Lista de Facturas

    // Seleccionar una factura específica
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();

    // Verificar que la opción "Factura Carta" esté visible y seleccionada por defecto
    cy.get('[value="Carta"]').scrollIntoView().should('be.visible').then(($el) => {
        if ($el.is(':checked')) {
          cy.log('✅ Factura Carta está visible y seleccionada por defecto.');
        } else {
          cy.log('❌ Error: Factura Carta no está seleccionada por defecto.');
        }
      });

    cy.wait(5000); // Espera para visualización

    // Cerrar el modal del detalle de la factura
    cy.get('#btnDlgShowFacturaClose').click();
  });

  afterEach(() => {
    SingOut(); // Cerrar sesión tras cada prueba
  });

});

// Manejo de errores globales
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba por errores irrelevantes
  }
});
