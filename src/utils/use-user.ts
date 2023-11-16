import { createContext, useState } from 'react';
import { User } from './types';

const DEFAULT_CALLBACK = () => Promise.resolve(undefined);

export default createContext<User | undefined>(undefined);

export const UpdateUser = createContext<(user:User) => void>(DEFAULT_CALLBACK);

export function UseUserContent() {
    console.log('init use')
    const [user, setUser] = useState<User>();
  const updateUser=(user:User)=>setUser(user)
  
    return {
        user,
        updateUser,
    };
  }
  
