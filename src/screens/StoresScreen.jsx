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
import ScreenLayout from '../components/ScreenLayout';
import ScreenHeader from '../components/ScreenHeader';

// ── sample data ───────────────────────────────────────────────────────────────
const ALL_STORES = [
  {
    id: '1',
    name: 'AAAA Stores',
    location: 'Tambaram Chennai',
    date: '12 May, 26',
    orders: 45,
    phone: '9025667856',
    amount: 400,
    type: 'get', // "You'll Get"
  },
  {
    id: '2',
    name: 'BBBB Stores',
    location: 'Madurai',
    date: '13 May, 26',
    orders: 67,
    phone: '9025667856',
    amount: 1400,
    type: 'give', // "You'll Give"
  },
  {
    id: '3',
    name: 'CCCC Stores',
    location: 'Coimbatore',
    date: '18 May, 26',
    orders: 32,
    phone: '9025667856',
    amount: 400,
    type: 'get',
  },
  {
    id: '4',
    name: 'DDDD Stores',
    location: 'Salem',
    date: '17 May, 26',
    orders: 17,
    phone: '9025667856',
    amount: 200,
    type: 'give',
  },
  {
    id: '5',
    name: 'FFFF Stores',
    location: 'Dindigul',
    date: '11 May, 26',
    orders: 25,
    phone: '9025667856',
    amount: 1500,
    type: 'get',
  },
  {
    id: '6',
    name: 'GGGG Stores',
    location: 'Trichy',
    date: '10 May, 26',
    orders: 38,
    phone: '9025667856',
    amount: 750,
    type: 'get',
  },
  {
    id: '7',
    name: 'HHHH Stores',
    location: 'Vellore',
    date: '09 May, 26',
    orders: 12,
    phone: '9025667856',
    amount: 300,
    type: 'give',
  },
];

// ── store card ────────────────────────────────────────────────────────────────
function StoreCard({store}) {
  const isGet = store.type === 'get';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {/* Row 1: store icon + name | amount */}
      <View style={styles.cardRow}>
        <View style={styles.nameRow}>
          <Icon name="store-outline" size={20} color="#10B981" />
          <Text style={styles.storeName}>{store.name}</Text>
        </View>
        <Text style={styles.amount}>₹{store.amount.toLocaleString('en-IN')}</Text>
      </View>

      {/* Row 2: location | you'll get/give */}
      <View style={styles.cardRow}>
        <View style={styles.infoChip}>
          <Icon name="map-marker-outline" size={14} color="#F59E0B" />
          <Text style={styles.locationText}>{store.location}</Text>
        </View>
        <Text style={[styles.settlementLabel, isGet ? styles.getColor : styles.giveColor]}>
          {isGet ? "You'll Get" : "You'll Give"}
        </Text>
      </View>

      {/* Row 3: date + orders | phone */}
      <View style={styles.cardRow}>
        <View style={styles.metaLeft}>
          <View style={styles.infoChip}>
            <Icon name="calendar-month-outline" size={14} color="#7C3AED" />
            <Text style={styles.metaText}>{store.date}</Text>
          </View>
          <Text style={styles.ordersText}>
            <Text style={styles.ordersCount}>{store.orders} </Text>
            Orders
          </Text>
        </View>
        <View style={styles.infoChip}>
          <Icon name="phone-outline" size={14} color="#F59E0B" />
          <Text style={styles.phoneText}>{store.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── screen ────────────────────────────────────────────────────────────────────
function StoresScreen() {
  const [search, setSearch] = useState('');

  const filtered = ALL_STORES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenLayout>
      <ScreenHeader title="Stores" backRoute="Home" />
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search  Store"
          placeholderTextColor="#BDBDBD"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Count row */}
      <View style={styles.countRow}>
        <Text style={styles.countLabel}>All Stores</Text>
        <Text style={styles.countValue}>50 Stores</Text>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => <StoreCard store={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Icon name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 12,
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
    borderWidth: 1,
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

  // Count row
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  countLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  countValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  separator: {
    height: 10,
  },

  // Store card
  card: {
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  settlementLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  getColor: {
    color: '#22C55E',
  },
  giveColor: {
    color: '#EF4444',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaText: {
    fontSize: 13,
    color: '#616161',
  },
  ordersText: {
    fontSize: 13,
    color: '#616161',
  },
  ordersCount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A237E',
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#616161',
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

export default StoresScreen;
