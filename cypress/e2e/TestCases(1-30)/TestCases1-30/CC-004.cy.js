import { login, abrirParametros, closeModal, SingOut } from './funciones';
//Es un bug
describe('CC-005', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it('Verificar que se muestre la habilitación y deshabilitación del switch "Defecto" en la tabla de "Corte de moneda extranjera". ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    
    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click();

    // Lista de switches
    const switches = ['#chk_2_1', '#chk_2_2', '#chk_2_3', '#chk_2_4', '#chk_2_5'];

    // Iterar sobre cada switch
    switches.forEach((switchId) => {
      // Verificar que el switch existe antes de interactuar
      cy.get(switchId)
        .should('exist')
        .then(($switch) => {
          const initialChecked = $switch.is(':checked'); // Estado inicial

          // Interactuar con el switch
          cy.wrap($switch).click();

          // Verificar el nuevo estado
          cy.get(switchId).should(initialChecked ? 'not.be.checked' : 'be.checked');
        })
      })
  
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
