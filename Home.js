import React, { useContext } from 'react';
import Post from './Post';
import useLayoutEffect from 'react-hook-use-state';
import useState from 'react-hook-use-state';
import { Link } from "react-router-dom"
// import { useNavigate } from 'react-router-dom';
// import { getAuth } from "firebase/auth";
import { db } from './Firebase';
import { collection, onSnapshot } from "firebase/firestore";
import NavBar from './NavBar';
import { DpContext } from './userContext';


// import { doc, getDoc } from "firebase/firestore";

//props passed error

export default function Home() {
    const dpContext = useContext(DpContext);
    const [postArr, setPostArr] = useState([]);
    // const [userEmail, setUserEmail] = useState("");
    // const navigate = useNavigate();
    // const auth = getAuth();
    //authentication
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         setUserEmail(user.email);
    //         const userId = user.uid;
    //         getDoc(doc(db, "profile", userId)).then(docSnap => {
    //             if (docSnap.exists()) {
    //                 setUserDetail(docSnap.data());
    //             } else {
    //                 console.log("No such document!");
    //             }
    //         })
    //     } else {
    //         navigate('/login')
    //     }
    // });
    //reteriving
    useLayoutEffect(() => {
        onSnapshot(collection(db, 'posts'), (snapShot) => setPostArr(snapShot.docs.map((doc) => (doc.data()))))
    }, []);
    return (
        <>
            <NavBar dp={dpContext} />
            <h1>Posts</h1>
            <Link to="PostForm">Add More</Link><br />
            {postArr.map((e, ind) => <Post key={ind} postDate={e.timeStamp} author={e.author} postDesc={e.descrip} postImage={e.postImage} dp={e.dp} />)}
        </>
    );
}
