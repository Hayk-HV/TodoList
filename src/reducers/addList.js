const initialState = [];

const change = (state, action) => {
  switch(action.type) {
    case 'CHANGE_STATUS': 
    if (state.id !== action.id) {
      return state;
    }
      return {
        ...state,
        compleat: !state.compleat
      }
    default: 
    return state;
  }
}

const addList = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
      	...state,
      	action.payload
     ]
     case 'CHANGE_STATUS':
      return state.map(t => 
            change(t, action))
    default:
  return state;
      case 'DELETE_ITEM' :
      let arr = state;
      arr.splice(action.id,1);
      return [
        ...state,
      ]
  }
}

export default addList;