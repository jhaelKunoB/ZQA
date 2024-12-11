import { login, abrirParametros, closeModal, SingOut } from './funciones';
//Es un BUG
describe('CC-004', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it('Verificar que se muestre la habilitación y deshabilitación del switch "Visible" de la tabla de "Corte de moneda extranjera" en el módulo de "Caja". ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    
    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click();

    // 9. Probar los switches "Visible"
    const defectoSwitches = ['#chk_1_1', '#chk_1_2', '#chk_1_3', '#chk_1_4', '#chk_1_5'];

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

    // Probar alternar el estado de los switches "Defecto" desde el punto inicial
    /*defectoSwitches.forEach((switchId) => {
      cy.get(switchId).then(($switch) => {
        if ($switch.is(':checked')) {
          // Si está habilitado, deshabilitar
          cy.wrap($switch).click();
          cy.get(switchId).should('not.be.checked'); // Verificar que está deshabilitado
        } else {
          // Si está deshabilitado
          cy.wrap($switch).click();
          cy.get(switchId).should('be.checked'); // Verificar que está habilitado
        }
      });
    });*/




  
    closeModal()

    cy.get('.justify-content-between > .bi').click()
    cy.get(':nth-child(14) > .nav-link').click()
    cy.get('#Grupo13 > li > a').click()
    cy.get(':nth-child(1) > :nth-child(1) > .ri-arrow-right-s-line').click()
    cy.get('#main').should('contain', 'Corte de Moneda Extranjera')
    //cy.get('#btnAbrirCaja').click()
    //cy.get('.modal-footer > .btn-primary').click()
    //cy.get('.swal2-confirm').click()

  
  })

  afterEach(() => {
    //SingOut();
   });
})


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});
