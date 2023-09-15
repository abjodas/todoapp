import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';



const App = () => {
  const [data, setData] = useState(null);

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

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
