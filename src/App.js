import React, { Component } from "react";
import Login from "./components/Login";
import "./App.css";
import Options from "./components/Options";
import { sendVote, checkVote } from "./services/firebase";
import swal from "sweetalert2";
import Count from "./components/Count";

class App extends Component {
  state = {
    alreadyVoted: true,
    user: null,
    finalMessage: null,
    loading: true,
    count: false
  };

  setUser = user => {
    this.setState({ user });
    checkVote(user).then(r => {
      if (r) this.setState({ finalMessage: "Tu ya has votado, ¡gracias!" });
      else this.setState({ alreadyVoted: false });
    });
  };
  makeVote = votes => {
    const { user } = this.state;
    // console.log(votes)
    sendVote(votes, user)
      .then(r => {
        this.setState({ finalMessage: "¡Gracias por tu voto!" });
      })
      .catch(error => {
        swal({
          type: "error",
          title: "Oops...",
          text: "Algo salió mal, vuelve a intentar",
          footer: "" + error
        });
      });
  };

  componentWillMount() {
    console.log(
      "%c ¡No lo haga compa! %c mejor aplica a una vacante:",
      "background: red;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px;",
      ""
    );
    console.log("http://www.fixter.org");
    console.log(
      "%c by BlisS t(*_*t)%c",
      "background: orange;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px;",
      ""
    );
  }

  render() {
    const { user, finalMessage, count, alreadyVoted } = this.state;
    if (count) return <Count />;
    // if(loading) return <img src="https://i.redd.it/ounq1mw5kdxy.gif" />
    if (finalMessage) {
      return (
        <div className="fl">
          <div>
            <img
              src="https://www.ironhack.com/assets/shared/logo.svg"
              alt="ironhack logo"
            />
            <h1 className="despedida">{finalMessage}</h1>
          </div>
        </div>
      );
    }

    if (!user) return <Login setUser={this.setUser} />;
    if (user && !alreadyVoted) return <Options makeVote={this.makeVote} />;
    if (user && alreadyVoted) {
      return (
        <div className="fl">
          <div>
            <img
              src="https://www.ironhack.com/assets/shared/logo.svg"
              alt="ironhack logo"
            />
            <h1 className="despedida">Cargando...</h1>
          </div>
        </div>
      );
    }
  } //render
}

export default App;
