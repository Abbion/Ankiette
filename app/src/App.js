import React, { Component } from "react";

import LoginView from './Views/LoginView'
import RegisterView from "./Views/RegisterView";

class App extends Component {
  render() {
    return <div style={{margin: 0}} className="App">
        {/* <LoginView /> */}
        <RegisterView/>
        
    </div>
  };
}

export default App;
