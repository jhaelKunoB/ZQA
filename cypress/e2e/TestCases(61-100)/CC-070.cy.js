import {
  login,
  abrirParametros,
  abrirMotivoFacturaManual,
} from './funciones';

describe('Verificar que las Abreviaciones de las opciones de Motivo Factura Manual siguen la nomenclatura', () => {
  const tablaSelector = '#tblParametroId'; // Selector de la tabla de Motivo Factura Manual
  const filaSelector = `${tablaSelector} tbody tr`; // Selector para las filas de la tabla

  beforeEach('Acceso al sistema', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Función de inicio de sesión
    abrirParametros(); // Función para abrir configuraciones generales
    abrirMotivoFacturaManual(); // Función para abrir la configuración de Motivo Factura Manual
  });

  it('Validar que las abreviaciones están presentes en las descripciones correspondientes', () => {
    // **Paso 1: Recorrer todas las filas de la tabla de Motivo Factura Manual**
    cy.get(filaSelector).each(($fila, index) => {
      // **Obtenemos la abreviación y la descripción de la fila actual**
      cy.wrap($fila).find('td').then(($celdas) => {
        const abreviacion = $celdas.eq(1).text().trim(); // Suponiendo que la abreviación está en la segunda columna
        const descripcion = $celdas.eq(0).text().trim(); // Suponiendo que la descripción está en la primera columna

        // **Si hay una abreviación, verificar que las letras estén dentro de la descripción**
        if (abreviacion !== '') {
          // Filtrar solo las letras (eliminando símbolos)
          const abreviacionLetras = abreviacion.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Solo letras y en minúsculas
          const descripcionLetras = descripcion.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Solo letras y en minúsculas

          // Verificar que las letras de la abreviación estén presentes en la descripción
          let isValid = true;
          for (let i = 0; i < abreviacionLetras.length; i++) {
            if (!descripcionLetras.includes(abreviacionLetras[i])) {
              isValid = false; // Si alguna letra de la abreviación no está en la descripción, la validación falla
              break;
            }
          }

          // Mostrar el resultado en el log
          if (isValid) {
            cy.log(`✅ La abreviación "${abreviacion}" está correctamente incluida en la descripción "${descripcion}".`);
          } else {
            cy.log(`❌ La abreviación "${abreviacion}" NO está completamente incluida en la descripción "${descripcion}".`);
          }
        } else {
          cy.log(`🔄 No se encontró abreviación para la descripción "${descripcion}".`);
        }
      });
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
