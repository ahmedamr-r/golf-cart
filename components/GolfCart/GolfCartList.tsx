import { StyleSheet, View } from 'react-native';
import { GolfCart } from '@/lib/types';
import { GolfCartCard } from './GolfCartCard';

type GolfCartListProps = {
  carts: GolfCart[];
};

export function GolfCartList({ carts }: GolfCartListProps) {
  return (
    <View style={styles.container}>
      {carts.map((cart) => (
        <GolfCartCard key={cart.id} cart={cart} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
}); 