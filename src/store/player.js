export default {
  namespaced: true,
  state: {
    currentTileLayerSelection: null,
  },
  mutations: {
    setCurrentTileLayerSelection(state, data) {
        state.currentTileLayerSelection = data;
    },
  },
  actions: {},
};
