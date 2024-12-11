import { login, abrirParametros, closeModal, SingOut } from './funciones';

describe('CC-016', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it(' Verificar que la abreviatura se muestre correctamente en la tabla de "Estación de atención o servicio" (Ejemplo: 1- 2- 3- 4) ', () => {
    login()//para el inicio Seccion
    abrirParametros()
     //7. Seleccionar la tabla 
     cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()
     cy.get('[aria-label="Abrev.: activate to sort column ascending"]').should('contain', 'Abrev.')
     cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(2)').should('contain', '1')
     cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(2)').should('contain', '2')
     cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(2)').should('contain', '3')
     cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(2)').should('contain', '4') 
  
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
