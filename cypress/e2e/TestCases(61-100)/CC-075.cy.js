import { login, abrirParametros, abrirFactura, abrirTipoTransacciónPedido, closeModal } from './funciones';

describe('Visualización de los Tipos de Documento al hacer la factura de una venta según Visibilidad de "Tipo de Transacción Pedido"', () => {
  const switchSelector = 'td:nth-of-type(4) .form-check input'; // Selector del switch (ajusta según tu caso)
  const tableRowSelector = '#tblParametroId > tbody > tr'; // Selector de filas de la tabla
  const abreviaturaSelector = 'td:nth-of-type(2)'; // Selector de columna de abreviaturas
  let visibleIndexes = []; // Lista para almacenar índices de switches marcados
  let abreviaturasVisibles = []; // Lista para almacenar abreviaturas visibles

  before('Acceso al sistema y configuración inicial', () => {
    cy.visit('http://democafeteria.frogsolutions.net/login.aspx');
    login(); // Iniciar sesión
    abrirParametros(); // Abrir configuraciones generales
  });

  it('Validar que solo los tipos "Visibles" aparezcan en la selección de Facturar', () => {
    abrirTipoTransacciónPedido(); // Abrir Tipo de Transacción Pedido

    // Paso 1: Iterar sobre los switches y guardar índices de los marcados como "checked"
    cy.get(`${tableRowSelector}`).each(($row, index) => {
      cy.wrap($row).within(() => {
        cy.get(switchSelector).then(($switch) => {
          if ($switch.prop('checked')) {
            visibleIndexes.push(index + 1); // Guardar índice (sumar 1 porque nth-child empieza en 1)
          }
        });
      });
    });

    // Paso 2: Usar los índices para obtener las abreviaturas correspondientes
    cy.wrap(visibleIndexes).each((rowIndex) => {
      cy.get(`#tblParametroId > tbody > :nth-child(${rowIndex}) > ${abreviaturaSelector}`)
        .invoke('text')
        .then((text) => {
          abreviaturasVisibles.push(text.trim()); // Guardar abreviatura visible
        });
    });

    closeModal();

    // Paso 3: Navegar a la pantalla de facturación
    abrirFactura();

    // Paso 4: Abrir la interfaz de Facturar
    cy.get('#btnFacturaManual').click();
    cy.wait(2000);

    cy.get("tr:nth-of-type(1) > td:nth-of-type(2)").click();
    cy.get("#btnCobrarSteep1").click();

    // Paso 5: Validar que las abreviaturas visibles aparecen como opciones de selección
    cy.get('#facturar-justified .row').then(($rows) => {
      let todasAbreviaturasPresentes = true;

      abreviaturasVisibles.forEach((abreviatura) => {
        const existe = Cypress.$($rows).find(`label:contains(${abreviatura})`).length > 0;
        if (!existe) {
          todasAbreviaturasPresentes = false;
          cy.log(`La abreviatura "${abreviatura}" no está visible.`);
        }
      });

      if (todasAbreviaturasPresentes) {
        cy.log('Todas las abreviaturas visibles están correctamente listadas.');
      } else {
        throw new Error('Algunas abreviaturas visibles no están presentes.');
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
