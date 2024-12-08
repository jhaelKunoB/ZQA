describe('CC-001', () => {
    it('Verificar que la descripción y abreviatura se muestren correctamente en la tabla de "Corte de moneda extranjera"', () => {
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
      cy.get('[aria-label="Descripcion: activate to sort column ascending"]').should('contain', 'Descripcion')
      cy.get('[aria-label="Abrev.: activate to sort column ascending"]').should('contain', 'Abrev.')
      cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(1)').should('contain', '100 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(1) > :nth-child(2)').should('contain', '100 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(1)').should('contain', '50 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(2) > :nth-child(2)').should('contain', '50 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(1)').should('contain', '20 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(3) > :nth-child(2)').should('contain', '20 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(1)').should('contain', '10 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(4) > :nth-child(2)').should('contain', '10 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(5) > :nth-child(1)').should('contain', '5 $us.')
      cy.get('#tblParametroId > tbody > :nth-child(5) > :nth-child(2)').should('contain', '5 $us.')
    })
  })