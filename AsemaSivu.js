import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  init,
  addOneAsema,
  fetchAllAsemat,
} from './db';

init()
  .then(() => {
    console.log('Tietokannan luonti onnistui!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

addOneAsema()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const Asemasivu = ({navigation}) => {
  const [asemaList, setAsemaList] = useState([]);

  async function readAllAsemat() {
    try {
      const dbResult = await fetchAllAsemat();
      //console.log("dbResult readAllAsemat in App.js");
      setAsemaList(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } 
  }
  readAllAsemat();

  asemaList.reverse();

  //---------TYYLIT ALKAA----------------------------------
  const styles = StyleSheet.create({
    listItemStyle: {
      borderWidth: 1,
      borderColor: 'blue',
      padding: 5,
      backgroundColor: '#abc',
      width: '80%',
    },
    container: {
      flex: 2,
      backgroundColor: '#3C9887',
    },
    headercontainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    listcontainer: {
      borderWidth: 2,
      padding: 2,
      borderColor: 'black',
      borderRadius: 3,
      width: '90%',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 1,
      fontSize: 30,
    },
    headerText: {
      borderWidth: 3,
      padding: 2,
      borderColor: 'black',
      
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 10,
    },

    listText: {
      color: 'black',
      textDecorationLine: 'bold',
      fontStyle: 'italic',
      width: '80%',
      fontSize: 40,
      justifyContent: 'center',
    },
    textstyle1: {
      fontSize: 20,
      color: 'black',
      textDecorationLine: 'bold',
    },

    listcontainer: {
      backgroundColor: '#3C9887',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listStyle: {
      backgroundColor: '#c4c4c4',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
    },
    listItem: {
      alignItems: 'center',

      backgroundColor: 'white',
      fontSize: 20,
      borderColor: 'black',
      borderWidth: 2,
      padding: 5,
      marginTop: 4,
      marginBottom: 4,
      marginRight: 4,
      marginLeft: 4,

      borderRadius: 10,

    },
    listItemText: {
      color: 'black',
      textDecorationLine: 'bold',

      fontSize: 30,
    },
  });

  //---------TYYLIT LOPPUU------------------

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headerText}>

          <Text>VIIMEKSI VALITSEMASI ASEMAT</Text>

        </View>
      </View>

      <View style={styles.listcontainer}>
        
        <FlatList
          style={styles.listStyle}
          data={asemaList}
          renderItem={item => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => navigation.navigate('Aikataulusivu', {
                asemaKoodi: item.item.tunnus,
                asemaNimi: item.item.asema,
              })}>

              <Text style= {styles.listItemText}>{item.item.asema}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Asemasivu;