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
        <Stack.Screen name="detail" options={{headerShown: true,title:"Task Detail"}} />
        <Stack.Screen name="addTodo"options={{headerShown: true,title:"Add Task"}} />
      </Stack>
      </ThemeProvider>
    );
}
