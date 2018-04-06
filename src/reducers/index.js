import { combineReducers } from 'redux';
import addList from './addList';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
	addList,
	visibilityFilter
});

export default reducer;