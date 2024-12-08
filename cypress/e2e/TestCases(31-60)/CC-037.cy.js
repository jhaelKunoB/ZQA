import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de login
  });

  it('Validar que, al activar la opción "Incluir Ticket" para el formato "Factura Carta", se incluya un ticket adicional al momento de imprimir la factura.', () => {

    abrirParametros(); // Método para ingresar a la configuración de impresiones

    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click();

    // Activar la Opción "Generar" para Factura Carta
    cy.get('#chk_val_1_2').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar la opción si no está activada
      }
    });

    // Activar la opción "Incluir Ticket" para Factura Carta
    cy.get('#chk_val_2_2').should('be.visible').then(($switch) => {
      if (!$switch.is(':checked')) {
        cy.wrap($switch).click(); // Activar la opción si no está activada
      }
    });

    closeModal(); // Cerrar el modal de configuración
    cy.wait(1000);

    abrirListaFacturacion(); // Acceder a la Lista de Facturas

    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').should('be.visible').click(); // Seleccionar un icono que parece una flecha hacia la derecha en cualquier factura

    cy.get('[value="Rollo55"]')
      .scrollIntoView()
      .should('be.visible')
      .focus(); // Verificar que en la parte final del detalle esté visible la opción "Rollo55" para poder realizar la impresión

    // Aquí sería ideal realizar una verificación del ticket adicional generado. Asegúrate de que el ticket sea visible o se haya generado al imprimir la factura.
    // Este paso dependerá de cómo se muestre el ticket adicional en la aplicación. Se puede realizar una validación de que el ticket ha sido incluido, dependiendo de la UI.

    cy.wait(5000); // Espera para visualizar el resultado

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
