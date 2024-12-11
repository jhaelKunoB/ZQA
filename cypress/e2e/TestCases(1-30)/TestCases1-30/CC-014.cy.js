import { login, abrirParametros, closeModal, SingOut } from './funciones';

describe('CC-015', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })

  it(' Verificar que la descripción se muestre correctamente en la tabla de "Estación de atención o servicio" (Ejemplo: Mesas - Mostrador - Delivery - Encargos) ', () => {
    login()//para el inicio Seccion
    abrirParametros()
    
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()

    
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()
    cy.get('[aria-label="Descripcion: activate to sort column ascending"]').should('contain', 'Descripcion')
    
    cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Mesas')
    cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(1)').should('contain', 'Mostrador')
    cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(1)').should('contain', 'Delivery')
    cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(1)').should('contain', 'Encargos')
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
