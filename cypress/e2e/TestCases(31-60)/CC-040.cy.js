import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login();
  });

  it('Validar que, al activar la opción "Incluir Ticket" para el formato "Factura MedioOficio", se incluya un ticket adicional al momento de imprimir la factura.', () => {

    abrirParametros(); // Método para ingresar a la configuración de impresiones

    // Hacer clic en el ícono de configuración
    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click();

    // Activar la Opción "Generar" para MedioOficio si no está activada
    cy.get('#chk_val_1_3').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click();
        cy.log('✅ Opción "Generar" para Factura MedioOficio activada.');
      }
    });

    // Activar la opción "Incluir Ticket" para el formato MedioOficio si no está activada
    cy.get('#chk_val_2_3').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click();
        cy.log('✅ Opción "Incluir Ticket" activada.');
      }
    });

    closeModal(); // Cerrar el modal de configuración
    cy.wait(1000); // Espera para aplicar los cambios

    abrirListaFacturacion(); // Acceder a la lista de facturas

    // Verificar que el ícono de impresión esté visible
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click();

    // Verificar que "Rollo55" esté visible al final del detalle
    cy.get('[value="Rollo55"]').scrollIntoView().should('be.visible').focus();

    // Validar que el ticket adicional se haya incluido
    cy.get(':nth-child(2) > :nth-child(2) > .p-2').should('exist').then(($ticket) => {
      if ($ticket.length > 0) {
        cy.log('✅ El ticket adicional ha sido incluido correctamente.');
      } else {
        cy.log('❌ El ticket adicional no ha sido incluido.');
      }
    });

    cy.wait(5000); // Espera para visualizar el resultado
    cy.get('#btnDlgShowFacturaClose').click(); // Cerrar el modal del detalle de la factura
  });

  afterEach(() => {
    SingOut(); // Cerrar sesión después de cada prueba
  });

});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle por errores irrelevantes
  }
});
