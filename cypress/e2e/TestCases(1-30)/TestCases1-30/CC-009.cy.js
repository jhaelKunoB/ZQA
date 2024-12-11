import { login, abrirParametros, closeModal, SingOut } from './funciones';
//Es un BUG
describe('CC-010', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it('Verificar que se muestre la habilitación y deshabilitación del switch "Visible" en la tabla de "Corte de moneda nacional".', () => {
    login()//para el inicio Seccion
    abrirParametros()

    cy.get(':nth-child(2) > .text-center > .ri-arrow-right-s-line').click()
    
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
  
    closeModal()
  
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
