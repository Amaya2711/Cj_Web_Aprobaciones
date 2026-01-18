import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function Menu({ navigation }) {
  const handleSalir = () => {
    Alert.alert('Salir', 'Sesión finalizada');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Salir del sistema" onPress={handleSalir} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
  },
});
