import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAhiqhIgZfCuW3AcHWPeKBXF-gm-fNavAw",
    authDomain: "crwn-db-d7d26.firebaseapp.com",
    projectId: "crwn-db-d7d26",
    storageBucket: "crwn-db-d7d26.appspot.com",
    messagingSenderId: "709311554589",
    appId: "1:709311554589:web:50e128e978ba695979d2f4"
}

export const createUserProfileDocument = async (userAuth , additionalProps) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalProps
            });
        } catch (error) {
            console.log('error cteating user', error.message);
        }
    }

    return userRef;
}

export const addCollectionDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const docRef = collectionRef.doc();
        batch.set(docRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return({
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        })
    });
    
    return transformedCollections.reduce((accumulator, collection) =>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

firebase.initializeApp(config)

export const auth  = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase