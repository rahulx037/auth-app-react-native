import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="index" options={{headerShown: true,title:"Home"}}/>
        <Stack.Screen name="detail" />
        <Stack.Screen name="addTodo" />
      </Stack>
      </ThemeProvider>
    );
}
