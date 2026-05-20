import {View, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigationState} from '@react-navigation/native';
import TopBar from './TopBar';
import BottomTabBar from './BottomTabBar';

function ScreenLayout({children}) {
  const routeName = useNavigationState(
    state => state?.routes[state.index]?.name,
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <TopBar />
      <View style={styles.content}>{children}</View>
      <BottomTabBar activeRoute={routeName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  content: {flex: 1},
});

export default ScreenLayout;
