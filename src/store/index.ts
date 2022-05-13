import { types, Instance } from 'mobx-state-tree';
import { createContext } from 'react';
import Roster from './roster';

export const GlobalStore = types.model({ roster: Roster });
export interface IGlobalStore {
  roster: Instance<typeof Roster>;
}

const store: Instance<typeof GlobalStore> = GlobalStore.create({
  roster: Roster.create({}),
});

export const StoreContext = createContext(store);

export default store;
