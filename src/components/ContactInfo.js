import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class ContactInfo extends React.Component {
    state = {
        
    }
    
    render(){
        return( 
            <View style={styles.container}>
                <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                    <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                </TouchableOpacity>
            <LinearGradient style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}} colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]}>
                <View style={styles.eventImageContainer}>
                    <Image style={styles.eventImage} source={require('../images/contactInfo.png')}/>
                </View>
            </LinearGradient>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 100,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 5,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    backArrowContainer: {
        alignSelf: 'stretch',
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 30,
        left: 20,
        top: 60,
        zIndex: 200,
    },
    backArrow: {
        height: 25,
        width: 15,
    },
    eventHeader: {
        position: 'relative',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    eventText: {
        fontSize: 20,
    },
    fillerContainer: {
        position: 'relative',
        zIndex: 200,
        height: 30,
        width: 30,
        marginRight: 20,
        marginTop: 50,
    },
    eventImageContainer: {
        flex: 1, 
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    eventImage: {
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH,
        resizeMode: 'contain'
    },
    eventButton: {
        backgroundColor: 'black',
        height: 100,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
    eventButtonText: {
        fontSize: 20,
        color: 'white'
    }
});

  export default ContactInfo;