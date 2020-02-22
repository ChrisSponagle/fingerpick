import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Announcement extends React.Component {
    state = {
        
    }    
    
    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>공지사항</Text>
                    <View style={styles.fillerContainer}/>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginLeft: -20
    },
    backArrowContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backArrow: {
        height: 25,
        width: 15,
        marginRight: 5
    },
    fillerContainer: {
        marginRight: 15
    }
    
  });

  export default Announcement;