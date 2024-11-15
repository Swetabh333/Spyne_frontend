import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Register from "./components/register";
import Protector from "./utils/protector";
import CarList from "./components/Cars";
import CarDetails from "./components/CarDetails";
import AddCar from "./components/AddCar"
import Landing from "./components/Landing"
import { Provider } from "./context/authContext";

function App() {
  return (
    <Router>
      <Provider>
        
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cars" element={<Protector><CarList></CarList></Protector>}></Route>
        <Route path="/cars/add" element={<Protector>  <AddCar /> </Protector>} />
        <Route path="/cars/:id" element={<Protector><CarDetails /></Protector>} />
      </Routes>
      </Provider>
    </Router>
  );
}

export default App;
