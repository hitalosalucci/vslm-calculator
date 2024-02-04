(() => {
  'use strict';
  const { parseHtmlStr } = window.vlsm.templates.utils;

  const buildTableRow = (locals) => {
    const reducer = (acc, cur) => `${acc}<td>${cur}</td>`;
    const cols = locals.reduce(reducer, '');
    return `<tr>${cols}</tr>`;
  };

  const translateHeader = (value) => {
    const listHeader = {
      'name': 'Nome',
      'size': 'N° de Hosts',
      'network': 'Rede',
      'broadcast': 'Broadcast',
      'first': 'Primeiro IP',
      'last': 'Último IP',
      'next': 'Próximo',
      'mask': 'Máscara',
      'prefix': 'Prefixo',
      'max': 'Máximo de Hosts'
    };

    return listHeader[value];
  }

  const buildTableHead = (rowHeaders) => {
    const reducer = (acc, cur) => `${acc}<th>${translateHeader(cur)}</th>`;
    const cols = rowHeaders.reduce(reducer, '');
    return `<thead><tr>${cols}</tr></thead>`;
  };

  const buildTableBody = (rows) => {
    const reducer = (acc, cur) => `${acc}${buildTableRow(cur)}`;
    return `<tbody>${rows.reduce(reducer, '')}</tbody>`;
  };

  const buildTable = (headers, rows) => {
    const thead = buildTableHead(headers);
    const tbody = buildTableBody(rows);
    return parseHtmlStr(`<div class="card card-table"> <h6 class="text-center">Resultado</h6> <table>${thead}${tbody}</table> </div>`);
  };

  window.vlsm.templates.table = buildTable;
})();
