import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
class HomePage extends React.Component {
        state = {
         };
   

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.background} source={require('../images/initialBackground.png')} />
                <View style={styles.logoFontContainer}>
                    <Image style={styles.logo} source={require('../images/fingerPickLogo.png')} />
                    <Text style={styles.titleFont}>핑거픽</Text>
                </View>
                <Text style={styles.welcomeFont}>WELCOME</Text>
                <Text style={styles.subHeaderTop}>내 앨범 속 사진이 돈이 되는 곳,</Text>
                <Text style={styles.subHeaderBottom}>지금 당장 핑거픽 해보세요 !</Text>
                <TouchableOpacity style={styles.beginButton} onPress={() => this.props.navigation.navigate('AgreementCheck')}>
                    <Text style={styles.beginText}>Let's begin</Text>
                    <Image style={styles.homePageArrow} source={require('../images/homePageArrow.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
        height: '100%', 
        width: '100%'
    },
    logoFontContainer: {
        position: 'absolute', 
        alignSelf: 'stretch',
        flexDirection: 'row',
        top: SCREEN_HEIGHT*0.2,
        left: 20, 
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    logo: {
        zIndex: 2, 
        height: 70, 
        width: 70, 
    },
    titleFont: {
        color: 'white', 
        fontSize: 50, 
        marginLeft: 40
    },
    welcomeFont: {
        position: 'absolute', 
        left: 20, 
        color: 'white', 
        fontSize: 50, 
        top: SCREEN_HEIGHT*0.3
    },
    subHeaderTop: {
        position: 'absolute', 
        left: 20, 
        color: 'white', 
        top: SCREEN_HEIGHT*0.4,
    },
    subHeaderBottom: {
        position: 'absolute', 
        left: 20, 
        color: 'white', 
        top: SCREEN_HEIGHT*0.45,
    },
    beginButton: {
        position: 'absolute', 
        left: 20, 
        top: SCREEN_HEIGHT*0.55,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        height: 100
    },
    beginText: {
        color: 'white', 
        fontSize: 20, 
    },
    homePageArrow: {
        height: 25,
        width: 25,
        marginLeft: 20
    }
  });

  export default HomePage;