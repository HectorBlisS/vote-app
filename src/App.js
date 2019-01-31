import React, { Component } from 'react';
import Login from './components/Login'
import './App.css';
import Options from './components/Options'
import {sendVote, checkVote} from './services/firebase'
import swal from 'sweetalert2';
import Count from './components/Count'

class App extends Component {
  state = {
    user:null,
    finalMessage:null,
    loading: true,
    count:true
  }

  componentWillMount(){
  }

  setUser = (user) => {
    this.setState({user})
    checkVote(user)
    .then(r=>{
      console.log(r)
      if(r) this.setState({ finalMessage:"Tu ya has votado, ¡gracias!"})
    })
  }
  makeVote = (votes) => {
    const {user} = this.state
    // console.log(votes)
    sendVote(votes, user)
    .then(r=>{
      this.setState({finalMessage:"¡Gracias por tu voto!"})
    })
    .catch(error=>{
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, vuelve a intentar',
        footer: "" + error
      })
    })
  }

  render() {
    const {user, finalMessage, loading, count} = this.state
    if(count) return <Count />
    // if(loading) return <img src="https://i.redd.it/ounq1mw5kdxy.gif" />
    if(finalMessage){
      return (
        <div className="fl">
        <div>
          <img src="https://www.ironhack.com/assets/shared/logo.svg"/>
          <h1 className="despedida">{finalMessage}</h1></div>
        </div>)
    }  
    if(!user) return <Login setUser={this.setUser} />
    if(user) return <Options makeVote={this.makeVote} />
    return (
      <div>
        Votacion
      </div>
    );
  }
}

export default App;
