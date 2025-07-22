import { Platform } from 'react-native';

const supabase =
  Platform.OS === 'web'
    ? require('./supabase').supabase
    : require('./supabase.native').supabase;

export default supabase;