
import React, { Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Image
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import Header from './component/Header.js'
import Clock from './component/Clock.js'

export default class App extends Component{

  state = {
      isLoading:true,
      location:[35,139],
      city:'singapore',
      day:'test',
      icon:'',
      weather_data:null,
  }

  componentDidMount(){
    this.getDay()
    this.getLocation()

    fetch(`http://api.weatherstack.com/current?access_key=228d778819d9090eb24c0f048ad269b4&query=${this.state.city}`)
    .then( response => 
       response.json()
    )
    .then( response => {

        console.log(response)

        this.setState({
          weather_data:[response],
          icon:response.current.weather_icons[0],
          isLoading:false
        })

        return response
      }
    )

  }


  getLocation = () =>{
    Geolocation.getCurrentPosition(

    position => {
   
      this.setState({ 
        location: [position.coords.altitude,position.coords.longitude],
        isLoading:false
      })


    }
    );

  }

  getDay = () => {
    let day = new Date()
    day = day.getDay()
    let dayList= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    for(var i = 0; i < 7; i++){
      if (day == i)
        this.setState({day:dayList[i]})
    }

    
  }

  render(){


    return (
      <View style={{flex:1}}> 
        <ImageBackground source={require('./assets/day_weather.png')} style={{width:'100%',height:'100%'}}>
          
          <View style={{flex:1,marginBottom:20}}>
            <Header/>
          </View>
          

          <View style={{flex:4}}>

            <View style={{flex :1,backroundColor:'red'}}>
              
              <Text style={[styles.textHeader,{color:'maroon'}]}> 
                {this.state.day} 
              </Text>

              <Text style={styles.textHeader}>
                <Text style={[styles.textHeader,{color:'white'}]}>
                  at {this.state.city} 
                </Text>
              </Text>

            </View>

            <View style={{flex:5}}>

              <View style={{alignItems:'center'}}>
                <Image source={require('./assets/rain_icon.png')} style={{width: "80%", height: 200}}/>
              </View>
              
                {this.state.isLoading ? <ActivityIndicator/> : 
                  this.state.weather_data &&
                      this.state.weather_data.map(obj => (
                        <View style={{flex:1}} key={parseInt(Math.random()*1000)}>

                          <View style={{alignItems:'center'}}>
                            <Text style={[styles.textHeader,{fontStyle:'normal',fontSize:22,marginBottom:20,marginLeft:0}]}> 
                              {obj.current.weather_descriptions[0]}
                            </Text>
                            <Text style={[styles.center]}> Humidity : {obj.current.humidity} </Text>
                            <Text style={[styles.center]}> wind speed : {obj.current.wind_speed} </Text>
                            <Text style={[styles.center]}> visibility : {obj.current.visibility} </Text>
                          </View>


                          <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                            <Text style={{color:'white',fontSize:80}}> {obj.current.temperature}°C</Text>
                          </View>


                        </View>
                      ))
                  
                }
              
            </View>

          </View>

        </ImageBackground>
      </View>
        
    )
  } 
}

const styles = StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center'
  },

  textHeader:{fontStyle:'italic',marginLeft:50,color:'snow',fontSize:18}
});

