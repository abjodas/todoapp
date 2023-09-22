import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';



const App = () => {
  const [list, setList] = useState(null);
  const [text, onChangeText] = useState("")
  const userId = 10

  const newReference = database().ref('/todo').push();


  useEffect(() => {
    getDatabase();
  }, [])

  const getDatabase = async () => {
    try {
      const data = await database().ref(`todo`).once("value");
      console.log(data.val())
      setList(data.val());
    } catch (err) {
      console.log(err);
    }
  }


  const handleAddData = async () => {
    try {
      const response = database().ref(`/todo/0`)
        .set({ value: text })
      console.log("Response" + response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <TextInput style={styles.inputBox} placeholder={"Enter Text"} onChangeText={onChangeText} />
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddData()} >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableOpacity>


        <View style={styles.cardContainer}>
          <Text style={{ marginVertical: 10, color: "black", fontWeight: "bold", fontSize: 17 }}>Todo List</Text>

          <FlatList
            data={list}
            renderItem={item => {
              console.log(item.item.value)
              return (
                <View style={styles.card}>
                  <Text>{item.item.value}</Text>
                </View>
              )
            }}
          />
        </View>

      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("screen");

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBox: {
    width: width - 30,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  addButton: {
    width: 100,
    padding: 10,
    backgroundColor: "#0D3B66",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 5
  },
  cardContainer: {
    marginVertical: 20
  },
  card: {
    backgroundColor: "white",
    width: width - 20,
    padding: 10,
    justifyContent: "center",
    borderRadius: 10
  }
});
