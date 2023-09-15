import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';



const App = () => {
  const [data, setData] = useState(null);
  const [text, onChangeText] = useState("")

  useEffect(() => {
    getDatabase();
  }, [])

  const getDatabase = async () => {
    try {
      //const data = await firestore().collection("testing").doc("h2ncdP3ixhScN0m1G6tm").get();
      //console.log(data._data.hobby);
      const data = await database().ref('/users/1').once("value");
      console.log(data.val())
      setData(data.val());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <TextInput style={styles.inputBox} placeholder={"Enter Text"} onChangeText={onChangeText} />
        <TouchableOpacity style={styles.addButton} >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableOpacity>
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
  }
});
