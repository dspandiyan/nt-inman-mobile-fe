import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';

const TABS = [
  {name: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline'},
  {name: 'Orders', activeIcon: 'shopping', inactiveIcon: 'shopping-outline'},
  {name: 'Items', activeIcon: 'cart', inactiveIcon: 'cart-outline'},
  {name: 'Stores', activeIcon: 'store', inactiveIcon: 'store-outline'},
];

function BottomTabBar({activeRoute}) {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {TABS.map(tab => {
          const focused = activeRoute === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => navigation.navigate(tab.name)}
              activeOpacity={0.8}>
              <View style={focused ? styles.activeTab : styles.inactiveTab}>
                {focused && (
                  <Svg style={StyleSheet.absoluteFill}>
                    <Defs>
                      <RadialGradient id={`grad_${tab.name}`} cx="50%" cy="50%" r="70%">
                        <Stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#0D0D2B" stopOpacity="1" />
                      </RadialGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill={`url(#grad_${tab.name})`} />
                  </Svg>
                )}
                <Icon
                  name={focused ? tab.activeIcon : tab.inactiveIcon}
                  size={22}
                  color={focused ? '#FFFFFF' : '#9E9E9E'}
                />
                {focused && <Text style={styles.activeLabel}>{tab.name}</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    overflow: 'hidden',
  },
  inactiveTab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
    overflow: 'hidden',
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BottomTabBar;
