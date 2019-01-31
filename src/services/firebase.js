import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0Te2lNJUO7ki2tjU8js4qFevqwxc4CAg",
    authDomain: "votacion-c35ca.firebaseapp.com",
    databaseURL: "https://votacion-c35ca.firebaseio.com",
    projectId: "votacion-c35ca",
    storageBucket: "",
    messagingSenderId: "869089797454"
  };
  firebase.initializeApp(config);
export default firebase;
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
const db = firestore
const votesRef = db.collection('votes')

export const redirectLogin = (facebook) => {
    const provider = facebook ? new firebase.auth.FacebookAuthProvider() : new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider);
}

export const sendVote = (votes,user) => {
  const vote = {votes,user:user.uid}
  return votesRef
    .doc(user.uid)
    .set(vote)
    .then(r=>true)
}

export const checkVote = (user) => {
  return votesRef
    .doc(user.uid)
    .get()
    .then(snap=>{
      return snap.exists
    })
}