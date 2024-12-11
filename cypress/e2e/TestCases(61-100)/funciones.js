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

  
export function abrirFactura() {
  cy.get('.justify-content-between > .bi').should('be.visible').click(); // Menú lateral
  cy.get(':nth-child(13) > .nav-link > .bi-chevron-down').click(); // Opción "Facturación"
  cy.get('#Grupo12 > :nth-child(1) > a > span').click(); // Submenú "Facturas"
}
// Función para guardar el estado inicial de los switches
export function guardarEstadoInicial(switchDefectoSelector, switchVisibleSelector) {
  const estadosIniciales = [];
  cy.get(switchDefectoSelector).each(($defecto, index) => {
    const defectoChecked = $defecto.is(':checked');
    cy.get(switchVisibleSelector).eq(index).then(($visible) => {
      const visibleChecked = $visible.is(':checked');
      estadosIniciales[index] = { defectoChecked, visibleChecked };
    });
  });
  return estadosIniciales;
}

// Función para restaurar el estado inicial de los switches
export function restaurarEstadoInicial (initialStates, switchDefectoSelector, switchVisibleSelector)  {
  initialStates.forEach((state, index) => {
    cy.get(switchDefectoSelector).eq(index).then($def => {
      if (state.defectoChecked) {
        cy.wrap($def).check(); // Asegúrate de que se cheque el switch si debería estar marcado
      } else {
        cy.wrap($def).uncheck(); // Asegúrate de que se desmarque si no debería estar marcado
      }

      cy.get(switchVisibleSelector).eq(index).then($visible => {
        if (state.visibleChecked) {
          cy.wrap($visible).check(); // Similar con el switch "Visible"
        } else {
          cy.wrap($visible).uncheck();
        }
      });
    });
  });


  cy.log('🔄 Todos los switches han sido restaurados a su estado original.');
}

  export function closeModal() {
    cy.wait(500)
    cy.get('body').type('{esc}')//para poder cerrar le modal de configuracion
  }

  export function abrirMotivoFacturaManual() {
    cy.contains('Motivo Factura Manual').parent().find('.ri-arrow-right-s-line').click();
    cy.wait(500)
  }
  export function abrirTipoTransacciónPedido() {
    cy.contains('Tipo de Transacción Pedido').parent().find('.ri-arrow-right-s-line').click();
    cy.wait(500)
  }

  export function abrirUnidadesMedidaSIM() {
    cy.contains('Unidades de medida SIM').parent().find('.ri-arrow-right-s-line').click();
    cy.wait(500)
  }
  export function abrirTipoDocumentoIdentidad() {
    cy.contains('Tipos de documentos de identidad').parent().find('.ri-arrow-right-s-line').click();
    cy.wait(500)
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
  