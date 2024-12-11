import { login, abrirParametros, abrirFactura, abrirTipoTransacciónPedido, closeModal } from './funciones';

describe('Verificar selección automática del Tipo de Transacción Pedido configurado como "Defecto"', () => {
  const defectoSelector = 'td:nth-of-type(5) .form-check input'; // Selector del switch "Defecto" (ajusta según tu caso)
  const tableRowSelector = '#tblParametroId > tbody > tr'; // Selector de filas de la tabla
  const abreviaturaSelector = 'td:nth-of-type(2)'; // Selector de columna de abreviaturas
  let defectoAbreviatura = ''; // Variable para guardar la abreviatura del Tipo de Transacción Pedido "Defecto"

  before('Acceso al sistema y configuración inicial', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Iniciar sesión
    abrirParametros(); // Abrir configuraciones generales
  });

  it('Validar que el Tipo de Transacción Pedido "Defecto" se preseleccione automáticamente al facturar', () => {
    abrirTipoTransacciónPedido(); // Abrir Tipo de Transacción Pedido

    // Paso 1: Iterar sobre los switches y capturar la abreviatura del Tipo de Transacción Pedido configurado como "Defecto"
    let defectoEncontrado = false; // Bandera para verificar si hay un "Defecto" configurado

    cy.get(`${tableRowSelector}`).each(($row) => {
      cy.wrap($row).within(() => {
        cy.get(defectoSelector).then(($defectoSwitch) => {
          if ($defectoSwitch.prop('checked')) {
            defectoEncontrado = true;
            cy.get(abreviaturaSelector).invoke('text').then((text) => {
              defectoAbreviatura = text.trim(); // Guardar la abreviatura
              cy.log(`Abreviatura configurada como "Defecto": ${defectoAbreviatura}`);
            });
          }
        });
      });
    }).then(() => {
      if (!defectoEncontrado) {
        cy.log('No hay ningún Tipo de Transacción Pedido configurado como "Defecto".');
        throw new Error('Ningún Tipo de Transacción Pedido está configurado como "Defecto".');
      }
    });

    closeModal(); // Cerrar el modal de configuración

    // Paso 2: Navegar a la pantalla de facturación
    abrirFactura();

    // Paso 3: Validar que la abreviatura configurada como "Defecto" esté marcada por defecto en la factura
    cy.get('#btnFacturaManual').click();
    cy.wait(2000);

    cy.get("tr:nth-of-type(1) > td:nth-of-type(2)").click(); // Seleccionar un producto
    cy.get("#btnCobrarSteep1").click(); // Ir a la siguiente pantalla
    cy.get('.row.container-fixed .col-2 input[type="radio"]').each(($radio) => {
      // Obtén el atributo 'alt' del radio
      const altValue = $radio.attr('alt');
      
      // Verifica si el alt coincide con el valor esperado
      if (altValue === 'CI') {
        // Verifica si está seleccionado
        cy.wrap($radio).should('be.checked').then((checked) => {
          if (checked) {
            cy.log('El test pasó: El radio con alt="CI" está seleccionado');
          } else {
            cy.log('El test falló: El radio con alt="CI" no está seleccionado');
          }
        });
      }
    });
    

  });

  after(() => {
    cy.log('Test finalizado.');
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('bootstrap is not defined')) {
      return false; // Prevenir que Cypress falle la prueba
    }
  });
});
