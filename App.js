import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image ,TextInput,Button} from 'react-native';
import React, { useState } from 'react';



const App = () => {
  
  const [data, setData] = useState([
    {
      cityId: 1,
      cityName: "Gulmarg",
      cityImage: require("./assets/gulmarg.jpeg")
    },
    {
      cityId: 2,
      cityName:"Faridabad",
      cityImage: require("./assets/faridabad.jpg")
    },
   
    {
      cityId: 4,
      cityName: "Mumbai",
      cityImage: require("./assets/mumbai.jpeg")
    },
   
    {
      cityId: 6,
      cityName: "Nagpur",
      cityImage: require("./assets/nagpur.jpg")
    },
    {
      cityId: 7,
      cityName: "Delhi",
      cityImage: require("./assets/delhi.jpg")
    },
    {
      cityId: 8,
      cityName: "Madras",
      cityImage: require("./assets/madras.jpeg")
    },
    {
      cityId: 9,
      cityName: "Pahalgam",
      cityImage: require("./assets/pahalgam.jpeg")
    },
   
  ])

  const api_key = '75a425c577efdad478816f2ff9cb767b';

  const [weatherData, setWeatherData] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  const [city, setCity] = useState('')

  const [cityName, setcityName] = useState("")

  const onPressItemClick = (item) => {
    setErrorMessage('')
    getWeatureInfoFromApi(item);
    setcityName(item)
  };

  
  const onPressSearchTemp = () => {
     
    getWeatureInfoFromApi(city);
    setcityName(city)
  };



  const getWeatureInfoFromApi = async (item) => {
  //  alert("Rakesh_____    "+item)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${api_key}`;

      const response = await fetch(url);
      const responseData = await response.json();
     
      console.log('Rakesh_____--- responseData ', responseData);

      if (responseData.cod == 200) {
        setWeatherData(responseData);
      } else {
        setErrorMessage("" + responseData?.message)
      }
    } catch (error) {    
      console.log('Rakesh_____--- error ', error);
      setErrorMessage("" + error)
    }

  };

  const onRenderItem = ({ item, index }) => {
    return (
      <View key={item.cityId}
        style={styles.container}>

        <Image
        source={item.cityImage}
        style={{height:150,width:300}}
        resizeMode='cover'
        />

        <Text
          style={styles.text1}>
          {item.cityName}
        </Text>

       

        <TouchableOpacity
          onPress={() => onPressItemClick(item.cityName)}
          style={styles.touchable}>
          <Text
            style={styles.text2}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{marginBottom:10}}>


    <View style={{flexDirection:"row"}}>
      <TextInput
      placeholder='Enetr City Name'
      style={{marginHorizontal:10,marginTop:10,paddingHorizontal:10,borderWidth:1,flex:1,borderRadius:30}}
      value={city}
      defaultValue={city}
      onChangeText={(text)=>setCity(text)}
      />

     

      <TouchableOpacity style={{marginTop:15,marginBottom:10,marginRight:10,backgroundColor:"blue",paddingHorizontal:10,borderRadius:10}}
      onPress={onPressSearchTemp}
      >

        <Text style={{color:"white",marginTop:7}} >Search</Text>

      </TouchableOpacity>

     </View>


      


      {  errorMessage == '' ?


      <View style={{ minHeight: 150, padding: 20, backgroundColor: 'black', margin:20,borderRadius:20 }}>

        <Text style={{color:"white",textAlign:"center",fontSize:20}} >{cityName}</Text>
        <View style={{ flex:1, flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            Temp
          </Text>
          <Text style={{fontSize: 20, color: 'white',marginLeft:150 }}>
            { (weatherData?.main?.temp -273  ).toFixed(2)  } &deg; C
          </Text>
        </View>
        <View style={{ flex:1,flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            Humidity
          </Text>
          <Text style={{ fontSize: 20, marginLeft:150, color: 'white' }}>
            {weatherData?.main?.humidity}
          </Text>
        </View>
      </View>

        : 

        <Text style={{textAlign:'center', fontSize:22, color:'red'  }}>
            {errorMessage}
        </Text>

      }
    <FlatList
        data={data}
        renderItem={onRenderItem}
        horizontal
        keyExtractor={(item) => item.cityId}
      />


    </View>
  );
};

export default App;

const styles = StyleSheet.create({

  container: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    width: 300,
    backgroundColor: 'black',
  },


  text1: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 40,
    fontSize: 44,
  },


  touchable: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },

  text2: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 10,
    fontSize: 44,
  },

  view1: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },

  text3: {
    flex: 0.7,
    color: 'white',
    fontSize: 35,
    textAlign: 'left',
  },

  text4: {
    flex: 1,
    color: 'white',
    fontSize: 35,
    textAlign: 'right',
  },

  text5: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
  },

  text6: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textAlign: 'right',
  },

  text7: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
  },

  text8: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textAlign: 'right',
  }




});