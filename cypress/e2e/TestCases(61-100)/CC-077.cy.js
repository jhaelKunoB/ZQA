import {
  login,
  abrirParametros,
  abrirTipoTransacciónPedido,
} from './funciones';

describe('Verificar relación entre switches "Defecto" y "Visible" con restauración del estado inicial', () => {
  const switchDefectoSelector = '[id^="chk_2_"]'; // Selector para los switches "Defecto"
  const switchVisibleSelector = '[id^="chk_1_"]'; // Selector para los switches "Visible"
  let initialStates = []; // Array para guardar los estados originales de los switches

  beforeEach('Acceso al sistema', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de inicio de sesión
    abrirParametros(); // Función para abrir configuraciones generales
    abrirTipoTransacciónPedido(); // Función para abrir la configuración de Tipo de Transacción Pedido
  });

  it('Validar que al activar "Defecto", el switch "Visible" correspondiente se activa', () => {
    // **Paso 1: Guardar el estado inicial de todos los switches**
    cy.get(switchDefectoSelector).each(($defecto, index) => {
      const defectoChecked = $defecto.is(':checked');
      cy.get(switchVisibleSelector).eq(index).then(($visible) => {
        const visibleChecked = $visible.is(':checked');
        initialStates[index] = { defectoChecked, visibleChecked }; // Guardar estado inicial
      });
    });

    // **Paso 2: Iterar por cada switch de "Defecto" y verificar**
    cy.get(switchDefectoSelector).each(($defecto, index) => {
      cy.get(switchVisibleSelector).eq(index).then(($visible) => {
        const isVisibleChecked = $visible.is(':checked');
        const isDefectoChecked = $defecto.is(':checked');

        if (!isDefectoChecked) {
          cy.wrap($defecto).click(); // Activar el switch "Defecto"
          cy.wrap($defecto).should('be.checked'); // Verificar que se activó

          // Verificar que "Visible" se activó automáticamente
          if (!isVisibleChecked) {
            cy.wrap($visible).should('be.checked');
            cy.log(`✅ El switch "Visible" correspondiente al índice ${index} fue activado automáticamente.`);
          } else {
            cy.log(`🔄 El switch "Visible" correspondiente al índice ${index} ya estaba activo.`);
          }
        }
      });
    });

    // **Paso 3: Verificar regla: No puede haber "Defecto" sin "Visible"**
    cy.get(switchDefectoSelector).each(($defecto, index) => {
      if ($defecto.is(':checked')) {
        cy.get(switchVisibleSelector).eq(index).should('be.checked');
        cy.log(`✅ El switch "Defecto" en el índice ${index} tiene su "Visible" correspondiente activo.`);
      }
    });
  });

  afterEach(() => {
   // **Restaurar los estados iniciales**
   cy.get(switchDefectoSelector).each(($defecto, index) => {
    const originalState = initialStates[index];
  
    // Verificar si el elemento sigue existiendo antes de proceder
    cy.wrap($defecto)
      .should('exist')
      .then(() => {
        const defectoChecked = $defecto.is(':checked');
  
        // Restaurar "Defecto" si es necesario
        if (defectoChecked !== originalState.defectoChecked) {
          cy.wrap($defecto).click({ force: true });
          cy.wrap($defecto).should(
            originalState.defectoChecked ? 'be.checked' : 'not.be.checked'
          );
        }
      });
  
    cy.get(switchVisibleSelector)
      .eq(index)
      .should('exist') // Verificar si el switch Visible existe
      .then(($visible) => {
        const visibleChecked = $visible.is(':checked');
  
        // Restaurar "Visible" si es necesario
        if (visibleChecked !== originalState.visibleChecked) {
          cy.wrap($visible).click({ force: true });
          cy.wrap($visible).should(
            originalState.visibleChecked ? 'be.checked' : 'not.be.checked'
          );
        }
      });
  });
  
  cy.log('🔄 Todos los switches han sido restaurados a su estado original.');
  });

  after(() => {
    cy.log('✅ Prueba finalizada.');
  });
});

// Manejo de excepciones no controladas para evitar fallos en Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('bootstrap is not defined')) {
    return false; // Prevenir que Cypress falle la prueba
  }
});
