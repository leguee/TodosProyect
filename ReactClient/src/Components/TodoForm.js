import React, { Component } from "react";

class TodoForm extends Component {
    constructor(){
        super();
        this.state = {
            descripcion: '',
            estado: '',
            urlArchivo:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e){
        // no refrescar la pantalla
        e.preventDefault();
        // paso el estado al metodo de la propiedad del evento, para que lo guarde
        this.props.onAgregarTodo(this.state);

        // una vez que lo manda resetea el form
        this.setState({
            descripcion: '',
            estado: '',
            urlArchivo:''
        })
    }

    handleInputChange(e){
        const {value, name} = e.target;
        this.setState({
          [name]: value
        });
    }

    render(){
        return(
            <div className="card">
                <form onSubmit={this.handleSubmit} className="card-body">
                    
                    <div className="form-group">
                        <input className='form-control' 
                            name="descripcion"
                            type='text' 
                            placeholder='descripcion'
                            value={this.state.descripcion}
                            onChange = {this.handleInputChange}/>
                        <input className='form-control' 
                            name="urlArchivo"
                            type='text' 
                            placeholder='urlArchivo'
                            value={this.state.urlArchivo}
                            onChange = {this.handleInputChange}/>
                        <select
                            name="estado"
                            className="form-control"
                            value={this.state.estado}
                            onChange={this.handleInputChange}>
                            <option>nuevo</option>
                            <option>pendiente</option>
                            <option>resuelto</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Agregar
                    </button>
                </form>
            </div>
        );
    }
}

export default TodoForm;