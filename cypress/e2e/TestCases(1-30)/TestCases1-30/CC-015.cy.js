describe('CC-015', () => {
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
  it('Verificar que los cambios hechos en el switch "Visible" se mantengan después de refrescar la página en la tabla "Estación de Atención"', () => {

    login()//para el inicio Seccion
    abrirParametros()//Metodo para Ingresar ala configuracion de impresiones

    //7. Seleccionar la tabla 
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()
    // Cambiar el estado de los switches
    cy.get('#chk_1_1').check().should('be.checked'); // Marcar el primer switch
    cy.get('#chk_1_2').uncheck().should('not.be.checked'); // Desmarcar el segundo switch
    cy.get('#chk_1_3').check().should('be.checked'); // Marcar el tercer switch
    cy.get('#chk_1_4').uncheck().should('not.be.checked'); // Desmarcar el cuarto switch

    // Recargar la página
    cy.reload();

    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click()

    // Verificar que el estado de los switches se mantenga después del reload
    cy.get('#chk_1_1').should('be.checked'); // Verificar que el primer switch sigue marcado
    cy.get('#chk_1_2').should('not.be.checked'); // Verificar que el segundo switch sigue desmarcado
    cy.get('#chk_1_3').should('be.checked'); // Verificar que el tercer switch sigue marcado
    cy.get('#chk_1_4').should('not.be.checked'); // Verificar que el cuarto switch sigue desmarcado
  });

  
})