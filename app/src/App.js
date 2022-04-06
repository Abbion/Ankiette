import React, {Component} from 'react'

import LoginView from './Views/LoginView'
import FontImporter from './Components/FontImporter';

class App extends Component {
  render() {
    return <div style={{margin: 0}} className="App">
        <FontImporter />
        <LoginView />
        
    </div>
  };
}

export default App;
