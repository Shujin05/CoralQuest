// components/ProtectedRoute.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/(tabs)');
    }
  }, [loading, session]);

  if (loading || !session) {
    return null; 
  }

  return <>{children}</>;
}
