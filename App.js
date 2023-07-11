import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";


export default function App() {

async function LoadDatabase() {
    dbName = "main.db";
  
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    if (
      !(
        await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + "SQLite/" + dbName
        )
      ).exists
    ) {
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./main.db")).uri, // set to path of DB in package
        FileSystem.documentDirectory + "SQLite/" + dbName
      );
    }
    return true;
  }

  const [DbComplete, setDbComplete] = useState(false);

  useEffect(() => {
    async function loadDB() {
      const result = await LoadDatabase();
      setDbComplete(result);
    }
    loadDB();
  }, []);


  return (
    <View style={styles.container}>
      <Text>{DbComplete ? 'complete' : 'loading'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
