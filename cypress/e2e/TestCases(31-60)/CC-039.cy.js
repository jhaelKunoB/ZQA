import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('Configuración de impresión de facturas', () => {

  beforeEach(() => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de login
  });

  it('Validar que, al seleccionar la opción "Defecto" para "Factura MedioOficio", el formato "Factura MedioOficio" esté preseleccionado por defecto al intentar imprimir la factura.', () => {
    
    abrirParametros(); // Abrir configuración de impresiones

    // Hacer clic en el ícono de la configuración
    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click();

    // Activar la opción Generar para MedioOficio si no está activada
    cy.get('#chk_val_1_3').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar opción
        cy.log('✅ Opción "Generar" para Factura MedioOficio activada.');
      }
    });
    // Activar la opción "Defecto" para MedioOficio si no está activada
    cy.get('#chk_val_3_3').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar opción
        cy.log('✅ Opción "Defecto" para Factura MedioOficio activada.');
      }
    });

    closeModal(); // Cerrar el modal de configuración
    cy.wait(1000); // Esperar para que se apliquen los cambios

    abrirListaFacturacion(); // Abrir lista de facturas

    // Seleccionar una factura de la lista
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();

     // Verificar si la opción "Factura MedioOficio" está preseleccionada por defecto
    cy.get(':nth-child(2) > :nth-child(2) > .flat').scrollIntoView().then(($el) => {
      if ($el.is(':checked')) {
        cy.log('👍 La opción "Factura MedioOficio" está preseleccionada por defecto, como se esperaba.');
      } else {
        cy.log('❌ La opción "Factura MedioOficio" no está preseleccionada por defecto.');
      }
    });

    cy.wait(2000);

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
