import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "../contexts/CharacterContext";
import { CombatContext } from "../contexts/CombatContext";
import { EnemyContext } from "../contexts/EnemyContext";

function CombatSummary() {
  const { character, setCharacter } = useContext(CharacterContext);
  const { enemy, setEnemy } = useContext(EnemyContext);
  const { combat, setCombat } = useContext(CombatContext);
  const history = useNavigate();
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Combat Summary</h1>
      <p>
        Character HP: {character.hp} / {character.maxHp}
      </p>
      <p>
        Enemy HP: {enemy.hp} / {enemy.maxHp}
      </p>
      <p>Earned XP: {combat.earnedXp}</p>
      <button
        className='button'
        onClick={() => {
          setCharacter((currentCharacter) => ({
            ...currentCharacter,
            earnedExperience:
              currentCharacter.earnedExperience + combat.earnedXp,
          }));
          history("/character");
        }}>
        Continue
      </button>
    </div>
  );
}

export default CombatSummary;
