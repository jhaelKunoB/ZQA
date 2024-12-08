describe('CC-006', () => {
    it('Verificar la actualización en tiempo real de la tabla en la tabla de "Corte de moneda nacional"', () => {
  
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
      cy.get(':nth-child(2) > .text-center > .ri-arrow-right-s-line').click()
  
      cy.get('#chk_1_1').click()
  
      cy.get('#chk_2_1').click()
  
      cy.get('#chk_1_2').click()
  
      cy.get('#chk_2_2').click()
  
      cy.get('#chk_1_3').click()
  
      cy.get('#chk_2_3').click()
  
      cy.get('#chk_1_4').click()
  
      cy.get('#chk_2_4').click()
  
      cy.get('#chk_1_5').click()
  
      cy.get('#chk_2_5').click()
    })
  })