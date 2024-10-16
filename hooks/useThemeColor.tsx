import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext, ThemeContextType } from '../app/context/ThemeContext'; 
import { Colors } from '../constants/Colors'; // Update this path as needed

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const systemColorScheme = useColorScheme();

  const colorFromProps = props[theme || systemColorScheme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme || systemColorScheme][colorName];
}