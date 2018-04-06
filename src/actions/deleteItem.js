const deleteItems = (id) => {
	return {
		type: "DELETE_ITEM",
		id
	}
};

export default deleteItems;