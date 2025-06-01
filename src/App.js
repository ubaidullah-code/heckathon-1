import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import LoginPage from './pages/loginPage';
import { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Route, Router, Routes } from 'react-router';
import SignPage from './pages/signPage';
import Home from './pages/Home';
import EventManagerDashboard from './Dashboard/EventManagerDashboard';
import AdminDashboard from './Dashboard/AdminDashboard'
import UserDashboard from './Dashboard/UserDashboard'
import { GlobalContext } from './Context/Context';
import Footer from './Component/Footer';
import Header from './Component/Header';
import { addDoc, doc,  getFirestore, setDoc } from 'firebase/firestore';



function App() {
  const{state, dispatch}= useContext(GlobalContext);
  const firebaseConfig = {
    apiKey: "AIzaSyAYVhvxLJ3i2EbZh71e5qFOD6ykRFsF8Hw",
    authDomain: "hackathon-1-ee8e9.firebaseapp.com",
    projectId: "hackathon-1-ee8e9",
    storageBucket: "hackathon-1-ee8e9.firebasestorage.app",
  messagingSenderId: "945032676042",
  appId: "1:945032676042:web:a4ea06d4f8d657c4e62a33"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const addUser = async (userData) => {
  try {
    await addDoc(doc(db, "users", userData.id), userData);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

useEffect(()=>{
  const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    if(user.email == "ubaidullahsiddique142005@gmail.com"){
      dispatch({type : "ADMIN_LOGIN" , payload : user})
      console.log("userEmail", user.email)
    }
    else if(user.email == "ubaidque14@gmail.com"){
      dispatch({type : "MANEGER_LOGIN" , payload : user})
      console.log("userEmail", user.email)
    }
    else{
      console.log("userEmail", user.email)
      dispatch({type: "USER_LOGIN" ,payload : user})
      addUser({
  id: user.uid,
  name: user.displayName || '',
  email: user.email,
  role: 'user',
});


    }
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // 
    // ...
      dispatch({type: "USER_LOGOUT"})
  }
});

},[])
console.log(state)
// Initialize Firebase

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      <Routes>
  {/* Unauthenticated Routes */}
  {!state.isLogin && (
    <>
      <Route path='/' element={<Home />} />
      <Route path='/signPage' element={<SignPage />} />
      <Route path='/loginPage' element={<LoginPage />} />
      <Route path='*' element={<Navigate to="/loginPage" />} />
    </>
  )}

  {/* Logged in as Normal User */}
  {state.isLogin && !state.isAdmin && !state.isManager && (
    <>
      <Route path='/dashboard' element={<UserDashboard />} />
      <Route path='*' element={<Navigate to="/dashboard" />} />
    </>
  )}

  {/* Logged in as Manager */}
  {state.isLogin && state.isManager && (
    <>
      <Route path='/events' element={<EventManagerDashboard />} />
      <Route path='*' element={<Navigate to="/events" />} />
    </>
  )}

  {/* Logged in as Admin */}
  {state.isLogin && state.isAdmin && (
    <>
      <Route path='/event' element={<AdminDashboard />} />
      <Route path='*' element={<Navigate to="/event" />} />
    </>
  )}
</Routes>
 {state.isLogin == null ? <p >loading</p> : null}

  

      <Footer/>
      </header>
    </div>
  );
}

export default App;
