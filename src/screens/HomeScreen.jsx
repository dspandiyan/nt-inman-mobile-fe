import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenLayout from '../components/ScreenLayout';
import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning !';
  if (hour < 17) return 'Good Afternoon !';
  return 'Good Evening !';
}

function getGreetingEmoji() {
  const hour = new Date().getHours();
  if (hour < 12) return '☀️';
  if (hour < 17) return '🌤️';
  return '🌙';
}

function QuickActionCard({iconName, label, bgColor, iconBg}) {
  return (
    <TouchableOpacity style={[styles.qaCard, {backgroundColor: bgColor}]} activeOpacity={0.8}>
      <View style={[styles.qaIconBox, {backgroundColor: iconBg}]}>
        <Icon name={iconName} size={28} color="#FFFFFF" />
      </View>
      <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function SummaryCard({iconName, title, subtitle, count, centerColor, edgeColor, gradId}) {
  return (
    <View style={[styles.summaryCard, {overflow: 'hidden'}]}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id={gradId} cx="50%" cy="50%" r="70%">
            <Stop offset="0%" stopColor={centerColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={edgeColor} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${gradId})`} />
      </Svg>
      <View style={styles.summaryIconBox}>
        <Icon name={iconName} size={28} color="#FFFFFF" />
      </View>
      <View style={styles.summaryTextGroup}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summarySubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.summaryCount}>{count}</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.greetingCard}>
          <Svg style={StyleSheet.absoluteFill}>
            <Defs>
              <RadialGradient id="gradGreeting" cx="50%" cy="50%" r="70%">
                <Stop offset="0%" stopColor="#1E40AF" stopOpacity="1" />
                <Stop offset="100%" stopColor="#0D1B49" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#gradGreeting)" />
          </Svg>
          <View style={styles.greetingLeft}>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
            <Text style={styles.greetingName}>Hi, Ajay</Text>
            <View style={styles.roleBadge}>
              <Icon name="shield-check" size={20} color="#4CAF50" />
              <Text style={styles.roleText}>Admin</Text>
            </View>
          </View>
          <Text style={styles.greetingEmoji}>{getGreetingEmoji()}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Action</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.qaRow}>
          <QuickActionCard iconName="clipboard-list-outline" label="Create Order" bgColor="#E0E7FF" iconBg="#2563EB" />
          <QuickActionCard iconName="store-outline" label="Add Store" bgColor="#D1FAE5" iconBg="#10B981" />
          <QuickActionCard iconName="cart-plus" label="Add  Items" bgColor="#EDE9FE" iconBg="#7C3AED" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>View Summary</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.summaryList}>
          <SummaryCard gradId="gradOrders" iconName="clipboard-list-outline" title="Total Orders" subtitle="This Month" count="120" centerColor="#2563EB" edgeColor="#0D1B6E" />
          <SummaryCard gradId="gradStores" iconName="store-outline" title="Total Stores" subtitle="Active Stores" count="10" centerColor="#10B981" edgeColor="#0A2E0C" />
          <SummaryCard gradId="gradItems" iconName="cart-outline" title="Total Items" subtitle="Published" count="145" centerColor="#7C3AED" edgeColor="#472187" />
        </View>

      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {paddingHorizontal: 16, paddingBottom: 16, gap: 4, marginTop: 10, marginBottom: 10},
  greetingCard: {borderRadius: 16, padding: 24, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, overflow: 'hidden'},
  greetingLeft: {gap: 20},
  greetingText: {fontSize: 26, fontWeight: '700', color: '#FFFFFF'},
  greetingName: {fontSize: 20, fontWeight: '700', color: '#FFFFFF'},
  roleBadge: {flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2},
  roleText: {fontSize: 16, color: '#FFFFFF', fontWeight: '500'},
  greetingEmoji: {fontSize: 48},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 15},
  sectionTitle: {fontSize: 18, fontWeight: '800', color: '#000000'},
  sectionDivider: {flex: 1, height: 1.5, backgroundColor: '#1E40AF'},
  qaRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 10},
  qaCard: {flex: 1, borderRadius: 16, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 8, gap: 10},
  qaIconBox: {width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center'},
  qaLabel: {fontSize: 16, fontWeight: '700', color: '#1A1A1A', textAlign: 'center'},
  summaryList: {gap: 12, marginBottom: 8},
  summaryCard: {borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14},
  summaryIconBox: {width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'},
  summaryTextGroup: {flex: 1},
  summaryTitle: {fontSize: 15, fontWeight: '800', color: '#FFFFFF'},
  summarySubtitle: {fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2},
  summaryCount: {fontSize: 22, fontWeight: '800', color: '#FFFFFF'},
});

export default HomeScreen;
