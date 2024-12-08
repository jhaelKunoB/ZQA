
describe('CC-021', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  })


  //Login
  function login() {
    cy.get('#txtUsuario').type('demo');//para poder ingresar el Usuario que que es demo
    cy.get('#txtPassword').type('demo')//para poder ingresar la contrasenia que es demo
    cy.get('#btnEntrar').click()//darle click al botom Entrar
  }
  //Abril modal opciones de parametro
  function abrirParametros() {
    cy.get('.justify-content-between > .bi').should('be.visible').click() //darle click al botom con con tres leneas Horizontales, que esta ubicado alado del titulo(FrogDemo), desplazara un menu lateral con opciones
    cy.get(':nth-child(9) > .nav-link > span').click()//Luego hacer click a la opcion que es Configuraciones, te desplazara un menu de sub Opciones 
    cy.get('#Grupo8 > :nth-child(3) > a > span').click();//En el sub menu desplegado hacer click en la opcion Configuracion
  }

  it('Verificar que cada estación de atención tenga una descripción correcta  en la tabla "Estación de Atención"', () => {
    login()//para el inicio Seccion
    abrirParametros()//Metodo para Ingresar ala configuracion de impresiones

    //7. Seleccionar la tabla 
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()
    cy.get('[aria-label="Descripcion: activate to sort column ascending"]').should('contain', 'Descripcion')
    
    cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Mesas')
    cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(1)').should('contain', 'Mostrador')
    cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(1)').should('contain', 'Delivery')
    cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(1)').should('contain', 'Encargos')



  })
})