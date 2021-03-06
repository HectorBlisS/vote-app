import React, { Component } from "react";
import firebase from "../services/firebase";

class Count extends Component {
  state = {
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
    votes: {},
    api: []
  };

  componentWillMount() {
    this.count();
    this.getData();
  }

  getData = () => {
    let url =
      "https://ironhackprojects.herokuapp.com/api/public/projects/5c4b87d818a0f50017f374a5/1?fbclid=IwAR25hViUH8emVv5RCn7etvf9p3P7kwpWWsypb9RFlHI033wdVJxZzovKzpM";
    fetch(url)
      .then(r => {
        console.log(r);
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

  count = () => {
    firebase
      .firestore()
      .collection("votes")
      .get()
      .then(snap => {
        const { votes } = this.state;
        snap.forEach(doc => {
          console.log(doc.data());
          const votos = Object.values(doc.data().votes);
          for (let v of votos) {
            if (typeof v === "object") {
              if (!votes[v.id]) {
                console.log("no");
                votes[v.id] = 0;
              }
              console.log(votes[v.id]);
              votes[v.id]++;
            }
          }
        });
        this.setState({ votes });
      });
  };

  deleteAll = () => {
    if (!window.confirm("Seguro alv??")) return;
    firebase
      .firestore()
      .collection("votes")
      .get()
      .then(collection => {
        collection.forEach(doc => {
          firebase
            .firestore()
            .collection("votes")
            .doc(doc.id)
            .delete()
            .then(this.count);
        });
      });
  };

  render() {
    console.log("chet");
    const { votes, options } = this.state;
    const ids = Object.keys(votes);
    console.log(votes);
    return (
      <div>
        <ul>
          {ids.map(id => {
            return (
              <li key={id}>
                {options[id].student.username} : {votes[id]}
              </li>
            );
          })}
        </ul>
        <button onClick={this.deleteAll}>Borrar todo alv!</button>
      </div>
    );
  }
}

export default Count;
