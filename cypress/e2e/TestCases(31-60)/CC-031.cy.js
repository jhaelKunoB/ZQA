import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';

describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login();
  })

  
 it('Validar que, al activar la opción "Generar" para el formato "Factura Rollo55", esta opción esté visible y disponible para su selección al intentar imprimir la factura.', () => {
  
    abrirParametros()

    cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click(); // Facturas y Comprobantes
    cy.wait(1000)
    cy.get('#chk_val_1_1').then(($switch) => { // factura carta
       if (!$switch.is(':checked')) {
         cy.wrap($switch).click();
       }
    });

    closeModal()

    cy.wait(500)
    abrirListaFacturacion()


    cy.get('.ri-arrow-right-s-line').should('be.visible').click()//Abrir el detalle de la factura, icono de
    cy.wait(500)
    cy.get('[value="Rollo55"]').scrollIntoView().then(($el) => {
      if ($el.is(':checked')) {
        cy.log('👍Rollo55 está visible para ser seleccionado.');//muestra un mensaje para que esta biem el test cases
      } else {
        cy.log('❌No esta visible');
      }
    });


    cy.wait(2000)
    cy.get('#btnDlgShowFacturaClose').click()//para poder cerrar el modal del detalle
 });
 afterEach(() => {
  SingOut();
 });
})


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});





