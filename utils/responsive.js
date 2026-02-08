import { Dimensions } from 'react-native';

export const getBreakpoint = () => {
  const { width } = Dimensions.get('window');
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const isWeb = () => {
  return getBreakpoint() === 'desktop' || getBreakpoint() === 'tablet';
};

export const getMaxWidth = () => {
  const breakpoint = getBreakpoint();
  if (breakpoint === 'desktop') return 1200;
  if (breakpoint === 'tablet') return 900;
  return '100%';
};