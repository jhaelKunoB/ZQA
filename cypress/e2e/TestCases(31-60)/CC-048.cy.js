describe('template spec', () => {

    beforeEach('passes', () => {
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx')
    })
  
  
    //Login
    function login() {
      cy.get('#txtUsuario').type('demo')
      cy.get('#txtPassword').type('demo')
      cy.get('#btnEntrar').click()
    }
    //Abril modal opciones de parametro
    function abrirParametros() {
      cy.get('.justify-content-between > .bi').should('be.visible').click()
      cy.get(':nth-child(9) > .nav-link > span').click()
      cy.get('#Grupo8 > :nth-child(3) > a > span').click()
    }
    //Abrir el para lista de Facturas
    function abrirListaFacturacion(){
      cy.get('.justify-content-between > .bi').should('be.visible').click()
      cy.get('#sidebar-nav > :nth-child(3) > .nav-link').should('be.visible').click()
      cy.get('#Grupo2 > :nth-child(1) > a > span').should('be.visible').click()
      cy.get('#tblProducts > tbody > :nth-child(1) > :nth-child(2)').click()
      cy.wait(1000)
      cy.get('#btnCobrarSteep1').click()
    }
  
    
   it('CC-032', () => {
   
      login()
      abrirParametros()
  
      
      cy.get(':nth-child(7) > .text-center > .ri-arrow-right-s-line').click()
      
 
      //------------------------------------------------------------------
      cy.wait(1000)
      cy.get('#chk_2_1').should('be.visible').then(($switch) => {
        if (!$switch.is(':checked')) {
          cy.wrap($switch).click()
        }
      }); 
      //-------------------------------------------------------------------------


      cy.get('body').type('{esc}')
      cy.wait(1000)
  
      abrirListaFacturacion()
  
      cy.get('#simplePaymentOptions > .container-fixed > :nth-child(1)').should('be.visible').click()

      cy.wait(3000)
      cy.get('#btnFacturar').click()
   });
  
  
  
  afterEach(() => {
    cy.wait(500)
    cy.get('#HeaderBar_HeaderBarUserProfile_spanShortName').should('be.visible').click()
    cy.get(':nth-child(9) > .dropdown-item > span').should('be.visible').click()
  });
  
  })
  
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
  
  
  
  
  
  