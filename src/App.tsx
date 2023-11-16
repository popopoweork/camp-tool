// import './App.css';
import { Link, Outlet } from "react-router-dom";
import UseMyEquipments, {UpdateMyEquipments, UseMyEquipmentsContent} from "./utils/use-my-equipments";
import UseUser, { UpdateUser,UseUserContent } from './utils/use-user';
import React from 'react'
import { useAuthentication } from "./utils/auth";
function App() {
  const { myEquipments, updateMyEquipments } =UseMyEquipmentsContent()
  const {  user,updateUser } =UseUserContent()
  const {login}=useAuthentication()
  return (
    <div className="App">
      <UseMyEquipments.Provider value={myEquipments}>
        <UpdateMyEquipments.Provider value={updateMyEquipments}>
        <UseUser.Provider value={user}>
        <UpdateUser.Provider value={updateUser}>
          <header className="App-header">
            <Link className="App-link" to="/">
              Home
            </Link>
            <Link className="App-link" to="good">
              Goods
            </Link>
            <button onClick={login}>login</button>
          </header>
          <Outlet />
        </UpdateUser.Provider>
        </UseUser.Provider>
        </UpdateMyEquipments.Provider>
      </UseMyEquipments.Provider>
    </div>
  );
}

export default App;
