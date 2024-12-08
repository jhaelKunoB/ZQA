describe('Configuración  de "Tipos de Documento de Identidad" que aparece seleccionado por Defecto en Tipo de Documento de Identidad al emitir una Factura', () => {
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
    
    it('Configuración  de "Tipos de Documento de Identidad" que aparece seleccionado por Defecto en Tipo de Documento de Identidad al emitir una Factura', () => {
      
      cy.get(':nth-child(11) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
      const visibleButton = '#chk_2_1'; // Ajusta el selector según el ID del botón "Visible"
      
      // Verifica que el botón se activa y desactiva correctamente
      cy.get(visibleButton).click().should('be.checked');  // Desactiva y verifica que no esté seleccionado
      cy.wait(3000);
  
      cy.get('#dlgMaintainParamenter').click('bottomRight');
      cy.get(".toggle-sidebar-btn").click();
  
      cy.get('a.nav-link[data-bs-target="#Grupo6"]').click();
  
      cy.get('#Grupo6 a').contains("Facturas").click();
      cy.wait(2000); 
      
      cy.get("#btnFacturaManual").click();
      cy.wait(3000);
  
      cy.get("tr:nth-of-type(1) > td:nth-of-type(2)").click();
      cy.get("#btnCobrarSteep1").click();
      // Verificar que los radios muestra seleccionado correctamente los tipos de documentos
      cy.get('#facturar-justified > :nth-child(1) > .row')
        .filter(':checked') // Filtra el radio button seleccionado
        .next('label') // Encuentra el label asociado
        .should('contain.text', 'CI'); // Verifica que el texto sea 'CI'
      
      
  
    });
  
  });
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false;
    }
  });  