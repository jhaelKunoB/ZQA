describe('Verificación de Calidad de la Información Mostrada en la configuración de Tipo de Transacción Pedido revisando los errores tipográficos y visuales', () => {
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
   
     it('Verificar que la información presentada en los Tipos de Transacción Pedido es correcta, bien posicionada, intuitiva, clara y sin errores tipográficos.', () => {
     
        
        cy.get(':nth-child(10) > .text-center > .ri-arrow-right-s-line').click();
        cy.wait(3000);
  
     });
    
    })
    
    
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('bootstrap is not defined')) {
        return false;
      }
    });
    