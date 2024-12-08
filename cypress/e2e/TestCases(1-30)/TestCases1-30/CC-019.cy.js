describe('CC-019', () => {

  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  });
  //BUG
  // Login
  function login() {
    cy.get('#txtUsuario').type('demo'); // Ingresar el usuario
    cy.get('#txtPassword').type('demo'); // Ingresar la contraseña
    cy.get('#btnEntrar').click(); // Clic en el botón Entrar
  }

  // Abrir modal opciones de parámetro
  function abrirParametros() {
    cy.get('.justify-content-between > .bi').should('be.visible').click(); // Clic en el botón del menú lateral
    cy.get(':nth-child(9) > .nav-link > span').click(); // Clic en Configuraciones
    cy.get('#Grupo8 > :nth-child(3) > a > span').click(); // Clic en Configuración
  }

  it('Verificar que los switches de "Visible" y "Defecto" no interfieran entre sí', () => {
    login(); // Iniciar sesión
    abrirParametros(); // Navegar a configuraciones

    // Seleccionar la tabla
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click();

    // 1. Verificar que al activar "Visible", los switches de "Defecto" no cambien
    cy.get('#chk_1_1') // Seleccionar el primer switch "Visible"
      .click() // Activar el switch
      .should('be.checked'); // Verificar que está activado

    // Verificar que los switches de "Defecto" no se activaron/desactivaron
    cy.get('#chk_2_1').should('not.be.checked');
    cy.get('#chk_2_2').should('not.be.checked');
    cy.get('#chk_2_3').should('not.be.checked');
    cy.get('#chk_2_4').should('not.be.checked');

    // 2. Verificar que al activar "Defecto", los switches de "Visible" no cambien
    cy.get('#chk_2_1') // Seleccionar el primer switch "Defecto"
      .click() // Activar el switch
      .should('be.checked'); // Verificar que está activado

    // Verificar que los switches de "Visible" no se activaron/desactivaron
    cy.get('#chk_1_1').should('be.checked'); // El primero debe seguir activado
    cy.get('#chk_1_2').should('not.be.checked');
    cy.get('#chk_1_3').should('not.be.checked');
    cy.get('#chk_1_4').should('not.be.checked');
  });
});
