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
    <div className=''>
      <h1 className='text-3xl font-bold text-center'>Combat Summary</h1>
      <table className='w-96 mx-auto'>
        <thead>
          <tr>
            <th>{character.username}:</th>
            <th>{enemy.name}:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              HP: {character.hp}/{character.maxHp}
            </td>
            <td>
              HP: {enemy.hp}/{enemy.maxHp}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>Earned XP: {combat.earnedXp}</td>
          </tr>
          <tr>
            <td colSpan={2}>
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
            </td>
          </tr>
        </tbody>
      </table>
      <div className='w-96 mx-auto'>
        <h2 className='text-xl text-left font-bold m-5'>Combat Log:</h2>
        {combat.log.map((data, i) => (
          <div key={i}>
            {data.isPalyer ? (
              <div className='playerLog'>{data.msg}</div>
            ) : (
              <div className='enemyLog'>{data.msg}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CombatSummary;
