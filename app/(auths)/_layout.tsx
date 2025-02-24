import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" options={{headerShown: true,title:"SignUp"}}/>
      <Stack.Screen name="forgot" options={{headerShown: true,title:"Reset"}}/>
      <Stack.Screen name="todo" options={{headerShown: true,title:"Home"}}/>
    </Stack>
    </ThemeProvider>
  );
}
