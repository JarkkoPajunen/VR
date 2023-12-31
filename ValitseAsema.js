import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  addAsema
} from './db';

// npm install react-native-searchable-dropdown <-install first and then import

  async function saveAsema(stationName, stationShortCode){
    try{
      const dbResult = await addAsema(stationName, stationShortCode);
      console.log("dbResult: "+dbResult);//For debugging purposes to see the data in the console screen
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
  }


  const ValitseAsema = ({ navigation }) => {

  const [serverData, setServerData] = useState([]);

  const fetchStations = async () => {
    try {
      let response = await fetch(
        // https://www.digitraffic.fi/rautatieliikenne/#p%C3%A4iv%C3%A4n-junien-tiedot

        'https://rata.digitraffic.fi/api/v1/metadata/stations',
      );
      let json = await response.json();

      // console.log(json);
      setServerData(json);
    } catch (error) {
      console.log(error);
    }
  };

  
  // Tehdään uusi lista asemista searchableDropdown-komponentille
  const asemat = [];
  
  // Loopataan API-sta saatu lista

  for (let i = 0; i < serverData.length; i++) {
    // Tarkistetaan onko asema matkustaja liikenteelle
    if (serverData[i].passengerTraffic == true) {
      // Lisätään uusi asema tähän uuteen asemat-listaan
      newAsema = {
        id: i,
        name: serverData[i].stationName,
        stationShortCode: serverData[i].stationShortCode,
      };
      asemat.push(newAsema);
    }
  }

  // useEffect muuttujien päivittämiseksi
  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Valitse haluamasi juna-asema</Text>

        <SearchableDropdown
          // Listener on the searchable input
          onItemSelect={item => {
            alert('Valitsit aseman ' + item.name);
            saveAsema(item.name, item.stationShortCode);
            navigation.navigate('Aikataulusivu', {
              asemaKoodi: item.stationShortCode,
              asemaNimi: item.name,

            });
          }}
          onTextChange={text => console.log(text)}
          // Called after the selection
          containerStyle={{ padding: 5 }}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
            color: 'black',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '70%',
          }}
          items={asemat}
          // Mapping of item array
          defaultIndex={2}
          // Default selected item index
          placeholder="Valitse Asema"
          // place holder for the search input
          resPtValue={false}
          // Reset textInput Value with true and false state
          underlineColorAndroid="transparent"
        // To remove the underline from the android input
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  venaaTeksti: {
    alignSelf: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  screenContainer: {
    backgroundColor: '#3C9887',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  appButtonContainer: {
    elevation: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  appButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  headingText: {
    alignSelf: 'center',
    color: 'black',
    padding: 8,
  },
});

export default ValitseAsema;
