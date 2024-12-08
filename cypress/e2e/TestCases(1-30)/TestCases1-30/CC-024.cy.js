
describe('CC-024', () => {
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
  it('Verificar que solo una estación puede estar marcada como "Defecto" en la tabla "Estado de Factura"', () => {

    login(); // Iniciar sesión
    abrirParametros(); // Ir a Configuraciones

    // Seleccionar la tabla "Estación de Atención"
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click();

    // Lista de switches "Defecto"
    const switches = ['#chk_2_0','#chk_2_1', '#chk_2_2', '#chk_2_3', '#chk_2_4', '#chk_2_5'];

    // Iterar sobre cada switch
    switches.forEach((selector) => {
      // Habilitar el switch y verificar que esté activado
      cy.get(selector).click().should('be.checked');

      // Deshabilitar el switch y verificar que esté desactivado
      cy.get(selector).click().should('not.be.checked');
    });

  })
})