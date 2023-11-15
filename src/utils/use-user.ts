import axios from 'axios';
import { createContext, useCallback, useState } from 'react';
import { Equipment, MyEquipments, User } from './types';

const DEFAULT_CALLBACK = () => Promise.resolve(undefined);

export default createContext<User | undefined>(undefined);

export const UpdateMyEquipmentsContext = createContext<(user:User) => Promise<void>>(DEFAULT_CALLBACK);

export function UseUserContent() {
    console.log('init use')
    const [user, setUser] = useState<User>();
  
  
    return {
        user,
        setUser,
    };
  }
  
