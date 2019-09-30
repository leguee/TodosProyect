import React, { Component } from "react";
import Navigation from './Navigation'
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import FiltroTodos from "./FiltroTodos";
import { connect } from "react-redux";
import { fetchTodos, filtrarTodos, agregarTodo  } from "../Redux/actions/todosActions";

class TodoItems extends Component{
    constructor(){
        super();
        this.state = {
            titulo: "Aplicacion de TODOs",
            idFilter:"",
            descripcionFilter:"",
            estadoFilter:""
        }
    }

    componentDidMount() {
        this.props.fetchTodos();
    }
    
    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    
    onFilter = () => this.props.filtrarTodos(this.state.idFilter,
                                                this.state.descripcionFilter,
                                                this.state.estadoFilter);

    handleAgregarTodo(todo){
        // llamado a la accion agregar todo
        this.props.agregarTodo(todo);
      
    }

    render(){ 
        if (!this.props.loading) {
        return(
            <div>
                <Navigation titulo={this.state.titulo}/>
                <FiltroTodos 
                                idValue = {this.state.idFilter}
                                idName = "idFilter"
                                descripcionValue = {this.state.descripcionFilter}
                                descripcionName = "descripcionFilter"
                                estadoValue = {this.state.estadoFilter}
                                estadoName = "estadoFilter"
                                handleChange = {this.handleChange}
                                onFilter = {this.onFilter}/>
                <div className="container" >
                    <div className="row mt-4">
                        <div className="col-md-4 text-center">
                            <TodoForm onAgregarTodo={this.handleAgregarTodo} />
                        </div>
                        <Todos />
                    </div>
                </div>
           </div>
        ) }
        return <p className="text-center">Cargando TODOs...</p>;
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    loading: state.loading,
    error: state.error,
});
  
const mapDispatchToProps = dispatch => ({
    fetchTodos : () => dispatch(fetchTodos()),
    filtrarTodos : (id, descripcion, estado) => dispatch(filtrarTodos(id, descripcion, estado)),
    agregarTodo : (todo) => dispatch(agregarTodo(todo)),
});
  
export default connect(mapStateToProps,mapDispatchToProps)(TodoItems);
