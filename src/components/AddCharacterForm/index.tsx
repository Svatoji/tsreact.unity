import useStore from '@hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useState, ChangeEvent } from 'react';
import './style.css';

const AddCharacterForm = () => {
  const [name, setName] = useState('');
  const [realm, setRealm] = useState('');
  const { roster } = useStore();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value as string);
  };

  const onRealmChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRealm(e.target.value as string);
  };

  const onSubmit = () => {
    roster.addCharacter({ name, realm });
  };

  return (
    <div className="addCharacterForm">
      <label>
        Name:
        <input type="text" onChange={onNameChange} value={name} />
      </label>
      <label>
        Server:
        <input type="text" onChange={onRealmChange} value={realm} />
      </label>
      <button disabled={roster.flags.isLoading} onClick={onSubmit}>
        Go
      </button>
    </div>
  );
};

export default observer(AddCharacterForm);
