(() => {
  'use strict';
  const vlsmTable = window.vlsm.vlsmTable;
  const buildSubnet = window.vlsm.templates.subnetList;
  const buildTable = window.vlsm.templates.table;
  const { infoToRow } = window.vlsm.templates.utils;
  const { getCols } = window.vlsm.valueGetters;
  const {
    numIsPositiveInt,
  } = window.vlsm.validation;

  const generateButton = document.getElementById('button-generate');
  const removeSubnetButton = document.getElementById('button-minus');
  const addSubnetButton = document.getElementById('button-plus');
  const subnetList = document.getElementById('subnet-list');
  const tableContainer = document.getElementById('table-container');

  const subnets = [];

  const removeSubnet = () => {
    if (subnets.length > 1) {
      subnetList.removeChild(subnets.pop());
      countSubnets(subnets.length);
      return
    }
    
    alert('Você precisa ter ao menos uma sub rede para realizar o cálculo')
  };

  const countSubnets = (value) => {
    const countDiv = document.getElementById('count-subnets');

    countDiv.innerHTML = value;
  }

  const addSubnet = () => {
    const newSubnet = buildSubnet(subnets.length);
    subnets.push(newSubnet);
    subnetList.appendChild(newSubnet);
    countSubnets(subnets.length);
  };

  const getSubnetInfo = (netElement) => {
    const [nameElement, sizeElement] = netElement.querySelectorAll('input');
    const subnetNumber = netElement.querySelector('.subnet-number').innerText;

    if (nameElement?.value?.trim() == ''){
      alert(`Digite o NOME da ${subnetNumber}`)
      return
    }
    else if(sizeElement?.value?.trim() == ''){
      alert(`Digite o N° DE HOSTS da ${subnetNumber}`)      
      return
    }
    else if (parseInt(sizeElement.value) < 1){
      alert(`Digite um valor MAIOR QUE 1 para ${subnetNumber}`);
      return
    }

    return {
      name: nameElement.value,
      size: parseInt(sizeElement.value)
    };
  };

  const checkInputs = () => {
    let isValid = true;
    const valuesInputs = [document.getElementById('ip-block').value, document.getElementById('mask-block').value];
    valuesInputs.map((value) => {
      if (value.trim() == '')
        isValid = false;
    })
      
    if (!isValid)
      alert('Você deve digitar o IP e a máscara para realizar o cálculo')
  };

  const generateTable = () => {
    checkInputs();
    const rootIp = document.getElementById('ip-block').value;
    const netInfo = subnets.map((net) => getSubnetInfo(net));
    netInfo.sort((a, b) => b.size - a.size);
    const tableBody = vlsmTable(rootIp, netInfo);
    const rowInfo = tableBody.map((info) => infoToRow(info));
    const table = buildTable(getCols(), rowInfo);

    if (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild);
    }
    tableContainer.appendChild(table);
  };

  removeSubnetButton.onclick = removeSubnet;
  addSubnetButton.onclick = addSubnet;
  generateButton.onclick = generateTable;

  window.vlsm.buttons = {
    addSubnet
  };
})();
