import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProtectedRouteProps } from '../types'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
