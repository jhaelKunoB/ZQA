
describe('CC-026', () => {
  it('Verificar la actualización en tiempo real de los cambios en "Defecto" en la tabla "Estado de Factura"', () => {

    // 1. Visitar la página de login
    cy.visit('http://democafeteria.frogsolutions.net/')

    // 2. Ingresar credenciales de usuario (usuario: demo, contraseña: demo)
    cy.get('#txtUsuario').type("demo")
    cy.get('#txtPassword').type("demo")

    // 3. Hacer clic en el botón de inicio de sesión
    cy.get('#btnEntrar').click()

    // 4. Abrir el NavBar
    cy.get('.justify-content-between > .bi').click()

    // 5. Ubicar la opción Configuraciones
    cy.get(':nth-child(9) > .nav-link').click()

    //6. Seleccionar la opción Configuración
    cy.get('#Grupo8 > :nth-child(3) > a').click()

    //7. Seleccionar la tabla Cortes de moneda Extranjera
    cy.get(':nth-child(4) > .text-center > .ri-arrow-right-s-line').click()


  })
})