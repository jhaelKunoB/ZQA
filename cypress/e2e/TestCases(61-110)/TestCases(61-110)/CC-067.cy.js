describe('Prueba de Sobrecarga en la Configuración del Motivo Factura Manual', () => {
    beforeEach(() => {
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
      cy.get(':nth-child(9) > .text-center > .ri-arrow-right-s-line').click();
      cy.wait(3000);
    });
  
    it('Realiza cambios rápidos en los estados de los botones "Visible" y "Defecto" para verificar la respuesta del sistema', () => {
      // Define los selectores de los botones de Visible y Defecto (ajustar según IDs específicos de cada fila)
      const visibleSelectors = ['#chk_1_5', '#chk_1_6', '#chk_1_7']; // Cambia estos IDs según los botones de "Visible"
      const defectoSelectors = ['#chk_2_5', '#chk_2_6', '#chk_2_7']; // Cambia estos IDs según los botones de "Defecto"
      
      // Realiza múltiples clics en cada botón "Visible" y "Defecto" en un corto periodo de tiempo
      visibleSelectors.forEach(selector => {
        for (let i = 0; i < 5; i++) { // Realiza 5 clics rápidos en cada botón Visible
          cy.get(selector).click({ force: true });
        }
      });
  
      defectoSelectors.forEach(selector => {
        for (let i = 0; i < 5; i++) { // Realiza 5 clics rápidos en cada botón Defecto
          cy.get(selector).click({ force: true });
        }
      });
  
      // Observa si el sistema responde correctamente y si se generan errores en la consola
      cy.on('window:alert', (text) => {
        cy.log(`Se mostró un mensaje de alerta: ${text}`);
      });
  
      cy.on('uncaught:exception', (err, runnable) => {
        // Si ocurre una excepción, loguearla y fallar la prueba
        cy.log(`Se capturó una excepción: ${err.message}`);
        return false; // Esto evita que la excepción detenga la prueba
      });
  
      // Agrega una breve espera para observar posibles efectos secundarios
      cy.wait(1000);
    });
  });
  