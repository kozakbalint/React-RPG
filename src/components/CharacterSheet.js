import React, { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { CombatContext } from "../contexts/CombatContext";
import { EnemyContext } from "../contexts/EnemyContext";

function CharacterSheet() {
  const { character, setCharacter } = useContext(CharacterContext);
  const { setEnemy } = useContext(EnemyContext);
  const { setCombat } = useContext(CombatContext);
  const initialMount = useRef(true);

  const calcHp = () => {
    console.log("hp");
    if (character.race === "human") {
      setCharacter((currentCharacter) => ({
        ...currentCharacter,
        hp: 100 * character.abilities.constitution * character.lvl,
        maxHp: 100 * character.abilities.constitution * character.lvl,
      }));
    } else {
      setCharacter((currentCharacter) => ({
        ...currentCharacter,
        hp: 50 * character.abilities.constitution * character.lvl,
        maxHp: 50 * character.abilities.constitution * character.lvl,
      }));
    }
  };

  const calcNextLvl = () => {
    const exponent = 1.5;
    const baseXp = 1000;
    setCharacter((currentCharacter) => ({
      ...currentCharacter,
      experienceToNextLvl: Math.floor(baseXp * character.lvl ** exponent),
    }));
  };

  const calcLvL = () => {
    if (character.earnedExperience > character.experienceToNextLvl) {
      setCharacter((currentCharacter) => ({
        ...currentCharacter,
        lvl: character.lvl + 1,
        availableAbilityScores: character.availableAbilityScores + 1,
      }));
    } else {
      return;
    }
  };

  const dummyEnemy = () => {
    setEnemy({
      name: "",
      lvl: 0,
      hp: 0,
      maxHp: 0,
    });
  };

  const dummyCombat = () => {
    setCombat({
      earnedXp: 0,
      log: [],
    });
  };

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      dummyEnemy();
      dummyCombat();
    }
    console.log("mounted");
    calcHp();
    calcNextLvl();
    calcLvL();
  }, [
    character.availableAbilityScores,
    character.earnedExperience,
    character.lvl,
  ]);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Character</h1>
      <table>
        <thead>
          <tr>
            <th>Infos:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{character.username}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{character.age}</td>
          </tr>
          <tr>
            <td>Race:</td>
            <td>{character.race}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{character.gender}</td>
          </tr>
          <tr>
            <td>Class:</td>
            <td>{character.classes}</td>
          </tr>
          <tr>
            <td>Level:</td>
            <td>{character.lvl}</td>
          </tr>
          <tr>
            <td>HP:</td>
            <td>
              {character.hp} / {character.maxHp}
            </td>
          </tr>
          <tr>
            <td>XP:</td>
            <td>
              {character.earnedExperience} / {character.experienceToNextLvl}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Abilities</th>
            <th colSpan='2'>
              Available Points: {character.availableAbilityScores}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strength</td>
            <td>{character.abilities.strength}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        strength: character.abilities.strength + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Dexterity</td>
            <td>{character.abilities.dexterity}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        dexterity: character.abilities.dexterity + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Constitution</td>
            <td>{character.abilities.constitution}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        constitution: character.abilities.constitution + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Intelligence: </td>
            <td>{character.abilities.intelligence}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        intelligence: character.abilities.intelligence + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Wisdom</td>
            <td>{character.abilities.wisdom}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        wisdom: character.abilities.wisdom + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Charisma</td>
            <td>{character.abilities.charisma}</td>
            <td>
              <button
                className='button'
                onClick={() => {
                  if (character.availableAbilityScores !== 0) {
                    setCharacter((currentCharacter) => ({
                      ...currentCharacter,
                      availableAbilityScores:
                        character.availableAbilityScores - 1,
                      abilities: {
                        ...currentCharacter.abilities,
                        charisma: character.abilities.charisma + 1,
                      },
                    }));
                  }
                }}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}

export default CharacterSheet;
