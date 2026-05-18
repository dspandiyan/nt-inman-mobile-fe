import {View, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigationState} from '@react-navigation/native';
import TopBar from './TopBar';
import BottomTabBar from './BottomTabBar';

const ROUTE_TITLES = {
  Home: 'Inman',
  Orders: 'Orders',
  Items: 'Items',
  Stores: 'Stores',
};

function ScreenLayout({children}) {
  const routeName = useNavigationState(
    state => state?.routes[state.index]?.name,
  );
  const title = 'InMan';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />
      <TopBar title={title} />
      <View style={styles.content}>{children}</View>
      <BottomTabBar activeRoute={routeName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F5F6FA'},
  content: {flex: 1},
});

export default ScreenLayout;
