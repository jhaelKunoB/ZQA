describe('Visualización de los tipos de Transacción Pedido en el lugar donde actúa según Visibilidad de la configuración de "Tipo de Transacción Pedido"', () => {
    before(() => {
        // Accede al sistema con credenciales válidas
        cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
        cy.get('input[name="txtUsuario"]').type("config1");
        cy.get('input[name="txtPassword"]').type("config1");
        cy.get("#btnEntrar").click();
        
        // Navega a la configuración de Motivo Factura Manual
        cy.wait(2000); 
        cy.get(".toggle-sidebar-btn").click();
        cy.get('a.nav-link[data-bs-target="#Grupo9"]').click();
        cy.get('#Grupo9 a').contains("Configuración").click();
        cy.wait(2000);
      });
    
    it('Comprobar que solo los tipos marcados como "Visible" aparezcan en donde se deben mostrar.', () => {
      
      cy.get(':nth-child(10) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
      const visibleButton = '#chk_1_1'; // Ajusta el selector según el ID del botón "Visible"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(visibleButton).click().should('not.be.checked');  // Desactiva y verifica que no esté seleccionado
      cy.wait(3000);
  
      cy.get('#dlgMaintainParamenter').click('bottomRight');
      cy.get(".toggle-sidebar-btn").click();
  
      cy.get('a.nav-link[data-bs-target="#Grupo5"]').click();
  
      cy.get('#Grupo5 a').contains("Pedidos").click();
      cy.wait(3000);
      
      cy.get('.card-body').contains("Tipo Transacción Pedido").click();
  
    });
  
  });
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false;
    }
  });
  
  