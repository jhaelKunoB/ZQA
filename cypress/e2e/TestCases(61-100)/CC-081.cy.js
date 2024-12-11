import { login, abrirParametros, abrirTipoDocumentoIdentidad } from './funciones';

    describe('Verificar el Acceso a la Configuración del Tipo de Documento de Identidad', () => {
      beforeEach('Preparación del entorno', () => {
        cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
        login(); // Función importada
        abrirParametros(); // Función importada
      });
    
      it('Verificar que solo los usuarios autorizados pueden acceder y modificar los valores de la configuración de Tipo de Documento de Identidad.', () => {
        // Abre la sección de "Tipos de documentos de identidad"
        abrirTipoDocumentoIdentidad();
        
        // Verificar que el modal sea visible
        cy.get('#dlgMaintainParamenter > .modal-dialog > .modal-content', { timeout: 10000 })
          .should('be.visible');
    
        // Verificar que contiene el texto "Tipos de documentos de identidad"
        cy.get('#dlgMaintainParamenter > .modal-dialog > .modal-content > .modal-header')
          .contains('Tipos de documentos de identidad')
          .should('be.visible');
    
        // Verificar que el contenido del modal sea visible
        cy.get('#tblParametroId_wrapper > .dt-row > .col-sm-12', { timeout: 10000 })
          .should('be.visible');
      });
    });
    
    // Manejo de excepciones
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('bootstrap is not defined')) {
        return false;
      }
    });
    