import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerRight: () => <ThemeToggle />,headerTitle: "Dashboard"}} />
    </Stack>
  );
}