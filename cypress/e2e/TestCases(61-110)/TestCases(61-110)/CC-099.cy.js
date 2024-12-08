describe('Configuración  de "Unidades de medida SIM" que aparece seleccionado por Defecto en Tipo de Documento de Identidad al emitir una Factura', () => {
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
    
    it('Verificar que el tipo que esta configurado como "Defecto" en la configuracion  de Tipos de documento de identidad se preseleccione automáticamente el tipo configurado al momento de registrar un producto.', () => {
      
      cy.get(':nth-child(12) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
      const visibleButton = '#chk_1_5'; // Ajusta el selector según el ID del botón "Visible"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(visibleButton).click().should('not.be.checked');  // Desactiva y verifica que no esté seleccionado
      cy.wait(3000);
  
      cy.get('#dlgMaintainParamenter').click('bottomRight');
      cy.get(".toggle-sidebar-btn").click();
  
      cy.get('a.nav-link[data-bs-target="#Grupo1"]').click();
  
      cy.get('#Grupo1 a').contains("Productos").click();
      cy.wait(2000); 

      cy.get("#btnFacturaManual").click();
      cy.wait(3000);

      cy.get('#MainContent_DlgProductMaintain_drpUnidadMedidaId').find('option:selected').should('not.contain', 'BOBINA'); // Verifica que el cambio se vea reflejado
  
  
    });
  
  });
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false;
    }
  });  