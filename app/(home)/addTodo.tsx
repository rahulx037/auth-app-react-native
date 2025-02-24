import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Appbar } from 'react-native-paper';
import {useRouter } from 'expo-router';

export default function AddTodoScreen() {
  const router = useRouter();
  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={() => {router.back}} />
    <Appbar.Content title="Title" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
  );
}