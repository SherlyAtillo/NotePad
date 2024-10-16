import React, { useState } from 'react';  
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';  
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';  
import { useRouter } from 'expo-router';  

export default function SignupScreen() {  
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  
  const router = useRouter();  

  const handleSignup = () => {  
    if (password !== confirmPassword) {  
      Alert.alert('Error', 'Passwords do not match');  
      return;  
    }  
    Alert.alert('Success', 'You can now login', [  
      { text: 'OK', onPress: () => router.replace('/auth/login') },  
    ]);  
  };  

  return (  
    <ThemedView style={styles.container}>  
      <ThemedText type="title">Sign Up</ThemedText>  
      <TextInput  
        style={styles.input}  
        placeholder="First Name"  
        value={firstName}  
        onChangeText={setFirstName}  
      />  
      <TextInput  
        style={styles.input}  
        placeholder="Last Name"  
        value={lastName}  
        onChangeText={setLastName}  
      />  
      <TextInput  
        style={styles.input}  
        placeholder="Email"  
        value={email}  
        onChangeText={setEmail}  
        keyboardType="email-address"  
      />  
      <TextInput  
        style={styles.input}  
        placeholder="Password"  
        secureTextEntry  
        value={password}  
        onChangeText={setPassword}  
      />  
      <TextInput  
        style={styles.input}  
        placeholder="Confirm Password"  
        secureTextEntry  
        value={confirmPassword}  
        onChangeText={setConfirmPassword}  
      />  
      <TouchableOpacity style={styles.button} onPress={handleSignup}>  
        <ThemedText>Sign Up</ThemedText>  
      </TouchableOpacity>  
      <ThemedText onPress={() => router.push('/auth/login')}>Already have an account? Log in</ThemedText>  
    </ThemedView>  
  );  
}  

const styles = StyleSheet.create({  
  container: { flex: 1, justifyContent: 'center', padding: 20 },  
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },  
  button: { backgroundColor: '#0a7ea4', padding: 10, borderRadius: 5 },  
});  