import { createStore,combineReducers } from 'redux';
import todosResult from "./reducers/todosResult";

const reducer = combineReducers({
    todosResult
});

const store = createStore(reducer);

export default store;