import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>InMan</Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="bell-outline" size={24} color="#1A237E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="account-circle-outline" size={36} color="#1A237E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A237E',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 4,
  },
});

export default TopBar;
