import React, { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

function Adventure() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Adventure</h1>
      <button
        className='button'
        onClick={() => {
          setCharacter((currentCharacter) => ({
            ...currentCharacter,
            earnedExperience: (character.earnedExperience += 100),
          }));
        }}>
        Add XP
      </button>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}

export default Adventure;
