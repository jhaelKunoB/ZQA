import {
  login,
  abrirParametros,
  abrirTipoDocumentoIdentidad,
} from './funciones';

describe('Asegurar que por lo menos un tipo de documento siempre esté seleccionado como "Visible"', () => {
  const switchSelector = '[id^="chk_1_"]'; // Selector para los switches 'Visible'
  let initialState = []; // Arreglo para guardar el estado inicial

  beforeEach('Acceso al sistema', () => {
    // Paso 1: Acceder al sistema con credenciales válidas
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de inicio de sesión
    abrirParametros(); // Función para abrir configuraciones generales
    abrirTipoDocumentoIdentidad(); // Función para abrir la configuración de Tipos de Documento de Identidad

    // Guardar el estado inicial de los switches
    cy.get(switchSelector).each(($el) => {
      initialState.push($el.prop('checked')); // Guardar estado (true o false)
    });
  });

  it('Validar que al menos un tipo de documento sea siempre visible', () => {
    // Paso 5: Desmarcar todas las opciones 'Visible'
    // Desmarcar todos los switches excepto el último visible
    cy.get(switchSelector).each(($el, index, $list) => {
      if (index < $list.length - 1 && $el.prop('checked')) {
        cy.wrap($el).click({ force: true }); // Desmarcar con 'force' en caso de restricciones
        cy.wrap($el).should('not.be.checked'); // Verificar que se desmarcó
        cy.log(`✅ Switch ${index + 1} desmarcado correctamente.`);
      }
    });

    // Intentar desmarcar el último switch visible
    cy.get(switchSelector).last().then(($lastSwitch) => {
      if ($lastSwitch.prop('checked')) {
        cy.wrap($lastSwitch).click({ force: true }); // Intentar desmarcar
        cy.wait(500); // Esperar para ver si se reactivó automáticamente

        cy.get($lastSwitch).then(($lastSwitchUpdated) => {
          if ($lastSwitchUpdated.prop('checked')) {
            cy.log('✅ El último switch visible no pudo ser desmarcado y permanece activo, como se esperaba.');
          } else {
            throw new Error('❌ Error: El último switch visible fue desmarcado, lo cual no debería ser posible.');
          }
        });
      } else {
        throw new Error('❌ Error: El último switch no estaba seleccionado inicialmente.');
      }
    });
  });

  afterEach(() => {
    // Restaurar el estado inicial
    cy.get(switchSelector).each(($el, index) => {
      if ($el.prop('checked') !== initialState[index]) {
        cy.wrap($el).click({ force: true }); // Cambiar al estado original
        cy.log(`🔄 Restaurando el estado del switch ${index + 1} al estado inicial.`);
      }
    });
    cy.log('🔄 Test finalizado y el estado fue restaurado correctamente.');
  });

  // Manejo de excepciones no controladas
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
});
