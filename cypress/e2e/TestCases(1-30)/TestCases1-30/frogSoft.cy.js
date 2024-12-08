/*
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
  })
})


describe('CC-002', () => {
  it('Verificar el comportamiento del interruptor "Visible" en la tabla de "Corte de moneda extranjera"', () => {

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

    //8. Probar el interruptor "Visible"
    cy.get('#chk_1_1').click()

    cy.get('#chk_1_2').click()

    cy.get('#chk_1_3').click()

    cy.get('#chk_1_4').click()

    cy.get('#chk_1_5').click()
  })
})

describe('CC-003', () => {
  it('Verificar el comportamiento del interruptor "Defecto" en la tabla de "Corte de moneda extranjera"', () => {

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

describe('CC-005', () => {
  it('Verificar la persistencia de los cambios en la visibilidad en la tabla de "Corte de moneda extranjera"', () => {

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

    cy.get('#chk_2_1').click()
    cy.reload()
  })
})

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
    cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click()

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


describe('CC-007', () => {
  it('Verificar el formato correcto de los valores en "Abrev." en la tabla de "Corte de moneda nacional"', () => {

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

    //7. Seleccionar la tabla Cortes de moneda Nacional
    //cy.get(':nth-child(1) > .text-center > .ri-arrow-right-s-line').click()
    cy.get(':nth-child(2) > .text-center > .ri-arrow-right-s-line').click()
    cy.get('[aria-label="Abrev.: activate to sort column ascending"]').should('contain', 'Abrev.')
  })
})
*/

describe('CC-008', () => {
  it('Verificar la funcionalidad de los interruptores en dispositivos móviles en la tabla de "Corte de moneda nacional"', () => {

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

    //7. Seleccionar la tabla Cortes de moneda nacional
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
    cy.get('#chk_1_6').click()

    cy.get('#chk_2_6').click()
    cy.get('#chk_1_7').click()

    cy.get('#chk_2_7').click()
    cy.get('#chk_1_8').click()

    cy.get('#chk_2_8').click()
    cy.get('#chk_1_9').click()

    cy.get('#chk_2_9').click()

  })
})

/*
describe('CC-009', () => {
  it('Verificar la carga correcta de la tabla en distintos navegadores en la tabla de "Corte de moneda nacional"', () => {

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


  })
})


describe('CC-010', () => {
  it('Verificar que los cambios en el estado "Visible" no afecten otros valores en la tabla de "Corte de moneda nacional"', () => {

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


  })
})

describe('CC-011', () => {
  it('Verificar que cada estado de factura tiene una descripción correcta en la tabla de "Corte de moneda nacional"', () => {

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


  })
})

describe('CC-012', () => {
  it('Verificar que las abreviaturas sean correctas en la tabla de "Corte de moneda nacional"', () => {

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


  })
})

describe('CC-013', () => {
  it('Verificar que el estado "Visible" funcione correctamente  en la tabla "Estación de Atención"', () => {

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


  })
})

describe('CC-014', () => {
  it('Verificar que solo un estado puede estar marcado como "Defecto"  en la tabla "Estación de Atención"', () => {

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


  })
})

describe('CC-015', () => {
  it('Verificar la persistencia de los cambios en "Visible" después de refrescar la página en la tabla "Estación de Atención"', () => {

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


  })
})
  */