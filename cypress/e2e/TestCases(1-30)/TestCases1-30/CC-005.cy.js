import { login, abrirParametros, closeModal, SingOut } from './funciones';
//Es un BUG
describe('CC-006', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it(' Verificar que un solo corte de moneda extranjera pueda estar habilitada como "Defecto". ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    
    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click();

    // Lista de switches
    const switches = ['#chk_2_1', '#chk_2_2', '#chk_2_3', '#chk_2_4', '#chk_2_5'];

    // Iterar sobre cada switch
    switches.forEach((switchId, index) => {
      cy.get(switchId)
        .should('exist') // Verificar que el switch existe
        .then(($switch) => {
          // Habilitar el switch actual si no está habilitado
          if (!$switch.is(':checked')) {
            cy.wrap($switch).click();
            cy.get(switchId).should('be.checked'); // Verificar que está habilitado

            // Verificar que todos los demás switches estén deshabilitados
            switches.forEach((otherSwitchId, otherIndex) => {
              if (index !== otherIndex) {
                cy.get(otherSwitchId).should('not.be.checked');
              }
            });
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
