describe('Visualización de los Motivos en Motivo del Evento al emitir una Factura Manual según Visibilidad de la configuración de "Motivo Factura "', () => {
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
    
    it('Comprobar que solo los motivos marcados como "Visible" aparezcan en la selección  del select box  en el apartado de "Motivo del Evento" al registrar una factura manual.', () => {
      
      cy.get(':nth-child(9) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
      const visibleButton = '#chk_1_5'; // Ajusta el selector según el ID del botón "Visible"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(visibleButton).click().should('not.be.checked');  // Desactiva y verifica que no esté seleccionado
      cy.wait(3000);
  
      cy.get('#dlgMaintainParamenter').click('bottomRight');
      cy.get(".toggle-sidebar-btn").click();
  
      cy.get('a.nav-link[data-bs-target="#Grupo6"]').click();
  
      cy.get('#Grupo6 a').contains("Facturas").click();
      cy.wait(3000);
      cy.get("#btnFacturaManual").click();
      cy.wait(3000);
  
      cy.get("tr:nth-of-type(1) > td:nth-of-type(2)").click();
      cy.get("#btnCobrarSteep1").click();

      cy.get('#MainContent_DlgCobrarPedido_TapFacturar_drpMotivoEvento').should('not.contain', 'VIRUS INFORMÁTICO O FALLA DE SOFTWARE'); // Verifica que el cambio se vea reflejado
  
  
    });
  
  });
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false;
    }
  });
  
  