describe('Verificación de Compatibilidad en Navegadores', () => {
    
    //Habra que abrir cypress con cada tipo de navegador de forma manual y probar cada test case
    const browsers = ['chrome', 'firefox', 'edge'];
  
    browsers.forEach((browser) => {
      it(`Prueba en ${browser}`, () => {
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
  });
  