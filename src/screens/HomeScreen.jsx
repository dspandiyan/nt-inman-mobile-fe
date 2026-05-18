import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ── helpers ──────────────────────────────────────────────────────────────────
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

// ── sub-components ────────────────────────────────────────────────────────────
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

function SummaryCard({iconName, title, subtitle, count, gradientColors}) {
  return (
    <LinearGradient colors={gradientColors} style={styles.summaryCard} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
      <View style={styles.summaryIconBox}>
        <Icon name={iconName} size={28} color="#FFFFFF" />
      </View>
      <View style={styles.summaryTextGroup}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summarySubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.summaryCount}>{count}</Text>
    </LinearGradient>
  );
}

// ── screen ────────────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Inman</Text>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.topBarIcon}>
            <Icon name="bell-outline" size={24} color="#1A237E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarIcon}>
            <Icon name="account-circle-outline" size={28} color="#1A237E" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Greeting card ── */}
        <LinearGradient
          colors={['#1A237E', '#283593', '#1565C0']}
          style={styles.greetingCard}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.greetingLeft}>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
            <Text style={styles.greetingName}>Hi, Ajay</Text>
            <View style={styles.roleBadge}>
              <Icon name="shield-check" size={16} color="#4CAF50" />
              <Text style={styles.roleText}>Admin</Text>
            </View>
          </View>
          <Text style={styles.greetingEmoji}>{getGreetingEmoji()}</Text>
        </LinearGradient>

        {/* ── Quick Actions ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Action</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.qaRow}>
          <QuickActionCard
            iconName="clipboard-list-outline"
            label="Create Order"
            bgColor="#EEF0FB"
            iconBg="#3949AB"
          />
          <QuickActionCard
            iconName="store-outline"
            label="Add Store"
            bgColor="#E8F5E9"
            iconBg="#43A047"
          />
          <QuickActionCard
            iconName="cart-plus"
            label="Add  Items"
            bgColor="#EDE7F6"
            iconBg="#7B1FA2"
          />
        </View>

        {/* ── View Summary ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>View Summary</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.summaryList}>
          <SummaryCard
            iconName="clipboard-list-outline"
            title="Total Orders"
            subtitle="This Month"
            count="120"
            gradientColors={['#1A237E', '#283593', '#1565C0']}
          />
          <SummaryCard
            iconName="store-outline"
            title="Total Stores"
            subtitle="Active Stores"
            count="10"
            gradientColors={['#1B5E20', '#2E7D32', '#388E3C']}
          />
          <SummaryCard
            iconName="cart-outline"
            title="Total Items"
            subtitle="Published"
            count="145"
            gradientColors={['#4A148C', '#6A1B9A', '#7B1FA2']}
          />
        </View>

      </ScrollView>

      {/* ── Bottom tab bar ── */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItemActive}>
          <View style={styles.tabActiveBackground}>
            <Icon name="home" size={20} color="#FFFFFF" />
            <Text style={styles.tabLabelActive}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="shopping-outline" size={24} color="#9E9E9E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="cart-outline" size={24} color="#9E9E9E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="store-outline" size={24} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F5F6FA',
  },
  topBarTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A237E',
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarIcon: {
    padding: 4,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },

  // Greeting card
  greetingCard: {
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingLeft: {
    gap: 6,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  roleText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  greetingEmoji: {
    fontSize: 48,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  sectionDivider: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E0E0E0',
  },

  // Quick actions
  qaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  qaCard: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 10,
  },
  qaIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  // Summary cards
  summaryList: {
    gap: 12,
    marginBottom: 8,
  },
  summaryCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  summaryIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTextGroup: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summarySubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  summaryCount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Bottom tab bar
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
  },
  tabActiveBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A237E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  tabLabelActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default HomeScreen;
