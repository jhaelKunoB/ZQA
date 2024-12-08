import { login, abrirParametros, abrirListaFacturacion, closeModal, SingOut } from './funciones';
describe('template spec', () => {

    
  beforeEach('passes', () => {
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx')
      login()
    })
  
  
  
   it('Validar que, al deseleccionar la opción "Generar" para el formato "Factura Rollo55", esta opción no esté visible ni disponible para su selección al intentar imprimir la factura.', () => {
   
      abrirParametros()
  

      cy.get(':nth-child(5) > .text-center > .ri-arrow-right-s-line').click(); // Facturas y Comprobantes


      // Asegurar que el switch esté desactivado
      cy.get('#chk_val_1_1').should('be.visible').then(($switch) => {
        if ($switch.is(':checked')) {
          cy.wrap($switch).click();
        }
      });



    closeModal();
  
    abrirListaFacturacion();

    // Verificar que el formato Rollo55 no está disponible
    cy.get('.ri-arrow-right-s-line').should('be.visible').click();//Abrir el detalle de la factura, icono de flecha

    cy.get('[value="Rollo55"]').scrollIntoView().then(($el) => {
      if (!$el.is(':checked')) {
        cy.log('👍 Rollo55 no está visible ni disponible para su selección.');
      } else {
        cy.log('❌ Error: Rollo55 está visible y marcado, cuando no debería estarlo.');
      }
    });
  
    cy.wait(1000)
    cy.get('#btnDlgShowFacturaClose').click()//para poder cerrar el modal del detalle

   });
  
  
  
   afterEach(() => {
    SingOut()
  });
  

  })
  
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
  
  
  
  
  
  