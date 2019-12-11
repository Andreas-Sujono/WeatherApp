import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

export default class Clock extends Component{

	state = {
		day:'',
		hours:'',
		isLoading:true
	}

	componentDidMount(){
		this.getTime.bind(this)
		setInterval( this.getTime.bind(this), 1000)
	}

	render(){
		return(
			<View style={styles.center}>  
	        	{this.state.isLoading ? <ActivityIndicator/>:
	        		<View style={[styles.center]}> 
	        			<Text style={styles.textBig}>{this.state.day} </Text>
	        			<Text style={styles.textBig}>{this.state.hours} </Text>
	        		</View>
	        	}
	      	</View>

		)
	}

	getTime(){
		let day = new Date().getDate()
		let month = new Date().getMonth()
		let year = new Date().getFullYear()
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let second = new Date().getSeconds()


		if( minute < 10 )
	    {
	        minute = '0' + String(minute)
	    }
	 
	    if( second < 10 )
	    {
	        second = '0' + String(second)
	    }

	    let dayPrint = `${String(day)}/${String(month)}/${String(year)}`
	    let hourPrint =  `${String(hour)}:${String(minute)}:${String(second)}`
	 
	    this.setState({
	    	day:dayPrint,
	    	hours:hourPrint,
	    	isLoading:false
	    	})

	}

}



const styles = StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center'
  },

  textBig:{
  	fontSize:20,
  	color:'white',
  }

});