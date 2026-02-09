import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMaxWidth } from '../utils/responsive';

const Screen = ({ children, style }) => {
  const { width } = useWindowDimensions();
  
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.content, { maxWidth: getMaxWidth(), width: '100%' }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default Screen;