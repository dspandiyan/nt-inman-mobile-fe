import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StoresScreen from '../screens/StoresScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: ['home', 'home-outline'],
  Orders: ['shopping', 'shopping-outline'],
  Items: ['cart', 'cart-outline'],
  Stores: ['store', 'store-outline'],
};

function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarIcon: ({focused, color}) => {
          const [active, inactive] = TAB_ICONS[route.name];
          return (
            <View style={focused ? styles.activeTab : null}>
              <Icon name={focused ? active : inactive} size={focused ? 20 : 24} color={color} />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="Stores" component={StoresScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 8,
    height: 60,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  activeTab: {
    backgroundColor: '#1A237E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default BottomBar;
