import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const STATUSES = ['Pending', 'Paid', 'Overdue'];

function FormField({label, icon, children}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon name={icon} size={18} color="#9E9E9E" style={styles.inputIcon} />
        {children}
      </View>
    </View>
  );
}

function CreateOrderScreen() {
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleCreate = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#1A237E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Order</Text>
        <View style={{width: 36}} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <FormField label="Order ID" icon="shopping-outline">
          <TextInput
            style={styles.input}
            placeholder="#OD00"
            placeholderTextColor="#BDBDBD"
            value={orderId}
            onChangeText={setOrderId}
          />
        </FormField>

        <FormField label="Store Name" icon="store-outline">
          <TextInput
            style={styles.input}
            placeholder="Enter store name"
            placeholderTextColor="#BDBDBD"
            value={storeName}
            onChangeText={setStoreName}
          />
        </FormField>

        <FormField label="Date" icon="calendar-month-outline">
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#BDBDBD"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </FormField>

        <FormField label="Total Amount (₹)" icon="currency-inr">
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#BDBDBD"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </FormField>

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {STATUSES.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.statusChip, status === s && styles.statusChipActive]}
              onPress={() => setStatus(s)}
              activeOpacity={0.8}>
              <Text style={[styles.statusChipText, status === s && styles.statusChipTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.85}>
          <Icon name="plus-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.createBtnText}>Create Order</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F5F6FA'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F5F6FA',
  },
  backBtn: {padding: 4},
  headerTitle: {fontSize: 20, fontWeight: '800', color: '#1A1A1A'},
  content: {paddingHorizontal: 16, paddingBottom: 32, gap: 16},
  fieldGroup: {gap: 6},
  label: {fontSize: 14, fontWeight: '700', color: '#424242'},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    height: 52,
  },
  inputIcon: {marginRight: 10},
  input: {flex: 1, fontSize: 15, color: '#212121'},
  statusRow: {flexDirection: 'row', gap: 10},
  statusChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  statusChipActive: {backgroundColor: '#1A237E', borderColor: '#1A237E'},
  statusChipText: {fontSize: 14, fontWeight: '600', color: '#616161'},
  statusChipTextActive: {color: '#FFFFFF'},
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    borderRadius: 14,
    height: 54,
    gap: 8,
    marginTop: 8,
  },
  createBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
});

export default CreateOrderScreen;
