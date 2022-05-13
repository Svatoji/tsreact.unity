import { Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import store, { GlobalStore } from '@store/.';

export const StoreContext = createContext(store);

const useStore = (): Instance<typeof GlobalStore> => useContext(StoreContext);

export default useStore;
