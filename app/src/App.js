import React, { Component } from "react";
import UserInput from "./Components/UserInput";

class App extends Component {
  render() {
    return (
      <div className="App">
        zwykly input
        <UserInput type="text" label="test"></UserInput>

        input, w przypadku, gdy nie zostanie uzupelniony, podswietla uzytkownikowi na czerwono
        <UserInput type="text" label="test" required></UserInput>

        input z podswietleniem i podanym bledem
        <UserInput type="text" label="test" required errorMessage="Brak tekstu"></UserInput>

        input jak wyzej, jezeli pattern nie zostanie spelniony, wprowadzone dane sa bledne
        <UserInput type="text" label="test" required errorMessage="Brak tekstu" pattern="test"></UserInput>


        
       
      </div>
    );
  }
}

export default App;
