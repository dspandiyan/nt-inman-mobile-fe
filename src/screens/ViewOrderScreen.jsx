import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTabBar from '../components/BottomTabBar';
import TopBar from '../components/TopBar';

// ── sample items per order (keyed by orderId) ─────────────────────────────────
const ORDER_ITEMS = {
  '#OD12': [
    {id: '1', name: 'Lays Chips',  qty: 10, price: 5,  total: 50},
    {id: '2', name: 'Milky bar',   qty: 20, price: 10, total: 200},
    {id: '3', name: 'Dairy Milk',  qty: 10, price: 25, total: 250},
  ],
  '#OD13': [
    {id: '1', name: 'Oreo',        qty: 50, price: 20,  total: 1000},
    {id: '2', name: 'KitKat',      qty: 80, price: 30,  total: 2400},
    {id: '3', name: 'Bourbon',     qty: 60, price: 15,  total: 900},
    {id: '4', name: 'Good Day',    qty: 40, price: 25,  total: 1000},
    {id: '5', name: 'Marie Gold',  qty: 70, price: 16,  total: 1120},
  ],
  '#OD14': [
    {id: '1', name: 'Sprite 2L',   qty: 30, price: 80,  total: 2400},
    {id: '2', name: 'Pepsi 1L',    qty: 60, price: 50,  total: 3000},
    {id: '3', name: 'Frooti 200ml',qty: 100,price: 15,  total: 1500},
  ],
  '#OD15': [
    {id: '1', name: 'Cup Cake',    qty: 200,price: 20,  total: 4000},
    {id: '2', name: 'Brownie',     qty: 80, price: 50,  total: 4000},
    {id: '3', name: 'Muffin',      qty: 40, price: 100, total: 4000},
  ],
  '#OD16': [
    {id: '1', name: 'Potato Chips',qty: 50, price: 40,  total: 2000},
    {id: '2', name: 'Pringles',    qty: 30, price: 85,  total: 2550},
    {id: '3', name: 'Doritos',     qty: 40, price: 99,  total: 3960},
  ],
  '#OD17': [
    {id: '1', name: 'Dairy Milk',  qty: 20, price: 40,  total: 800},
    {id: '2', name: '5 Star',      qty: 30, price: 20,  total: 600},
    {id: '3', name: 'Munch',       qty: 50, price: 10,  total: 500},
    {id: '4', name: 'Eclairs',     qty: 66, price: 20,  total: 1320},
  ],
};

// ── screen ────────────────────────────────────────────────────────────────────
function ViewOrderScreen({route, navigation}) {
  const {orderId, storeName, amount} = route.params ?? {
    orderId: '#OD12',
    storeName: 'AAAA  Department Store',
    amount: 500,
  };

  const items = ORDER_ITEMS[orderId] ?? ORDER_ITEMS['#OD12'];
  const grandTotal = items.reduce((sum, i) => sum + i.total, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <TopBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Page title */}
        <Text style={styles.pageTitle}>Orders Details</Text>

        {/* Order meta */}
        <Text style={styles.metaText}># Order Id : {orderId}</Text>
        <Text style={styles.metaStoreName}>Store Name : {storeName}</Text>

        {/* Table */}
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, styles.colHash]}>#</Text>
            <Text style={[styles.colHeader, styles.colName]}>Product Name</Text>
            <Text style={[styles.colHeader, styles.colQty]}>Qty</Text>
            <Text style={[styles.colHeader, styles.colPrice]}>Price</Text>
            <Text style={[styles.colHeader, styles.colTot]}>Tot</Text>
          </View>

          {/* Rows */}
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index < items.length - 1 && styles.tableRowBorder,
              ]}>
              <Text style={[styles.cell, styles.colHash]}>{index + 1}.</Text>
              <Text style={[styles.cell, styles.colName]}>{item.name}</Text>
              <Text style={[styles.cell, styles.colQty]}>{item.qty}</Text>
              <Text style={[styles.cell, styles.colPrice]}>{item.price}</Text>
              <Text style={[styles.cell, styles.colTot]}>{item.total}</Text>
            </View>
          ))}

          {/* Total row */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total : </Text>
            <Text style={styles.totalValue}>
              ₹ {grandTotal.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

      </ScrollView>

      <BottomTabBar activeRoute="Orders" />
    </SafeAreaView>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // Meta
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 4,
  },
  metaStoreName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },

  // Table
  table: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  colHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cell: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },

  // Column widths
  colHash:  {width: 30},
  colName:  {flex: 1},
  colQty:   {width: 44, textAlign: 'center'},
  colPrice: {width: 52, textAlign: 'center'},
  colTot:   {width: 52, textAlign: 'right'},

  // Total
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A237E',
  },
});

export default ViewOrderScreen;
