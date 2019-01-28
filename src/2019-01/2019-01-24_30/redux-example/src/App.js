import React, { Component } from 'react';
import Header from './routes/header';
import Side from './routes/side';

class App extends Component {
  render() {
    return (
      <div className="App">
       	<Header/>
         <Side />
      </div>
    );
  }
}

export default App;
