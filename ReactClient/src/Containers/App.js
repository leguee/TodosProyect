import React, { Component} from 'react';
import './App.css';
import TodoItems from '../Components/TodoItems';

class App extends Component {
  render(){
    return(
      <div className="App">
       <TodoItems />
      </div>
    );
  }
}

export default App;
