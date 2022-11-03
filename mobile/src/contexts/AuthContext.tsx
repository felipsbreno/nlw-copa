import { createContext } from 'react';

interface UserProps {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function singIn() {
    console.log('Vamos logar');
  }

  return (
    <AuthContext.Provider
      value={{
        singIn,
        user: {
          name: 'Diego Fernandes',
          avatarUrl: 'https://github.com/diego3g.png',
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}
