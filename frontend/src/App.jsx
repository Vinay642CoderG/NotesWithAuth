import React, { Suspense, lazy, useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import Loading from './pages/Loading'
import lazyLoad from './utils/LazyLoad'
import {AppContextProvider} from './UserContext'
import Cookies from 'js-cookie'
import ProtectedRoutes from './components/ProtectedRoutes'
import HiddenRoutes from './components/HiddenRoutes'

const Home = lazyLoad(import("./pages/Home"))
const Login = lazyLoad(import("./pages/Login"))
const Signup = lazyLoad(import("./pages/Signup"))
const Profile = lazyLoad(import("./pages/Profile"))
const Notes = lazyLoad(import("./pages/Notes"))

const App = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [refreshNotes, setRefreshNotes] = useState(Math.random())

  const setAuthUser = async ()=>{
    const apibase = "http://localhost:3000/api/v1";
    fetch(`${apibase}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${Cookies.get('user-auth')}`,
      },
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      if(!v.error){
      setUserData(v)
      setIsUserLogin(true)
      }
    }).catch((e)=>{
      setIsUserLogin(false)
      setUserData({})
      console.log("something went wrong.")
    })

  }

  useEffect(()=>{
    if(!isUserLogin){
      setAuthUser()
    }
  }, [isUserLogin])
  return (
    <>
    <AppContextProvider value={{ isUserLogin, setIsUserLogin, 
      userData, setUserData, refreshNotes, setRefreshNotes
    }}>
      <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<HiddenRoutes/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/notes' element={<Notes />} />
            </Route>
            <Route path="*" element={<h1>Not found</h1>} />
          </Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </AppContextProvider>
    </>
  )
}

export default App
