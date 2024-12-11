import { login, abrirParametros, closeModal, SingOut } from './funciones';

describe('CC-001', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it('Verificar que la descripción se muestre correctamente en la tabla de "Corte de moneda extranjera" (Ejemplo: 100$us. - 50 $us. - 20$us. - 10$us. - 5$us.) ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    
    //7. Seleccionar la tabla Cortes de moneda Extranjera
    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click()
    cy.get('[aria-label="Descripcion: activate to sort column ascending"]').should('contain', 'Descripcion')
    cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(1)').should('contain', '100 $us.')
    cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(1)').should('contain', '50 $us.')
    cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(1)').should('contain', '20 $us.')
    cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(1)').should('contain', '10 $us.')
    cy.get('#tblParametroId > tbody > :nth-child(5) > :nth-child(1)').should('contain', '5 $us.')
    //cy.get('[aria-label="Abrev.: activate to sort column ascending"]').should('contain', 'Abrev.')
    
    //cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(2)').should('contain', '100 $us.')
    
    //cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(2)').should('contain', '50 $us.')
    
    //cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(2)').should('contain', '20 $us.')
    
    //cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(2)').should('contain', '10 $us.')
    
    //cy.get('#tblParametroId > tbody > :nth-child(5) > :nth-child(2)').should('contain', '5 $us.')
  
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
