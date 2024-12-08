describe('Verificación de las Abreviaciones de las opciones de "Tipo de Transacción Pedido", asegurando sigan las nomenclatura que maneja el negocio ', () => {
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
   
    
      
     it('Verificar que las abreviaciones asignadas a cada motivo sean legibles, concisas y representen correctamente el motivo de acuerdo a la nomenclatura que maneja el negocio.', () => {
     
        
        cy.get(':nth-child(10) > .text-center > .ri-arrow-right-s-line').click();
        cy.wait(3000);
  
     });
    
    })
    
    
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('bootstrap is not defined')) {
        return false;
      }
    });
    