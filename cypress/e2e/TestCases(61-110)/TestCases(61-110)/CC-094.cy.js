describe('Comprobar el Acceso a la Configuración de Unidades de Medida SIM ', () => {
    
    beforeEach('passes', () => {
        cy.visit('http://democafeteria.frogsolutions.net/login.aspx')
        login()
        abrirParametros()
        
      
      })
    
    //Login
    function login() {
      cy.get('#txtUsuario').type('config1')
      cy.get('#txtPassword').type('config1')
      cy.get('#btnEntrar').click()
    }
    //Abril modal opciones de parametro
    function abrirParametros() {
      cy.get('.justify-content-between > .bi').should('be.visible').click()
      cy.get(':nth-child(10) > .nav-link > span').click()
      cy.get('#Grupo9 > :nth-child(3) > a > span').click()
    }
   
    it('Verificar que se puede acceder al apartado de configuración y a la sección de Unidades de Medida SIM.', () => {
      
      
      cy.get(':nth-child(12) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
  
    })
    
  })
      
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false;
    }
  });