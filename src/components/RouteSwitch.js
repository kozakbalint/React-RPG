import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import CharacterSheet from "./CharacterSheet";
import Nav from "./Nav";
import Adventure from "./Adventure";
import About from "./About";
import Shop from "./Shop";
import CharacterCreationForm from "./CharacterCreationForm";
import { CharacterContext } from "../contexts/CharacterContext";

const RouteSwitch = () => {
  const [character, setCharacter] = useState(null);
  const value = useMemo(
    () => ({ character, setCharacter }),
    [character, setCharacter]
  );

  return (
    <Router>
      <CharacterContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<CharacterCreationForm />} />
          <Route path='/character' element={<CharacterSheet />} />
          <Route path='/adventure' element={<Adventure />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </CharacterContext.Provider>
      <Nav />
    </Router>
  );
};

export default RouteSwitch;
