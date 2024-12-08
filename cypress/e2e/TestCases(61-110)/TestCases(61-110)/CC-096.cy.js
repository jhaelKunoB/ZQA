describe('Verificación del Tiempo de Respuesta de los Botones "Visible" y "Defecto" en Unidades de Medida SIM', () => {
    beforeEach(() => {
      // Accede al sistema con credenciales válidas
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
      cy.get('input[name="txtUsuario"]').type("demo");
      cy.get('input[name="txtPassword"]').type("demo");
      cy.get("#btnEntrar").click();
  
      // Navega a la configuración de Unidades de Medida SIM
      cy.wait(2000); 
      cy.get(".toggle-sidebar-btn").click();
      cy.get('a.nav-link[data-bs-target="#Grupo9"]').click();
      cy.get('#Grupo9 a').contains("Configuración").click();
      cy.wait(2000);
      cy.get(':nth-child(12) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
    });
  
    function measureButtonResponseTime(buttonSelector) {
      const startTime = Date.now(); // Inicia el cronómetro
      cy.get(buttonSelector).click().then(() => {
        const endTime = Date.now(); // Detiene el cronómetro
        const responseTime = endTime - startTime;
        cy.log(`Tiempo de respuesta: ${responseTime} ms`);
        expect(responseTime).to.be.lessThan(1000); // Verifica que el tiempo sea menor a 1 segundo
      });
    }
  
    it('Mide el tiempo de respuesta del botón "Visible"', () => {
      const visibleButtonSelector = '#chk_1_1'; // Cambia este selector según el botón de prueba
      measureButtonResponseTime(visibleButtonSelector);
      
      // Repite el proceso para desactivar el botón
      measureButtonResponseTime(visibleButtonSelector);
    });
  
    it('Mide el tiempo de respuesta del botón "Defecto"', () => {
      const defectoButtonSelector = '#chk_1_6'; // Cambia este selector según el botón de prueba
      measureButtonResponseTime(defectoButtonSelector);
      
      // Repite el proceso para desactivar el botón
      measureButtonResponseTime(defectoButtonSelector);
    });
  });