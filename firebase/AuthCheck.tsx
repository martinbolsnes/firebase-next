import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthContext';
import Loading from '../components/Loading';
import Login from '../components/Login';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthCheck({ children }: any) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading && router.pathname === '/') {
      router.replace('/todo');
    }
  }, [loading, router, user]);

  if (user && !loading && router.pathname !== '/') {
    return children;
  } else if (!user && !loading) {
    return <Login />;
  } else {
    return <Loading />;
  }
}
