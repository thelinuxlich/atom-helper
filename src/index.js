export default {
  enrichStandardFields(atomName, data, addStreamData) {
    data.generatedValue =
      typeof data.generatedValue === 'number' ? ++data.generatedValue : 1;
    addStreamData(`atom:${atomName}:complete`, data);
    // treating only WS for now
    if (data.transport && data.transport === 'ws') {
      data.origin = `atom:${atomName}:trigger`;
      addStreamData('transport:ws:trigger', data);
    }
    if (data.execution && data.process) {
      addStreamData('execution:trigger', {
        process: data.process,
        id: data.execution,
        payload: data.payload + ' - ' + data.generatedValue,
      });
    }
  },
};
