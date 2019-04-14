import { createContext } from 'react';

const {Consumer: UserConsumer, Provider: UserProvider} = createContext();

export {
    UserConsumer,
    UserProvider,
};