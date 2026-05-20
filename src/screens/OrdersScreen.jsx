import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../components/ScreenLayout';
import ScreenHeader from '../components/ScreenHeader';

// ── sample data ───────────────────────────────────────────────────────────────
const ALL_ORDERS = [
  {
    id: '1',
    orderId: '#OD12',
    storeName: 'AAAA  Department Store',
    date: '02/12/2025',
    amount: 500,
    status: 'Pending',
  },
  {
    id: '2',
    orderId: '#OD13',
    storeName: 'BBBB  Department Store',
    date: '06/10/2025',
    amount: 16000,
    status: 'Paid',
  },
  {
    id: '3',
    orderId: '#OD14',
    storeName: 'CCCC  Department Store',
    date: '23/09/2025',
    amount: 18000,
    status: 'Overdue',
  },
  {
    id: '4',
    orderId: '#OD15',
    storeName: 'DDDD  Department Store',
    date: '18/10/2025',
    amount: 12000,
    status: 'Pending',
  },
  {
    id: '5',
    orderId: '#OD16',
    storeName: 'EEEE  Department Store',
    date: '01/11/2025',
    amount: 8500,
    status: 'Paid',
  },
  {
    id: '6',
    orderId: '#OD17',
    storeName: 'FFFF  Department Store',
    date: '15/11/2025',
    amount: 3200,
    status: 'Overdue',
  },
];

// ── status badge config ───────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Pending:  {bg: '#F59E0B', label: 'Pending'},
  Paid:     {bg: '#22C55E', label: 'Paid'},
  Overdue:  {bg: '#EF4444', label: 'Over due'},
};

// ── order card ────────────────────────────────────────────────────────────────
function OrderCard({order}) {
  const navigation = useNavigation();
  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;

  return (
    <View style={styles.card}>
      {/* Row 1: order id + status badge */}
      <View style={styles.cardRow}>
        <View style={styles.orderIdRow}>
          <Icon name="shopping-outline" size={18} color="#1A237E" />
          <Text style={styles.orderId}># Order Id : {order.orderId}</Text>
        </View>
        <View style={[styles.badge, {backgroundColor: status.bg}]}>
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>

      {/* Row 2: store name + edit/view icons */}
      <View style={styles.cardRow}>
        <View style={styles.storeRow}>
          <Icon name="store-outline" size={18} color="#10B981" />
          <Text style={styles.storeName}>{order.storeName}</Text>
        </View>
        <View style={styles.actionIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditOrder', {order})}>
            <Icon name="pencil-outline" size={18} color="#424242" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ViewOrder', {
                orderId: order.orderId,
                storeName: order.storeName,
                amount: order.amount,
              })
            }>
            <Icon name="eye-outline" size={18} color="#424242" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Row 3: date + total amount */}
      <View style={styles.cardRow}>
        <View style={styles.dateRow}>
          <Icon name="calendar-month-outline" size={16} color="#7C3AED" />
          <Text style={styles.dateText}>{order.date}</Text>
        </View>
        <View style={styles.amountBlock}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>
            ₹ {order.amount.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── screen ────────────────────────────────────────────────────────────────────
function OrdersScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filtered = ALL_ORDERS.filter(
    o =>
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.storeName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenLayout>
      {/* Page title + count */}
      <View style={styles.titleRow}>
        <ScreenHeader title="Orders" backRoute="Home" />
        <Text style={styles.pageTitle}></Text>
        <Text style={styles.orderCount}>{ALL_ORDERS.length} Orders</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          placeholderTextColor="#BDBDBD"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('CreateOrder')}>
        <Icon name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Title row
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  orderCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  separator: {
    height: 10,
  },

  // Order card
  card: {
    backgroundColor: '#F5F6FA',
    borderWidth: 2,
    borderColor: '#d8d8dbff',
    borderStyle: 'solid',
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Row 1
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Row 2
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    padding: 2,
  },

  // Row 3
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 16,
    color: '#616161',
    fontWeight: '500',
  },
  amountBlock: {
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A237E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A237E',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default OrdersScreen;
