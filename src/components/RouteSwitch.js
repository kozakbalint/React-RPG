import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./CharacterSheet";
import Nav from "./Nav";
import Adventure from "./Adventure";
import About from "./About";

const RouteSwitch = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/character' element={<CharacterSheet />} />
        <Route path='/adventure' element={<Adventure />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
};
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default RouteSwitch;
