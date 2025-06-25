import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  // Mock user data (já que auth não está sendo usado)
  const user = {
    email: 'usuario@exemplo.com',
    uid: '1234567890abcdef',
  };

  const handleLogout = () => {
    // Aqui só faz a navegação para a lista, já que sem autenticação real
    navigation.replace('ListProducts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>UID:</Text>
        <Text style={styles.info}>{user.uid}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4338ca',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366f1',
  },
  info: {
    fontSize: 16,
    color: '#4f46e5',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
