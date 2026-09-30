import { Home, Menu, Plus, Search, ShoppingCart, User } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Definimos los "tipos" para que TypeScript no marque error
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  unit: string;
  image: string;
}

// 2. Datos de prueba
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Plátanos Verdes", price: 1.50, category: "Frutas", unit: "racimo", image: "https://placehold.co/400x400/22c55e/white.png?text=Platanos" },
  { id: 2, name: "Leche Entera", price: 0.95, category: "Lácteos", unit: "litro", image: "https://placehold.co/400x400/3b82f6/white.png?text=Leche" },
  { id: 3, name: "Huevos Indios", price: 3.20, category: "Despensa", unit: "cubeta", image: "https://placehold.co/400x400/eab308/white.png?text=Huevos" },
  { id: 4, name: "Carne de Res", price: 4.50, category: "Carnes", unit: "libra", image: "https://placehold.co/400x400/ef4444/white.png?text=Carne" },
  { id: 5, name: "Arroz Súper Extra", price: 2.10, category: "Despensa", unit: "2 kg", image: "https://placehold.co/400x400/d1d5db/black.png?text=Arroz" },
  { id: 6, name: "Tomates Riñón", price: 0.80, category: "Verduras", unit: "libra", image: "https://placehold.co/400x400/dc2626/white.png?text=Tomate" },
];

// 3. Componente de la Tarjeta de Producto adaptado a TSX y React Native
const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.categoryText}>{product.category}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.unit}>por {product.unit}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(product)}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// 4. Pantalla Principal
export default function App() {
  // Especificamos que el carrito es un arreglo de Productos
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera / Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Supermercado</Text>
        <TouchableOpacity style={styles.cartIconContainer}>
          <ShoppingCart size={24} color="#374151" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <Text style={styles.searchText}>Buscar productos...</Text>
        </View>
      </View>

      {/* Catálogo de Productos */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Recomendados de hoy</Text>
          <Text style={styles.seeAll}>Ver todos</Text>
        </View>

        <View style={styles.gridContainer}>
          {MOCK_PRODUCTS.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Carrito flotante en la parte inferior */}
      {cart.length > 0 && (
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity style={styles.floatingCartButton}>
            <View>
              <Text style={styles.floatingCartTitle}>{cart.length} artículos</Text>
              <Text style={styles.floatingCartSubtitle}>Ir al carrito</Text>
            </View>
            <Text style={styles.floatingCartTotal}>${cartTotal.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#16a34a" />
          <Text style={[styles.navText, { color: '#16a34a' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Search size={24} color="#9ca3af" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#9ca3af" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 5. Estilos (reemplazan a las clases de Tailwind de la web)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  cartIconContainer: { position: 'relative' },
  badge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#ef4444', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  searchIcon: { marginRight: 8 },
  searchText: { color: '#9ca3af', fontSize: 16 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  headerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  seeAll: { color: '#16a34a', fontWeight: '500' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, flex: 1, borderColor: '#f3f4f6', borderWidth: 1 },
  imageContainer: { width: '100%', aspectRatio: 1, borderRadius: 12, overflow: 'hidden', marginBottom: 12, backgroundColor: '#f9fafb' },
  image: { width: '100%', height: '100%' },
  cardInfo: { flex: 1, justifyContent: 'space-between' },
  categoryText: { fontSize: 12, color: '#6b7280', textTransform: 'uppercase', marginBottom: 4 },
  productName: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  unit: { fontSize: 12, color: '#6b7280' },
  addButton: { backgroundColor: '#16a34a', padding: 8, borderRadius: 12 },
  floatingCartContainer: { position: 'absolute', bottom: 80, left: 16, right: 16, zIndex: 50 },
  floatingCartButton: { backgroundColor: '#16a34a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, shadowColor: '#16a34a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  floatingCartTitle: { color: '#fff', fontWeight: '500', fontSize: 14 },
  floatingCartSubtitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  floatingCartTotal: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingBottom: 24 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#9ca3af', marginTop: 4, fontWeight: '500' }
});