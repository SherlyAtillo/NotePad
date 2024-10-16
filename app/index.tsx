import { Redirect } from 'expo-router';
import { useAuth } from './context/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/app/dashboard" />;
  } else {
    return <Redirect href="/auth/signup" />;
  }
}