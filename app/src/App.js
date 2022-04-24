import React, { Component } from "react";

import PreLoginTemplateView from "./Views/PreLoginTemplateView";
import NavbarView from './Views/NavbarView'

class App extends Component {
  render() {
    return <div style={{margin: 0}} className="App">        
        {/* <PreLoginTemplateView /> */}
        <NavbarView />
    </div>
  };
}

export default App;
