import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import CharacterSheet from "./CharacterSheet";
import Nav from "./Nav";
import Adventure from "./Adventure";
import About from "./About";
import Shop from "./Shop";
import CharacterCreationForm from "./CharacterCreationForm";
import { CharacterContext } from "../contexts/CharacterContext";
import { EnemyContext } from "../contexts/EnemyContext";
import CombatSummary from "./CombatSummary";
import { CombatContext } from "../contexts/CombatContext";

const RouteSwitch = () => {
  const [character, setCharacter] = useState(null);
  const characterValue = useMemo(
    () => ({ character, setCharacter }),
    [character, setCharacter]
  );

  const [enemy, setEnemy] = useState(null);
  const enemyValue = useMemo(() => ({ enemy, setEnemy }), [enemy, setEnemy]);

  const [combat, setCombat] = useState(null);
  const combatValue = useMemo(
    () => ({ combat, setCombat }),
    [combat, setCombat]
  );

  return (
    <Router>
      <CharacterContext.Provider value={characterValue}>
        <EnemyContext.Provider value={enemyValue}>
          <CombatContext.Provider value={combatValue}>
            <Routes>
              <Route path='/' element={<CharacterCreationForm />} />
              <Route path='/character' element={<CharacterSheet />} />
              <Route path='/adventure' element={<Adventure />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/about' element={<About />} />
              <Route path='/combatsummary' element={<CombatSummary />} />
            </Routes>
          </CombatContext.Provider>
        </EnemyContext.Provider>
      </CharacterContext.Provider>
      <Nav />
    </Router>
  );
};

export default RouteSwitch;
