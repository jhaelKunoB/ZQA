
import {
    login,
    abrirParametros,
    abrirMotivoFacturaManual,
    closeModal,
    SingOut,
    abrirTipoDocumentoIdentidad,
  } from './funciones';
  
  describe('Validar switches "Visible" y "Defecto" en Tipo de Documento de Identidad', () => {
    let estadoOriginalVisible = false;
    let estadoOriginalDefecto = false;
  
    beforeEach('Acceso al sistema', () => {
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
      login();
      abrirParametros();
      abrirTipoDocumentoIdentidad(); // Abrir la sección necesaria
    });
  
    it('Guardar estado inicial, modificar switches y verificar persistencia.', () => {
      // Guardar estados iniciales
      cy.get('#chk_1_2').then(($switchVisible) => {
        estadoOriginalVisible = $switchVisible.prop('checked'); // Guardar estado del switch "Visible"
        cy.log(`Estado inicial de "Visible": ${estadoOriginalVisible}`);
      });
  
      cy.get('#chk_2_1').then(($switchDefecto) => {
        estadoOriginalDefecto = $switchDefecto.prop('checked'); // Guardar estado del switch "Defecto"
        cy.log(`Estado inicial de "Defecto": ${estadoOriginalDefecto}`);
      });
  
      // Modificar el estado de los switches
      cy.get('#chk_1_2').click(); // Cambiar el estado del botón "Visible"
      cy.get('#chk_2_1').click(); // Cambiar el estado del botón "Defecto"
  
      // Verificar cambios
      cy.get('#chk_1_2').should(($switchVisible) => {
        expect($switchVisible.prop('checked')).to.not.equal(estadoOriginalVisible);
      });
      cy.get('#chk_2_1').should(($switchDefecto) => {
        expect($switchDefecto.prop('checked')).to.not.equal(estadoOriginalDefecto);
      });
  
      // Recargar página y verificar persistencia
      cy.reload();
      cy.wait(2000);
      abrirTipoDocumentoIdentidad();
  
      cy.get('#chk_1_2').should(($switchVisible) => {
        expect($switchVisible.prop('checked')).to.not.equal(estadoOriginalVisible);
      });
      cy.get('#chk_2_1').should(($switchDefecto) => {
        expect($switchDefecto.prop('checked')).to.not.equal(estadoOriginalDefecto);
      });
  
      cy.log('👍 Los cambios en los switches persisten después de recargar la página.');
    });
  
    it('Restaurar estado original de los switches.', () => {
      // Restaurar el estado original de los switches
      cy.get('#chk_1_2').then(($switchVisible) => {
        if ($switchVisible.prop('checked') !== estadoOriginalVisible) {
          cy.wrap($switchVisible).click();
          cy.log('👍 Estado original del switch "Visible" restaurado.');
        }
      });
  
      cy.get('#chk_2_1').then(($switchDefecto) => {
        if ($switchDefecto.prop('checked') !== estadoOriginalDefecto) {
          cy.wrap($switchDefecto).click();
          cy.log('👍 Estado original del switch "Defecto" restaurado.');
        }
      });
  
      closeModal();
    });
  
    afterEach(() => {
      closeModal();
      // SingOut(); // Cerrar sesión después de cada prueba
    });
  });
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
  