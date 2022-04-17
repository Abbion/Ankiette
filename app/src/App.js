import React, { Component } from "react";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";

import PreLoginTemplateView from './Views/PreLoginTemplateView'

class App extends Component {
  render() {
    return <div style={{margin: 0}} className="App">
        <PreLoginTemplateView />
        
    </div>
  };
}

export default App;
