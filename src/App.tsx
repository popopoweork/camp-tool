// import './App.css';
import { Link, Outlet } from "react-router-dom";
import UseMyEquipments from "./utils/use-my-equipments";
import UseMyEquipmentsContents, {
  UpdateMyEquipmentsContext,
} from "./utils/use-my-equipments-contents";
function App() {
  const { myEquipments, updateMyEquipments } =UseMyEquipments()
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
          </header>
          <Outlet />
        </UpdateMyEquipmentsContext.Provider>
      </UseMyEquipmentsContents.Provider>
    </div>
  );
}

export default App;
