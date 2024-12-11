import { login, abrirParametros, closeModal, SingOut } from './funciones';

describe('CC-008', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it('Verificar que la descripción se muestre correctamente en la tabla de "Corte de moneda Nacional" (Ejemplo: 200 Bs. - 100 Bs. - 50 Bs. - 20 Bs. - 10 Bs. - 5 Bs. - 2 Bs.  - 1 Bs.  - 0.5 Bs.)  ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    cy.get(':nth-child(2) > .text-center > .ri-arrow-right-s-line').click()
    cy.get('[aria-label="Descripcion: activate to sort column ascending"]').should('contain', 'Descripcion')
    cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(2)').should('contain', '200 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(2)').should('contain', '100 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(2)').should('contain', '50 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(2)').should('contain', '20 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(5) > :nth-child(2)').should('contain', '10 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(6) > :nth-child(2)').should('contain', '5 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(7) > :nth-child(2)').should('contain', '2 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(8) > :nth-child(2)').should('contain', '1 Bs.')
    cy.get('#tblParametroId > tbody > :nth-child(9) > :nth-child(2)').should('contain', '0.5 Bs.')
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
