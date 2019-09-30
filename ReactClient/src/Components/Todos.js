import React from 'react';
import { connect } from "react-redux";
import { cambiarEstado } from "../Redux/actions/todosActions";

const Todos = ({ todos , cambiarEstado }) =>(
    <div className="col-md-8">
        <div className="row">
        {
            todos.map(t => (
                <div className="col-md-4" key={t.id}>
                    <div className="card mt-4">
                        <img src= {t.urlArchivo} class="card-img-top" alt="..." />  
                        <div className="card-title text-center">
                            <h3>{t.id}</h3>
                            <span className="badge">
                                {t.estado}
                            </span>
                        </div>
                        <div className="card-text">
                            <h3>{t.descripcion}</h3>
                        </div>
                        <div className="card-footer center">
                            <button
                                className="btn btn-danger"
                                onClick={() => cambiarEstado(t)}>
                                Resuelto
                            </button>
                        </div>
                    </div>
                </div>

            ))
        }    
        </div>
    </div>
)

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    cambiarEstado : (todo) => dispatch(cambiarEstado(todo))
});


export default connect(mapStateToProps, mapDispatchToProps)(Todos)