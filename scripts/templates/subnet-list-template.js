(() => {
  'use strict';
  const { parseHtmlStr } = window.vlsm.templates.utils;

  const targets = {
    NAME: 'name',
    SIZE: 'size'
  };

  const buildValueNameHost = (idInt) => {
    const value = idInt + 1;
    if (value < 10) 
      return `0${value}`;

    return value; 
  }

  const buildInput = (idInt, target) => {
    const type = `type="${target == 'size' ? 'number' : 'text'}"`;
    const tagsInputNumber = `${target == 'size' ? 'min="1"' : ''}`;
    const value = `value="${target == 'name' ? `Host${buildValueNameHost(idInt)}`: ''}" `;
    const idStr = `id="${target}-net-${idInt}"`;
    const classStr = `class="check-input float-input ${target}-net"`;
    const placeholder = `placeholder="${target}"`;
    const inputAttr = `${type} ${tagsInputNumber} ${value} ${idStr} ${classStr} ${placeholder}`;
    return `<input ${inputAttr}>`;
  };

  const buildLabel = (idInt, target) => {
    const forStr = `for="${target}-net-${idInt}"`;
    const idStr = `id="label-${target}-net-${idInt}"`;
    const classStr = 'class="float-label"';
    const dataContent = `data-content="${target == 'name' ? 'Nome' : 'N° de Hosts'}"`;
    const labelAttr = `${forStr} ${idStr} ${classStr} ${dataContent}`;
    const span = `<span class="float-hidden">${target}</span>`;
    return `<label ${labelAttr}>${span}</label>`;
  };

  const buildField = (idInt, target) => {
    const input = buildInput(idInt, target);
    const label = buildLabel(idInt, target);
    const floatField = `<div class="float-field">${input}${label}</div>`;
    return `<div class="form-field">${floatField}</div>`;
  };

  const buildSubnet = (idInt) => {
    const name = buildField(idInt, targets.NAME);
    const size = buildField(idInt, targets.SIZE);
    const spanAttr = `ìd="subnet-number-${idInt}" class="subnet-number subnet-title"`;
    const span = `<span ${spanAttr}> SUB REDE #${idInt + 1}</span>`;
    const divAttr = `id="subnet-details-${idInt}" class="subnet-details"`;
    return parseHtmlStr(`<div ${divAttr}>${span}${name}${size}</div>`);
  };

  window.vlsm.templates.subnetList = buildSubnet;
})();
