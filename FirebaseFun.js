import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from './Firebase';
import { doc, getDoc } from "firebase/firestore";


const auth = getAuth();

//Sign in function
//props : email, password , navigate
export const signIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // const user = userCredential.user;
            alert("Suceed")
            const navigateState = navigate;
            navigateState('/');
        })
        .catch((error) => {
            alert(error);
        });
}

// Sign Up function
//props : email, password , navigate, sendingFun
export const signUp = (email, password, navigate, sendingFun) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userUid = user.uid;
            alert("You have successfully Signup")
            const navigateState = navigate;
            sendingFun(userUid)
            navigateState('/');
        })
        .catch((error) => {
            alert(error.code)
        });

}

//fetching one time Data 
//props doc, coll , 
export const fetData = async (docInp, coll) => {
    const docRef = doc(db, docInp, coll);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

//authState Change
//props doc, navigate
export const authChange = (docInp, navigate) => {
    console.log(docInp)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getDoc(doc(db, docInp, user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    const userName = docSnap.data().name;
                    const userDp = docSnap.data().dpLink;
                    const userInfo = { userName, userDp }
                    console.log(userInfo)
                    return userInfo
                }
            })
        } else {
            const navigateState = navigate;
            navigateState('/login');
        }
    });
}