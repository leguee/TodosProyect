import {
    FETCH_TODOS_BEGIN,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_ERROR,
    AGREGAR_TODO,
    CAMBIAR_ESTADO
  } from '../actions/todosActions';


const initialState = {
    todos: [],
    idFilter:"",
    estadoFilter:"",
    descripcionFilter:"",
    error: null,
    loading: false
  };

  function todosReducer(state = initialState , action){
    switch(action.type) {
        case FETCH_TODOS_BEGIN:
          return {
            ...state,
            loading: true,
            error: null
          };
    
        case FETCH_TODOS_SUCCESS:
          return {
            ...state,
            loading: false,
            todos: action.payload.todos
          };
    
        case FETCH_TODOS_ERROR:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            todos: []
          };
       
        case CAMBIAR_ESTADO:
        return {
            ...state,
            todo: action.payload.todo
        };

        case AGREGAR_TODO:
            return {
                ...state,
                todo: action.payload.todo
            };
            
        default:
          return state;
      }
  }

  export default todosReducer;