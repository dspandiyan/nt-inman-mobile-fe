import {View, Text, StyleSheet} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

function StoresScreen() {
  return (
    <ScreenLayout>
      <View style={styles.center}>
        <Text style={styles.text}>Stores Screen</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 18, fontWeight: '700', color: '#1A237E'},
});

export default StoresScreen;
