describe('CC-004', () => {
    it('Verificar que no se puedan seleccionar múltiples cortes como defecto en la tabla de "Corte de moneda extranjera"', () => {
  
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
      cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click()
  
      //8. Probar el interruptor "defecto"
      cy.get('#chk_2_1').click()
  
      cy.get('#chk_2_2').click()
  
      cy.get('#chk_2_3').click()
  
      cy.get('#chk_2_4').click()
  
      cy.get('#chk_2_5').click()
    })
  })