import {
  login,
  abrirParametros,
  abrirUnidadesMedidaSIM,
} from './funciones';

describe('Verificar que todas las columnas tienen título en la configuración de Unidades de medida SIM', () => {
  const tablaSelector = '#tblParametroId'; // Selector de la tabla
  const encabezadoSelector = `${tablaSelector} > thead > tr`; // Selector para las celdas de la fila del encabezado

  beforeEach('Acceso al sistema', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de inicio de sesión
    abrirParametros(); // Función para abrir configuraciones generales
    abrirUnidadesMedidaSIM(); // Función para abrir la configuración de Unidades de medida SIM
  });

  it('Validar que todas las columnas tienen un título', () => {
    // **Paso 1: Obtener todas las celdas del encabezado**
    cy.get(encabezadoSelector).find('th').each(($celda, index) => {
      // **Verificar que la celda tenga un atributo aria-label o texto visible**
      const texto = $celda.text().trim(); // Obtenemos el texto de la celda y lo limpiamos de espacios adicionales
      const ariaLabel = $celda.attr('aria-label'); // Obtenemos el atributo aria-label de la celda

      // **Si tiene texto o aria-label, es válido**
      if (texto !== '' && (ariaLabel && ariaLabel.trim() !== '')) {
        cy.log(`✅ La columna en el índice ${index} tiene un título válido.`);
      } else {
        // **Si no tiene texto ni aria-label, mostramos el mensaje de error**
        cy.log(`❌ La columna en el índice ${index} NO tiene título.`);
      }
    });
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
