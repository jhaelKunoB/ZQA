describe('Verificación de Sincronización de Cambios entre Usuarios en "Unidades de Medida SIM"', () => {
    it('Los cambios realizados por un usuario deben reflejarse en otro usuario', () => {
      // Usuario 1: config1
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
      cy.get('input[name="txtUsuario"]').type("config1");
      cy.get('input[name="txtPassword"]').type("config1");
      cy.get("#btnEntrar").click();
      
      cy.wait(2000); 
      cy.get(".toggle-sidebar-btn").click();
      cy.get('a.nav-link[data-bs-target="#Grupo9"]').click();
      cy.get('#Grupo9 a').contains("Configuración").click();
      cy.wait(2000);
      cy.get(':nth-child(12) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
      
      // Realizar un cambio en el "Unidades de Medida SIM" en el primer usuario
      const visibleButton = '#chk_1_1';
      const defectoButton = '#chk_2_1';
      
      // Activa ambos botones y verifica su estado
      cy.get(visibleButton).click().should('not.be.checked');
      cy.get(defectoButton).click().should('be.checked');
  
      cy.wait(3000);
  
      
      // Usuario 2: config2 (en otra ventana del navegador o pestaña)
      cy.window().then((win) => {
        const newTab = win.open('http://democafeteria.frogsolutions.net/login.aspx', '_blank');
        cy.wrap(newTab).its('document').should('exist');
        
        // Iniciar sesión como config2
        cy.get('input[name="txtUsuario"]').type("config2");
        cy.get('input[name="txtPassword"]').type("config2");
        cy.get("#btnEntrar").click();
  
        cy.wait(2000); 
        cy.get(".toggle-sidebar-btn").click();
        cy.get('a.nav-link[data-bs-target="#Grupo9"]').click();
        cy.get('#Grupo9 a').contains("Configuración").click();
        cy.wait(2000);
        cy.get(':nth-child(12) > .text-center > .ri-arrow-right-s-line').click();
        cy.wait(3000);
  
        // Verificar que el cambio realizado en config1 se refleja en config2
        cy.get(visibleButton).should('not.be.checked');
        cy.get(defectoButton).should('be.checked');
  
        // Restaura el estado inicial
        cy.get(visibleButton).click().should('be.checked');
        cy.get(defectoButton).click().should('not.be.checked');
  
      });
    });
  });