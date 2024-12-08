describe('CC-016', () => {
  beforeEach('passes', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
  });
  //BUG
  // Login
  function login() {
    cy.get('#txtUsuario').type('demo'); // Ingresar usuario demo
    cy.get('#txtPassword').type('demo'); // Ingresar contraseña demo
    cy.get('#btnEntrar').click(); // Hacer clic en el botón Entrar
  }

  // Abrir modal opciones de parámetros
  function abrirParametros() {
    cy.get('.justify-content-between > .bi').should('be.visible').click(); // Abrir menú lateral
    cy.get(':nth-child(9) > .nav-link > span').click(); // Hacer clic en Configuraciones
    cy.get('#Grupo8 > :nth-child(3) > a > span').click(); // Hacer clic en Configuración
  }

  it('Verificar si los switches "Defecto" pueden habilitarse y deshabilitarse en la tabla "Estación de Atención"', () => {
    login(); // Iniciar sesión
    abrirParametros(); // Ir a Configuraciones

    // Seleccionar la tabla "Estación de Atención"
    cy.get(':nth-child(3) > .text-center > .ri-arrow-right-s-line').click();

    // Lista de switches "Defecto"
    const switches = ['#chk_2_1', '#chk_2_2', '#chk_2_3', '#chk_2_4'];

    // Iterar sobre cada switch
    switches.forEach((selector) => {
      // Habilitar el switch y verificar que esté activado
      cy.get(selector).click().should('be.checked');

      // Deshabilitar el switch y verificar que esté desactivado
      cy.get(selector).click().should('not.be.checked');
    });
  });
});
