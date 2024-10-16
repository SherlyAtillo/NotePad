import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../app/context/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconColor = useThemeColor({}, 'text');

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <Ionicons 
        name={theme === 'light' ? 'moon' : 'sunny'} 
        size={24} 
        color={iconColor} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});