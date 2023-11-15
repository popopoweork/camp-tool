import { createContext } from 'react';
import { MyEquipments } from './types';

const DEFAULT_CALLBACK = () => Promise.resolve(undefined);

export default createContext<MyEquipments | undefined>(undefined);

export const UpdateMyEquipmentsContext = createContext<() => Promise<void>>(DEFAULT_CALLBACK);
