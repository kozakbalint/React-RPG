import React, { useContext, useEffect } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

function CharacterSheet() {
  const { character, setCharacter } = useContext(CharacterContext);

  const calcHp = (character) => {
    if (character.race === "human") {
      setCharacter((currentCharacter) => ({
        ...currentCharacter,
        maxHp: 100 * character.abilities.constitution * character.lvl,
      }));
    } else {
      setCharacter((currentCharacter) => ({
        ...currentCharacter,
        maxHp: 50 * character.abilities.constitution * character.lvl,
      }));
    }
  };

  useEffect(() => {
    console.log("mounted");
    calcHp(character);
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Character</h1>
      <table>
        <thead>
          <tr>
            <th colSpan='3'>Abilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strength</td>
            <td>{character.abilities.strength}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
          <tr>
            <td>Dexterity</td>
            <td>{character.abilities.dexterity}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
          <tr>
            <td>Constitution</td>
            <td>{character.abilities.constitution}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
          <tr>
            <td>Intelligence: </td>
            <td>{character.abilities.intelligence}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
          <tr>
            <td>Wisdom</td>
            <td>{character.abilities.wisdom}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
          <tr>
            <td>Charisma</td>
            <td>{character.abilities.wisdom}</td>
            <td>
              <button className='button'>+</button>
            </td>
          </tr>
        </tbody>
      </table>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}

export default CharacterSheet;
