import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./page/Home";


const App = () => {
  return (<div>
        <Routes>
          <Route path="/" element={<Home/>} />
          
        </Routes>
  </div>)
};

export default App;
