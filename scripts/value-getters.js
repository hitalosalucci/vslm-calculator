(() => {
  'use strict';

  const cols = ['name', 'size', 'max', 'network', 'first', 'last', 'broadcast', 'mask', 'prefix', 'next'];

  const getCheckboxTarget = (chbx) => {
    return chbx
      .id
      .split('-')
      .pop();
  };

  const getCols = () => {
    return cols;
  };

  window.vlsm.valueGetters = {
    getCols
  };
})();
