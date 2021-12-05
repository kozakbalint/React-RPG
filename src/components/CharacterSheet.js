import React, { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

function CharacterSheet() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold'>Character</h1>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}

export default CharacterSheet;
