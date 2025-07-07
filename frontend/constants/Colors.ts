/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#f88379'; // Primary Coral Pink
const tintColorDark = '#fff5f2';  // Soft Off-white

const Colors = {
  light: {
    text: '#f88379',            // Slate Blue-Gray for readable text
    background: '#fff5f2',      // Light soft background
    tint: tintColorLight,       // Primary action color
    icon: '#f88379',            // Muted Coral for icons
    tabIconDefault: '#f88379',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff5f2',            // Light text for dark mode
    background: '#798897',      // Slate background in dark mode
    tint: tintColorDark,
    icon: '#bc827b',            // Keep consistent muted coral
    tabIconDefault: '#bc827b',
    tabIconSelected: tintColorDark,
  },
  bg: "#fff5f2", 
  lightBg: "#FFF8E7",         
  primary: "#f88379",   
  accent: "#798897",          
  accent_lighter: "#bc827b",
  icon: "#bc827b",          
  tabIconDefault: "#bc827b", 
  tabIconSelected: "#f88379", 
};

export default Colors
