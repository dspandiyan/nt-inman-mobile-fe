import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import ScreenHeader from '../components/ScreenHeader';
import Svg, {Defs, RadialGradient, LinearGradient, Stop, Rect} from 'react-native-svg';

// ── sample data ───────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  {
    id: '1',
    name: 'Potato Chips',
    category: 'Chips',
    stock: 50,
    price: 40.0,
    image: require('../Assets/image 4.png'),
  },
  {
    id: '2',
    name: 'Good Day',
    category: 'Biscuits',
    stock: 30,
    price: 25.0,
    image: null,
  },
  {
    id: '3',
    name: 'Sprit',
    category: 'Cool Drinks',
    stock: 70,
    price: 99.0,
    image: null,
  },
  {
    id: '4',
    name: 'Cup Cake',
    category: 'Cake',
    stock: 100,
    price: 20.0,
    image: null,
  },
  {
    id: '5',
    name: 'Lays Classic',
    category: 'Chips',
    stock: 45,
    price: 20.0,
    image: null,
  },
  {
    id: '6',
    name: 'Oreo',
    category: 'Biscuits',
    stock: 60,
    price: 35.0,
    image: null,
  },
];

// ── item card ─────────────────────────────────────────────────────────────────
function ItemCard({item}) {
  return (
    <View style={styles.card}>
      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        {item.image ? (
          <Image source={item.image} style={styles.thumbnailImg} resizeMode="cover" />
        ) : (
          <Icon name="image-outline" size={36} color="#BDBDBD" />
        )}
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <View style={styles.stockRow}>
          <Text style={styles.inStock}>In Stock</Text>
          <View style={styles.stockDot} />
          <Text style={styles.stockUnits}>{item.stock} units</Text>
        </View>
        <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
      </View>

      {/* Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Icon name="pencil-box-outline" size={22} color="#9E9E9E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── screen ────────────────────────────────────────────────────────────────────
function ItemsScreen() {
  const [activeTab, setActiveTab] = useState('Items');
  const [search, setSearch] = useState('');

  const filtered = ALL_ITEMS.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenLayout>
      <View style={styles.ItemsHeading}>
        <ScreenHeader title="Items" backRoute="Home" />
      </View>
      {/* Tab toggle */}
      
      <View style={styles.tabToggle}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="tabToggleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#0D1B49" stopOpacity="1" />
              <Stop offset="50%" stopColor="#1F41AF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#0D1B49" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#tabToggleGrad)" />
        </Svg>
        {['Items', 'Categories'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.toggleBtn, activeTab === tab && styles.toggleBtnActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}>
            {activeTab === tab && (
              <Svg style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id={`tabGrad_${tab}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#0D1B49" stopOpacity="1" />
                    <Stop offset="60%" stopColor="#1F41AF" stopOpacity="1" />
                    {/* <Stop offset="100%" stopColor="#0D0D2B" stopOpacity="1" /> */}
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill={`url(#tabGrad_${tab})`} />
              </Svg>
            )}
            <Text style={[styles.toggleLabel, activeTab === tab && styles.toggleLabelActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search  item"
          placeholderTextColor="#BDBDBD"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Count row */}
      <View style={styles.countRow}>
        <Text style={styles.countLabel}>All Items</Text>
        <Text style={styles.countValue}>{ALL_ITEMS.length * 10} Items</Text>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ItemCard item={item} />}
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

  ItemsHeading :{
    paddingHorizontal: 16
  },

  // Tab toggle
  tabToggle: {
    flexDirection: 'row',
    borderRadius: 40,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 4,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
  },
  toggleBtnActive: {
    borderWidth: 2,
    borderColor: '#d8d8dbff',
    overflow: 'hidden',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  toggleLabelActive: {
    color: '#FFFFFF',
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

  // Item card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
     borderWidth: 2,
    borderColor: '#d8d8dbff',
    borderStyle: 'solid',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  itemCategory: {
    fontSize: 13,
    color: '#9E9E9E',
    marginBottom: 2,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inStock: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E',
  },
  stockDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  stockUnits: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 2,
  },
  cardActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 2,
  },
  editBtn: {
    padding: 2,
  },
  addBtn: {
    borderWidth: 1.5,
    borderColor: '#1A237E',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A237E',
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

export default ItemsScreen;
