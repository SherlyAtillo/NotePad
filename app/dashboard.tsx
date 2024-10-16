import React, { useState, useEffect, useMemo } from 'react';  
import { StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useRouter } from 'expo-router';  
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';  
import { useAuth } from './context/AuthContext'; 
import { ThemeToggle } from '@/components/ThemeToggle'; 
import { ThemeContext } from './context/ThemeContext';

type Note = {  
  id: string;  
  content: string;  
};  

export default function DashboardScreen() {  
  const [notes, setNotes] = useState<Note[]>([]);  
  const [newNote, setNewNote] = useState('');  
  const { logout } = useAuth();  
  const router = useRouter();  

  useEffect(() => {  
    loadNotes();  
  }, []);  

  const loadNotes = async () => {  
    try {  
      const savedNotes = await AsyncStorage.getItem('notes');  
      if (savedNotes) {  
        setNotes(JSON.parse(savedNotes));  
      }  
    } catch (error) {  
      console.error('Error loading notes:', error);  
    }  
  };  

  const saveNotes = async (updatedNotes: Note[]) => {  
    try {  
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));  
    } catch (error) {  
      console.error('Error saving notes:', error);  
    }  
  };  

  const handleAddNote = () => {  
    if (newNote.trim()) {  
      const updatedNotes = [  
        ...notes,  
        { id: Date.now().toString(), content: newNote.trim() },  
      ];  
      setNotes(updatedNotes);  
      saveNotes(updatedNotes);  
      setNewNote('');  
    }  
  };  

  const handleDeleteNote = (id: string) => {  
    const updatedNotes = notes.filter((note) => note.id !== id);  
    setNotes(updatedNotes);  
    saveNotes(updatedNotes);  
  };  

  const handleLogout = () => {  
    logout();  
    router.replace('/auth/login');  
  };  

  const sortedNotes = useMemo(() => {  
    return [...notes].sort((a, b) => parseInt(b.id) - parseInt(a.id));  
  }, [notes]);  

  return (  
    <ThemedView style={styles.container}>  
      <ThemedText type="title">Dashboard</ThemedText>  
      <TextInput  
        style={styles.input}  
        placeholder="Add a new note"  
        value={newNote}  
        onChangeText={setNewNote}  
        multiline  
      />  
      <TouchableOpacity style={styles.button} onPress={handleAddNote}>  
        <ThemedText>Add Note</ThemedText>  
      </TouchableOpacity>  
      <FlatList  
        data={sortedNotes}  
        keyExtractor={(item) => item.id}  
        renderItem={({ item }) => (  
          <ThemedView style={styles.noteItem}>  
            <ThemedText>{item.content}</ThemedText>  
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>  
              <ThemedText style={styles.deleteButton}>Delete</ThemedText>  
            </TouchableOpacity>  
          </ThemedView>  
        )}  
      />  
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>  
        <ThemedText>Logout</ThemedText>  
      </TouchableOpacity>  
    </ThemedView>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    padding: 20,  
  },  
  input: {  
    height: 100,  
    borderColor: 'gray',  
    borderWidth: 1,  
    marginBottom: 10,  
    paddingHorizontal: 10,  
    textAlignVertical: 'top',  
  },  
  button: {  
    backgroundColor: '#0a7ea4',  
    padding: 10,  
    borderRadius: 5,  
    alignItems: 'center',  
    marginBottom: 10,  
  },  
  noteItem: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    padding: 10,  
    borderBottomWidth: 1,  
    borderBottomColor: '#ccc',  
  },  
  deleteButton: {  
    color: 'red',  
  },  
  logoutButton: {  
    backgroundColor: '#f44336',  
    padding: 10,  
    borderRadius: 5,  
    alignItems: 'center',  
    marginTop: 20,  
  },  
});  