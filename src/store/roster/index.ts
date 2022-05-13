import { Instance, types, flow, cast } from 'mobx-state-tree';
import { getRosterDoc, setRosterDoc } from '@utils/firebase';
import { Timestamp } from 'firebase/firestore';

interface ICharacter {
  name: string;
  realm: string;
  race: string;
  characterClass: string;
  activeSpec: string;
  updatedAt: Timestamp;
}

const Character = types.model({
  name: '',
  realm: '',
  race: '',
  characterClass: '',
  activeSpec: '',
  updatedAt: '',
});

const Roster = types
  .model({
    characters: types.array(Character),
    flags: types.optional(
      types.model({
        isLoading: false,
      }),
      {},
    ),
  })
  .actions((self) => ({
    getRoster: flow(function* () {
      if (self.flags.isLoading) return;
      self.flags.isLoading = true;

      const rosterDoc = yield getRosterDoc();
      const rosterData = rosterDoc.data();
      const characters = Object.values(rosterData as ICharacter[]).map((character) => {
        const updatedAt = character?.updatedAt?.toDate().toDateString();

        return { ...character, updatedAt };
      });
      self.characters = cast(characters);
      self.flags.isLoading = false;
    }),
  }))
  .actions((self) => ({
    addCharacter: flow(function* ({ name, realm }: { name: string; realm: string }) {
      if (self.flags.isLoading) return;
      const alreadyExists = self.characters.find(
        (character) => character.name === name && character.realm === realm,
      );
      if (alreadyExists) return;

      self.flags.isLoading = true;
      yield setRosterDoc({ [`${name}_${realm}`]: { name, realm } });
      self.flags.isLoading = false;
      self.getRoster();
    }),
  }));

export interface IRoster extends Instance<typeof Roster> {}
export default Roster;
