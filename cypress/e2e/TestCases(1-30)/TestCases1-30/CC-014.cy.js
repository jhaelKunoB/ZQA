describe('CC-014', () => {

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

  it('Verificar que solo un estado puede estar marcado como "Defecto"  en la tabla "Estación de Atención"', () => {

    login()//para el inicio Seccion
    abrirParametros()//Metodo para Ingresar ala configuracion de impresiones

    //7. Seleccionar la tabla 
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()

    cy.get('#chk_2_1').click().should('be.checked'); // Seleccionar el primer switch
    cy.get('#chk_2_2').should('not.be.checked'); // Asegurarse de que el segundo switch no esté seleccionado
    cy.get('#chk_2_3').should('not.be.checked'); // Asegurarse de que el tercero no esté seleccionado
    cy.get('#chk_2_4').should('not.be.checked'); // Asegurarse de que el cuarto no esté seleccionado

    cy.get('#chk_2_2').click().should('be.checked'); // Seleccionar el segundo switch
    cy.get('#chk_2_1').should('not.be.checked'); // Asegurarse de que el primero no esté seleccionado
    cy.get('#chk_2_3').should('not.be.checked'); // Asegurarse de que el tercero no esté seleccionado
    cy.get('#chk_2_4').should('not.be.checked'); // Asegurarse de que el cuarto no esté seleccionado

    cy.get('#chk_2_3').click().should('be.checked'); // Seleccionar el tercer switch
    cy.get('#chk_2_1').should('not.be.checked'); // Asegurarse de que el primero no esté seleccionado
    cy.get('#chk_2_2').should('not.be.checked'); // Asegurarse de que el segundo no esté seleccionado
    cy.get('#chk_2_4').should('not.be.checked'); // Asegurarse de que el cuarto no esté seleccionado

    cy.get('#chk_2_4').click().should('be.checked'); // Seleccionar el cuarto switch
    cy.get('#chk_2_1').should('not.be.checked'); // Asegurarse de que el primero no esté seleccionado
    cy.get('#chk_2_2').should('not.be.checked'); // Asegurarse de que el segundo no esté seleccionado
    cy.get('#chk_2_3').should('not.be.checked'); // Asegurarse de que el tercero no esté seleccionado
  });

  afterEach(() => {
    cy.get('#HeaderBar_HeaderBarUserProfile_spanShortName').should('be.visible').click();
    cy.get(':nth-child(9) > .dropdown-item > span').should('be.visible').click();
    cy.url().should('include', '/login.aspx');
  });
  
})