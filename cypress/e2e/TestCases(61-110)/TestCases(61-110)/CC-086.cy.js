describe('Asegurar que por lo menos un Tipo siempre este seleccionado como visible en la Configuración de "Tipos de documento de identidad"', () => {
    it('Verifica que al menos uno de los botones "Visible" esté siempre activado', () => {
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  
      // Iniciar sesión
      cy.get('input[name="txtUsuario"]').type("config1");
      cy.get('input[name="txtPassword"]').type("config1");
      cy.get("#btnEntrar").click();
      
      // Navegar a la configuración de Tipos de documento de identidad
      cy.wait(2000); 
      cy.get(".toggle-sidebar-btn").click();
      cy.get('a.nav-link[data-bs-target="#Grupo9"]').click();
      cy.get('#Grupo9 a').contains("Configuración").click();
      cy.wait(2000);
      cy.get(':nth-child(11) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
  
      // Desactivar todos los botones "Visible" y verificar
      const visibleButtons = ['#chk_1_1', '#chk_1_6', '#chk_1_7']; // Selecciona los ID de los botones
      
      visibleButtons.forEach(button => {
        cy.get(button).click(); // Desactiva cada botón "Visible"
      });
  
      // Verificar que al menos uno esté activado
      cy.wrap(visibleButtons).each(button => {
        cy.get(button).then($btn => {
          if (!$btn.is(':checked')) {
            cy.get(button).click(); // Activa el botón si todos están desactivados
          }
        });
      });
  
      // Verificación final
      cy.wrap(visibleButtons).should('have.length.greaterThan', 0).each(button => {
        cy.get(button).should('be.checked'); // Asegura que al menos uno esté activado
      });
    });
  });