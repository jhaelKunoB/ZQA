import {
  login,
  abrirParametros,
  abrirTipoDocumentoIdentidad,
  closeModal,
} from './funciones';

describe('Verificar que solo un tipo de documento esté seleccionado como "Defecto" en la Configuración de Tipos de Documento de Identidad', () => {
  const switchSelector = '[id^="chk_2_"]'; // Selector común para los switches "Defecto"
  let initialStates = []; // Array para guardar los estados originales

  beforeEach('Acceso al sistema', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de inicio de sesión
    abrirParametros(); // Función para abrir configuraciones generales
    abrirTipoDocumentoIdentidad(); // Función para abrir la configuración de Tipos de Documento de Identidad
  });

  it('Validar que solo un switch de "Defecto" puede estar activo a la vez y devolver al estado original', () => {
    // **Paso 1: Guardar el estado inicial de todos los switches**
    cy.get(switchSelector).each(($el, index) => {
      initialStates[index] = $el.is(':checked'); // Guardar el estado (true o false)
    });

    // **Paso 2: Validar que no haya más de un switch activo inicialmente**
    

    // **Paso 3: Encontrar el primer switch desactivado, activarlo y verificar**
    cy.get(switchSelector).each(($el) => {
      if (!$el.is(':checked')) {
        cy.wrap($el).click(); // Activar el switch desactivado
        cy.wrap($el).should('be.checked'); // Verificar que está activo

        // Verificar que todos los demás switches están desactivados
        cy.get(switchSelector).then(($switches) => {
          const activeSwitches = $switches.filter(':checked').length; // Contar switches activos
          if (activeSwitches > 1) {
            throw new Error(`❌ Error: Hay más de un switch activo inicialmente (${activeSwitches}).`);
          } else {
            cy.log(`✅ Solo un switch está activo inicialmente (${activeSwitches} activo).`);
          }
        });

        cy.log('✅ Un switch desactivado fue activado correctamente y los demás están desactivados.');
        return false; // Salir del loop después de encontrar el primer switch desactivado
      }
    });

    // **Paso 4: Restaurar los estados originales**
    cy.get(switchSelector).each(($el, index) => {
      const originalState = initialStates[index]; // Estado original guardado
      if ($el.is(':checked') !== originalState) {
        cy.wrap($el).click(); // Restaurar el estado original
        cy.wrap($el).should(originalState ? 'be.checked' : 'not.be.checked'); // Verificar
      }
    });

    cy.log('🔄 Todos los switches han sido restaurados a su estado original.');
  });

  afterEach(() => {
    //closeModal(); // Opcional: Cierra el modal después de la prueba
  });
});

// Prevenir que Cypress falle la prueba por excepciones no controladas
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});
