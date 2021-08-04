import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAhiqhIgZfCuW3AcHWPeKBXF-gm-fNavAw",
    authDomain: "crwn-db-d7d26.firebaseapp.com",
    projectId: "crwn-db-d7d26",
    storageBucket: "crwn-db-d7d26.appspot.com",
    messagingSenderId: "709311554589",
    appId: "1:709311554589:web:50e128e978ba695979d2f4"
}

firebase.initializeApp(config)

export const auth  = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase