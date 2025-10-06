import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import LoginState from "./context/LoginState"
import UserHome from "./pages/UserHome"
import MenuDetails from "./pages/MenuDetails"
import ClientHome from "./pages/ClientHome"
import UpdateMenu from "./pages/UpdateMenu"
import AllMenu from "./pages/AllMenu"
import SearchMenu from "./pages/SearchMenu"
import Intro from "./pages/Intro"

function App() {

  return (
    <LoginState>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/userhome' element={<UserHome category={'none'}/>}/>
        <Route path="/userhome/veg" element={<UserHome category={'Veg'}/>}/>
        <Route path="/userhome/nonveg" element={<UserHome category={'Non Veg'}/>}/>
        <Route path="/userhome/vegan" element={<UserHome category={'Vegan'}/>}/>        
        <Route path='/menuDetails' element={<MenuDetails/>}/>
        <Route path='/ownerhome' element={<ClientHome/>}/>
        <Route path='/updateMenu' element={<UpdateMenu/>}/>
        <Route path='/allMenu' element={<AllMenu/>}/>
        <Route path="/search" element={<SearchMenu/>}/>
      </Routes>
    </BrowserRouter>
    </LoginState>
  )
}

export default App
