import React, { useState } from 'react';  
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';  
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';  
import { useAuth } from '../context/AuthContext';   
import { useRouter } from 'expo-router';  

export default function LoginScreen() {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const { login } = useAuth(); 
  const router = useRouter();  

  const handleLogin = () => {  
    if (username && password) {  
      login(username, password); 
      Alert.alert('Success', 'You are now logged in');  
      router.replace('/app/dashboard');  
    } else {  
      Alert.alert('Error', 'Please enter both username and password');  
    }  
  };  

  return (  
    <ThemedView style={styles.container}>  
      <ThemedText type="title">Login</ThemedText>  
      <TextInput  
        style={styles.input}  
        placeholder="Username"  
        value={username}  
        onChangeText={setUsername}  
      />  
      <TextInput  
        style={styles.input}  
        placeholder="Password"  
        secureTextEntry  
        value={password}  
        onChangeText={setPassword}  
      />  
      <TouchableOpacity style={styles.button} onPress={handleLogin}>  
        <ThemedText>Login</ThemedText>  
      </TouchableOpacity>  
      <ThemedText onPress={() => router.push('/auth/signup')}>Don't have an account? Sign up</ThemedText>  
    </ThemedView>  
  );  
}  

const styles = StyleSheet.create({  
  container: { flex: 1, justifyContent: 'center', padding: 20 },  
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },  
  button: { backgroundColor: '#0a7ea4', padding: 10, borderRadius: 5 },  
});  