import useStore from '@hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import AddCharacterForm from '@components/AddCharacterForm';

const Roster = () => {
  const { roster } = useStore();

  useEffect(() => {
    roster.getRoster();
  }, []);

  const characters = roster.characters.map((character) => {
    return (
      <div className="character" key={`${character.name}_${character.realm}`}>
        {character.name} - {character.realm}
      </div>
    );
  });

  return (
    <div>
      <AddCharacterForm />
      <div>{characters}</div>
    </div>
  );
};

export default observer(Roster);
