export function login() {
  cy.get('#txtUsuario').type('admin'); // Ingresar el usuario
  cy.get('#txtPassword').type('admin'); // Ingresar la contraseña
  cy.get('#btnEntrar').click(); // Click en el botón de "Entrar"
}

export function abrirParametros() {
  cy.get('.justify-content-between > .bi').should('be.visible').click(); // Menú lateral
  cy.contains('.nav-link > span', 'Configuraciones').click(); // Opción "Configuraciones"
  cy.contains('span', 'Configuración').click(); // Submenú "Configuraciones"
}


export function closeModal() {
  cy.wait(1000)
  cy.get('body').type('{esc}')//para poder cerrar le modal de configuracion
}



export function abrirListaFacturacion() {
  cy.get('.justify-content-between > .bi').should('be.visible').click(); // Menú lateral
  cy.get(':nth-child(13) > .nav-link > .bi-chevron-down').click(); // Opción "Facturación"
  cy.get('#Grupo12 > :nth-child(1) > a > span').click(); // Submenú "Facturas"
}


export function SingOut() {
  cy.get('#HeaderBar_HeaderBarUserProfile_spanShortName').should('be.visible').click();
  cy.get(':nth-child(9) > .dropdown-item > span').should('be.visible').click();
}
