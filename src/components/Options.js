import React, { Component } from "react";
import Option from "./Option";
import swal from "sweetalert2";

class Options extends Component {
  state = {
    votes: [],
    options: {
      1: {
        id: 1,
        name: "Millenial Runner",
        student: "Gerardo Jiménez"
      },
      2: {
        id: 2,
        name: "RPG-BattleRoyale",
        student: "Miguel Gómez"
      },
      3: {
        id: 3,
        name: "DANCING HERO",
        student: "Pily Domínguez"
      },
      4: {
        id: 4,
        name: "Portal Runner",
        student: "Mefit Hernández"
      },
      5: {
        id: 5,
        name: "En moto a Cancún",
        student: "Rodrigo Centeno"
      },
      6: {
        id: 6,
        name: "IronPacman",
        student: "Carlos Rivera"
      },
      7: {
        id: 7,
        name: "Evol",
        student: "Rene Manzano"
      },
      8: {
        id: 8,
        name: "X-Fighters",
        student: "Fermín López"
      },
      9: {
        id: 9,
        name: "Ayuda a Lolo a ser más gordito",
        student: "Fernando Hernández"
      },
      10: {
        id: 10,
        name: "Marimo Balls",
        student: "Omar Avelar"
      },
      11: {
        id: 11,
        name: "Banana!!!",
        student: "Miguel López"
      },
      12: {
        id: 12,
        name: "Taco Rex",
        student: "Montse Ortiz"
      },
      13: {
        id: 13,
        name: "Space Warrior",
        student: "Diego Vizarreta"
      },
      14: {
        id: 14,
        name: "Retro Runner",
        student: "Santiago Miranda"
      },
      15: {
        id: 15,
        name: "Ramon's Tail",
        student: "Omar Zagal"
      },
      16: {
        id: 16,
        name: "Run Lily Run",
        student: "Javier Quinte"
      },
      17: {
        id: 17,
        name: "Nightmare Underworld",
        student: "Sabás Mendivil"
      },
      18: {
        id: 18,
        name: "Bomberhack",
        student: "Gabriel Pacheco"
      }
    },
    data: []
  };

  onClick = id => {
    let { votes, options } = this.state;
    if (options[id].selected) {
      options[id].selected = false;
      votes = votes.filter(v => v.id !== id);
      this.setState({ options, votes });
      return;
    }
    if (votes.length > 2) {
      return;
    }
    const vote = {
      ...options[id]
    };
    votes.push(vote);
    options[id].selected = true;
    this.setState({ votes, options });
  };

  vote = () => {
    swal({
      title: "Estas sgur@?",
      text: "No podrás cambiar tu voto",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy segur@!"
    }).then(result => {
      if (result.value) {
        this.props.makeVote(this.state.votes);
        swal("Listo!", "Tu voto se ha recibido", "success");
      }
    });
  };

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    let url =
      "https://ironhackprojects.herokuapp.com/api/public/projects/5c4b87d818a0f50017f374a5/1?fbclid=IwAR25hViUH8emVv5RCn7etvf9p3P7kwpWWsypb9RFlHI033wdVJxZzovKzpM";
    fetch(url)
      .then(r => {
        if (r.ok) return r.json();
      })
      .then(data => {
        let options = {};
        data.forEach(el => {
          el.id = el._id;
          options[el._id] = el;
        });
        this.setState({ options });
      });
  };

  render() {
    const { options, votes } = this.state;
    const array = Object.values(options);
    const votesNumber = votes.length > 2;
    return (
      <div>
        <p style={{ textAlign: "center" }}>Elige 3 proyectos</p>
        <button
          id="bt"
          onClick={this.vote}
          className={votesNumber ? "ready" : "disabled"}
        >
          Votar
        </button>

        <div className="options">
          {array.map((o, i) => (
            <Option
              key={i}
              {...o}
              onClick={this.onClick}
              votesNumber={votesNumber}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Options;
