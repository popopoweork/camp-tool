// import './App.css';
import { Link, Outlet } from "react-router-dom";
import UseMyEquipments from "./utils/use-my-equipments";
import { useAuthentication } from './utils/auth';
import {useEffect} from 'react';
import UseMyEquipmentsContents, {
  UpdateMyEquipmentsContext,
} from "./utils/use-my-equipments-contents";
function App() {
  const { myEquipments, updateMyEquipments } =UseMyEquipments()
  const {user,login}=useAuthentication()
//   useEffect(()=>{
// login()
//   },[])
  return (
    <div className="App">
      <UseMyEquipmentsContents.Provider value={myEquipments}>
        <UpdateMyEquipmentsContext.Provider value={updateMyEquipments}>
          <header className="App-header">
            <Link className="App-link" to="/">
              Home
            </Link>
            <Link className="App-link" to="good">
              Goods
            </Link>
            <div>{user?.name}</div>
            <button onClick={login}>login</button>
          </header>
          <Outlet />
        </UpdateMyEquipmentsContext.Provider>
      </UseMyEquipmentsContents.Provider>
    </div>
  );
}

export default App;
