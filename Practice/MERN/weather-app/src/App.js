import './App.css';
import Box from './Box/Box'
import React,{ Component } from 'react';

class App extends Component{
render(){
  return (
    <div className="App">
      <header className="App-header">
        <Box/>
      </header>
    </div>
  );
}
}

export default App;
