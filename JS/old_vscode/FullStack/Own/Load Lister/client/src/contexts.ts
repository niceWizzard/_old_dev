import React from 'react';
import { User } from './types'


export const USERContext = React.createContext<User | null>(null)
export const SETUSERContext = React.createContext<React.Dispatch<any> | null>(null)