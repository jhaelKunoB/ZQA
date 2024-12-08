describe('Verificación de Funcionalidad de los Botones "Visible" y "Defecto" en Tipo Transaccion Pedido', () => {
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
  
    it('Permite activar y desactivar el botón Visible sin errores', () => {
      
        cy.get(':nth-child(10) > .text-center > .ri-arrow-right-s-line').click();
        cy.wait(3000);
        //Permite activar y desactivar el botón Visible sin errores
      const visibleButton = '#chk_1_1'; // Ajusta el selector según el ID del botón "Visible"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(visibleButton).click().should('not.be.checked');  // Desactiva y verifica que no esté seleccionado
      cy.get(visibleButton).click().should('be.checked');  // Activa y verifica que esté seleccionado
      //Permite activar y desactivar el botón Defecto sin errores
      const defectoButton = '#chk_2_1'; // Ajusta el selector según el ID del botón "Defecto"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(defectoButton).click().should('be.checked');  // Activa y verifica que esté seleccionado
      cy.get(defectoButton).click().should('not.be.checked');  // Desactiva y verifica que no esté seleccionado
      
      //Mantiene el estado de los botones después de recargar la página
            
      // Activa ambos botones y verifica su estado
      cy.get(visibleButton).click().should('not.be.checked');
      cy.get(defectoButton).click().should('be.checked');
  
      // Recarga la página
      cy.reload();
      cy.wait(3000);
  
      // Verifica que el estado se mantuvo después de recargar
      cy.get(visibleButton).should('not.be.checked');
      cy.get(defectoButton).should('be.checked');
  
      // Restaura el estado inicial
      cy.get(visibleButton).click().should('be.checked');
      cy.get(defectoButton).click().should('not.be.checked');
    });
  });