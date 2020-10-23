const initialState = {
  selectedGroup: null,
};

const window = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT': {
      return {
        ...state,
        selectedGroup: action.payload
      };
    }
    default:
      return state;
  }
};

export default window;

export const getSelectedGroup = state => state.selectedGroup;
