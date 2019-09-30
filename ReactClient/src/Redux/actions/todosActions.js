import axios from "axios";

export const FETCH_TODOS_BEGIN = 'FETCH_TODOS_BEGIN';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';
export const CAMBIAR_ESTADO = 'CAMBIAR_ESTADO';
export const AGREGAR_TODO = 'AGREGAR_TODO';

export const fetchTodosBegin = () => {
    return {
        type: FETCH_TODOS_BEGIN
    }
}

export const fetchTodosSuccess = (todos) => {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: todos ? {todos} : {todos:[]}
    }
}

export const fetchTodosError = (error) => {
    return {
        type: FETCH_TODOS_ERROR,
        payload: {error}
    }
}

export const fetchTodos = () => {
    return dispatch => {
        dispatch(fetchTodosBegin());
        return axios.get('http://localhost:51239/api/Todos')
        .then(res => {
            dispatch(fetchTodosSuccess(res.data));
        })
        .catch(e => {
            dispatch(fetchTodosError(e));
        })
    }
}

export const filtrarTodos = (idFilter, descripcionFilter, estadoFilter) => {
    return dispatch => {
        dispatch(fetchTodosBegin());
        var id = idFilter ? "id=" + idFilter + "&": null;
        var descripcion = descripcionFilter ? "descripcion=" + descripcionFilter + "&": null;
        var estado = estadoFilter ? "estado=" + estadoFilter + "&": null; 
        var urlFilter = 'http://localhost:51239/api/Todos?' + id + descripcion + estado;
        return axios.get(urlFilter)
        .then(res => {
            dispatch(fetchTodosSuccess(res.data));
        })
        .catch(e => {
            dispatch(fetchTodosError(e));
        })
    }
}

export const cambiarEstado = (todo) => {
    const request = axios.put('http://localhost:51239/api/Todos',
    {   id: todo.id,
        descripcion: todo.descripcion,
        estado: "resuelto"
    })
    
    return ({
        type: CAMBIAR_ESTADO,
        todo: request.data
    });
}

export const agregarTodo = (todo) => {
    const request = axios.post('http://localhost:51239/api/Todos',
    {   
        descripcion: todo.descripcion,
        estado: todo.estado,
        urlArchivo: todo.urlArchivo
    })
    
    return ({
        type: AGREGAR_TODO,
        todo: request.data
    });
}