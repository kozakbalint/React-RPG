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

  useEffect(async () => {
    if (initialMount.current) {
      initialMount.current = false;
      generateEnemy();
    } else {
      if (character.hp <= 0 || enemy.hp <= 0) {
        if (character.hp > 0) {
          setCombat({
            earnedXp: Math.floor(Math.random() * enemy.lvl * 1000),
          });
        } else {
          setCombat({
            earnedXp: 0,
          });
        }
        history("/combatsummary");
      } else {
        await delay(500);
        if (playersTurn) {
          setPlayersTurn(!playersTurn);
          setEnemy((currentEnemy) => ({
            ...currentEnemy,
            hp: currentEnemy.hp - calcDmg(),
          }));
        } else {
          setPlayersTurn(!playersTurn);
          setCharacter((currentCharacter) => ({
            ...currentCharacter,
            hp: currentCharacter.hp - enemy.damage,
          }));
        }
      }
    }
  }, [enemy, character]);

  const generateEnemy = () => {
    let firstNames = ["Rafkós", "Trükkös", "Kardos", "Boxos"];
    let lastNames = ["Cigány"];
    let lvl = Math.floor(Math.random() * character.lvl + 1);
    let damage = Math.floor(Math.random() * character.lvl * 10 * lvl);
    let maxHp = Math.floor(Math.random() * lvl * 100);

    setEnemy({
      name: firstNames[0] + " " + lastNames[0],
      lvl: lvl,
      damage: damage,
      maxHp: maxHp,
      hp: maxHp,
      itsTurn: Math.floor(Math.random()) === 1 ? true : false,
    });
  };

  const calcDmg = () => {
    return character.abilities.strength * character.lvl;
  };

  // const calcDodge = () => {
  //   return character.ablilities.dexterity * 0.1;
  // }

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Adventure</h1>

      <div>
        {character.hp} / {character.maxHp}
      </div>
      <pre>
        {JSON.stringify(character, null, 2)}
        {JSON.stringify(enemy, null, 2)}
      </pre>
    </div>
  );
}

export default Adventure;
