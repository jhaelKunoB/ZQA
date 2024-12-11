import { login, abrirParametros, closeModal, SingOut } from './funciones';

  describe('CC-014', () => {
  
    beforeEach('passes', () => {
      cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    })
  
    it('Verificar que se muestren los cambios de habilitación o deshabilitación del switch de la columna "Defecto"  de la tabla de corte de moneda nacional en el Módulo de "Caja". ', () => {
      login()//para el inicio Seccion
      abrirParametros()
    
      cy.get(':nth-child(2) > .text-center > .ri-arrow-right-s-line').click()
   
      // 9. Probar los switches "Visible"
      const defectoSwitches = ['#chk_2_1', '#chk_2_2', '#chk_2_3', '#chk_2_4', '#chk_2_5'];

      // Establecer todos los switches "Visible" en estado habilitado
      defectoSwitches.forEach((switchId) => {
        cy.get(switchId).then(($switch) => {
          if (!$switch.is(':checked')) {
            // Si no está habilitado, habilitarlo
            cy.wrap($switch).click();
            //cy.get(switchId).should('be.checked'); // Verificar que está habilitado
          }
        });
      });  
    
      closeModal()
      cy.get('.justify-content-between > .bi').click()
      cy.get(':nth-child(14) > .nav-link').click()
      cy.get('#Grupo13 > li > a').click()
      cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').click()
      cy.get('#main').should('contain', 'Corte de Moneda Nacional')
    
    
    })
  
    afterEach(() => {
      SingOut();
     });
  })
  
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
  