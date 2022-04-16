import React, {Component} from 'react'

import PreLoginTemplateView from './Views/PreLoginTemplateView'
import FontImporter from './Components/FontImporter';

class App extends Component {
  render() {
    return <div style={{margin: 0}} className="App">
        <FontImporter />
        <PreLoginTemplateView />
        
    </div>
  };
}

export default App;
