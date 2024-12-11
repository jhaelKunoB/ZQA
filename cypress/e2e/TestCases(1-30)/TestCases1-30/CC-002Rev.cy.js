import { login, abrirParametros, closeModal, SingOut } from './funciones';
// Es un bug
describe('CC-003', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  });

  it('Verificar que se muestre la habilitación y deshabilitación del switch "Visible" en la tabla de "Corte de moneda extranjera".', () => {
    login(); // Para el inicio de sesión
    abrirParametros();

    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click();

    // Lista de switches
    const switches = ['#chk_1_1', '#chk_1_2', '#chk_1_3', '#chk_1_4', '#chk_1_5'];

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
      
      closeModal();
    
  });

  afterEach(() => {
   
    //SingOut();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});
