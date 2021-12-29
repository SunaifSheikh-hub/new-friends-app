import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import Home from './components/Home'
import Post from './components/Post';
import PostForm from './components/PostForm';
import ProfilePage from './components/ProfilePage';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from './components/Firebase';
import { NameContext, EmailContext, UidContext, DpContext } from './components/userContext';





function App() {
  const [userDetails, setUserDetails] = useState({ name: 'null' })

  useEffect(() => {
    // if (userDetails.name === 'null') {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "profile", uid);
        getDoc(docRef).then((doc) => {
          setUserDetails({ ...doc.data(), uid: uid });
          // console.log(userDetails.name)
        });
      } else {
      }
    });
    // }

  }, [userDetails]);
  // console.log(userDetails)
  return (
    <div className="App">
      <BrowserRouter>
        <EmailContext.Provider value={userDetails.email} >
          <UidContext.Provider value={userDetails.uid} >
            <NameContext.Provider value={userDetails.name} >
              <DpContext.Provider value={userDetails.dpLink} >
                <Routes>
                  <Route key={'home'} path="/" element={<Home />} />
                  <Route key={'login'} path="login" element={<LoginPage />} />
                  <Route key={'signup'} path="signup" element={<SignUp />} />
                  <Route key={'post'} path="post" element={<Post />} />
                  <Route key={'postform'} path="postform" element={<PostForm />} />
                  <Route key={'profile'} path='profile' element={<ProfilePage />} />
                </Routes>
              </DpContext.Provider>
            </NameContext.Provider>
          </UidContext.Provider>
        </EmailContext.Provider>
      </BrowserRouter>
    </div >
  );
}

export default App;
