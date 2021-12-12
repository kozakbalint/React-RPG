import React, { useContext, useEffect, useState, useRef } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { EnemyContext } from "../contexts/EnemyContext";
import { useNavigate } from "react-router-dom";
import { CombatContext } from "../contexts/CombatContext";

function Adventure() {
  const [playersTurn, setPlayersTurn] = useState(true);
  const { character, setCharacter } = useContext(CharacterContext);
  const { enemy, setEnemy } = useContext(EnemyContext);
  const { combat, setCombat } = useContext(CombatContext);
  const initialMount = useRef(true);
  const history = useNavigate();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    Combat();
    async function Combat() {
      if (initialMount.current) {
        initialMount.current = false;
        initCombat();
        generateEnemy();
      } else {
        if (character.hp <= 0 || enemy.hp <= 0) {
          if (character.hp > 0) {
            setCombat((currentCombat) => ({
              ...currentCombat,
              earnedXp: Math.floor(Math.random() * enemy.lvl * 1000),
            }));
          } else {
            setCombat((currentCombat) => ({
              ...currentCombat,
              earnedXp: 0,
            }));
          }
          history("/combatsummary");
        } else {
          let enemyDmg = calcDmg(false);
          let playerDmg = calcDmg(true);
          await delay(250);
          if (playersTurn) {
            setPlayersTurn(!playersTurn);
            setCombat((currentCombat) => ({
              ...currentCombat,
              log: [
                ...currentCombat.log,
                {
                  isPalyer: true,
                  msg: character.username + " " + playerDmg + "-at sebbzett.",
                },
              ],
            }));
            setEnemy((currentEnemy) => ({
              ...currentEnemy,
              hp: currentEnemy.hp - playerDmg,
            }));
          } else {
            setPlayersTurn(!playersTurn);
            setCombat((currentCombat) => ({
              ...currentCombat,
              log: [
                ...currentCombat.log,
                {
                  isPalyer: false,
                  msg: enemy.name + " " + enemyDmg + "-at sebbzett.",
                },
              ],
            }));
            setCharacter((currentCharacter) => ({
              ...currentCharacter,
              hp: currentCharacter.hp - enemyDmg,
            }));
          }
        }
      }
    }
  }, [enemy, character]);

  const generateEnemy = () => {
    let firstNames = ["Rafkós", "Trükkös", "Kardos", "Boxos"];
    let lastNames = ["Cigány", "Zsidó", "Néger", "Román"];
    let lvl = Math.floor(Math.random() * character.lvl + 1);
    let maxHp = Math.floor(Math.random() * lvl * 100);

    setEnemy({
      name:
        firstNames[Math.floor(Math.random() * firstNames.length)] +
        " " +
        lastNames[Math.floor(Math.random() * lastNames.length)],
      lvl: lvl,
      maxHp: maxHp,
      hp: maxHp,
    });
  };

  const calcDmg = (isPalyer) => {
    return isPalyer
      ? Math.floor(Math.random() * character.abilities.strength * character.lvl)
      : Math.floor(Math.random() * enemy.lvl * character.lvl * 10);
  };

  const initCombat = () => {
    setCombat({
      earnedXp: 0,
      log: [],
    });
  };

  return (
    <div>
      <h1 className=' text-center text-3xl font-bold'>Adventure</h1>
      <table>
        <thead>
          <tr>
            <th>Character Info:</th>
            <th>Combat Log:</th>
            <th>Enemy Info:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>Name: {character.username}</div>
              <div>Lvl: {character.lvl}</div>
              <div>
                HP: {character.hp}/{character.maxHp}
              </div>
            </td>
            <td>
              <div>
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
            </td>
            <td>
              <div>Name: {enemy.name}</div>
              <div>Lvl: {enemy.lvl}</div>
              <div>
                HP: {enemy.hp}/{enemy.maxHp}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Adventure;
