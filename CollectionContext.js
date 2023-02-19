import React, { useState, createContext } from 'react';
import { characters } from './data';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);

  const addCharacter = (character) => {
    setCollection([...collection, character]);
  };

  const getCharacter = (id) => {
    return characters.find((c) => c.id === id);
  };

  const levelUp = (id) => {
    const index = collection.findIndex((c) => c.id === id);
    if (index !== -1) {
      const newCollection = [...collection];
      const oldCharacter = newCollection[index];
      const newCharacter = { ...oldCharacter, level: oldCharacter.level + 1 };
      newCollection[index] = newCharacter;
      setCollection(newCollection);
    }
  };

  return (
    <CollectionContext.Provider
      value={{ collection, addCharacter, getCharacter, levelUp }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

