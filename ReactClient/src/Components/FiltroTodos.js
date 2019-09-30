import React from 'react';

function FiltroTodos(props){
    return (
        <div className='form-group'>
    
            <input className='form-control'
                   type='number' 
                   placeholder='ID'
                   name={props.idName}
                   value={props.idValue}
                   onChange = {(e) => props.handleChange(e)}
                   />
            <input className='form-control' 
                   type='text' 
                   placeholder='Descripcion'
                   value={props.descripcionValue}
                   name={props.descripcionName}
                   onChange = {(e) => props.handleChange(e)}/>
            <input className='form-control' 
                   type='text' 
                   placeholder='Estado'
                   value={props.estadoValue}
                   name={props.estadoName}
                   onChange = {(e) => props.handleChange(e)}/>
            <input className='btn btn-primary'
                   type='button' 
                   value='Buscar'
                   onClick = {props.onFilter}/>
        </div>
    );
}

export default FiltroTodos;