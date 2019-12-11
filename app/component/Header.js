import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Clock from './Clock.js'

export default function Header (){

	return(
		<View style={styles.center}>  

        	<Text style={{fontSize:30,color:'powderblue'}}> Weather App </Text>
        	<Clock/>
      	</View>

	)
}


const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});