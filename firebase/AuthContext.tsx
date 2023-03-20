import { createContext, useState, useEffect } from 'react';
import { auth } from './Authentication';
import { onAuthStateChanged, User } from 'firebase/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initalUser: any = null;

const AuthContext = createContext({
  user: initalUser,
  loading: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe;

    // eslint-disable-next-line prefer-const
    unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
