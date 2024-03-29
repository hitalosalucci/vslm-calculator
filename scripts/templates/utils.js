(() => {
  'use strict';
  const { getCols } = window.vlsm.valueGetters;

  const parseHtmlStr = (htmlStr) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlStr;
    return wrapper.firstChild;
  };

  const infoToRow = (info) => {
    return getCols().map((colName) => info[colName]);
  };

  window.vlsm.templates.utils = {
    parseHtmlStr,
    infoToRow
  };
})();
