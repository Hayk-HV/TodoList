const addItem = (name) => {
  return {
    type: 'ADD_ITEM',
    payload: {
      compleat: false,
      id: Date.now().toString(),
      name,
    }
  }
}

export default addItem;