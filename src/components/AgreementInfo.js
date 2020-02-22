import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


class AgreementInfo extends React.Component {
    state = {
        
    }
      

    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>회사정보</Text>
                    <View style={styles.fillerContainer}/>
                </View>
                <View style={styles.noticesContainer}>
                    <View style={styles.noticeItemView}> 
                        <View style={styles.challengeNameContainer}>
                            <Text style={styles.announcementFont}>핑거픽 이용약관</Text>
                        </View>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.noticeItemView}> 
                        <View style={styles.challengeNameContainer}>
                            <Text style={styles.announcementFont}>핑거픽 서비스약관</Text>
                        </View>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.noticeItemView}> 
                        <View style={styles.challengeNameContainer}>
                            <Text style={styles.announcementFont}>회사정보</Text>
                        </View>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View elevation={10} style={styles.footerContainer}>
                    <View style={styles.footerIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainPage')}>
                            <Image style={styles.footerIcons} source={require('../images/homeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Ranking')}>
                            <Image style={styles.rankingIcon} source={require('../images/rankingIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Challenges')}>
                            <Image style={styles.footerIcons} source={require('../images/challengeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notices')}>
                            <Image style={styles.footerIcons} source={require('../images/noticeIconSelected.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image style={styles.footerIcons} source={require('../images/profileIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
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
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginLeft: -15
    },
    fillerContainer: {
        marginRight: 15
    },
    buttonsView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    viewFocus: {
        width: SCREEN_WIDTH/2,
        borderBottomWidth: 2,
        borderBottomColor: '#D439B4',
        alignItems: 'center',
        paddingBottom: 15
    },
    viewUnfocus: {
        width: SCREEN_WIDTH/2,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#D439B4',
        opacity: 0.7,
        alignItems: 'center',
        paddingBottom: 15
    },
    fontFocus: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    fontUnfocus: {
        fontSize: 20,
    },
    noticesContainer: {
        alignSelf: 'stretch',
        alignSelf: 'center',
        width: SCREEN_WIDTH,
        marginTop: 10,
        paddingBottom: SCREEN_HEIGHT*0.25,
    },
    noticeItemView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    challengePointsCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#707070',
        alignItems: 'center',
        justifyContent: 'center'
    },
    challengePoints: {
        fontSize: 15,
        padding: 5,
    },
    photoView: {
        backgroundColor: '#AAAAAA',
        width: 60,
        height: 60,
        overflow: 'hidden',
    },
    challengePic: {
        flex:1 , 
        height: undefined,
        width: undefined
    },
    challengeNameContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        flex: 1, 
        flexWrap: 'wrap',
        marginRight: 20,
        marginLeft: 10,
        justifyContent: 'center'
    },
    challengeFont: {
        color: '#707070',
        fontSize: 15,
    },
    announcementFont: {
        color: '#333333',
        fontSize: 15,
        fontWeight: 'bold'
    },
    announcementDescriptionFont: {
        color: '#333333',
        fontSize: 10
    },
    forwardArrow: {
        height: 20,
        width: 15,
        marginRight: 15
    },
    footerContainer: {
        height: SCREEN_HEIGHT*0.1, 
        width: SCREEN_WIDTH,
        position: 'absolute',
        bottom: 0,
        zIndex: 3006, 
        alignSelf: 'stretch', 
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
        height: 2,
        width: 1
        },
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
    },
    footerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    footerIcons: {
        height: 30,
        width: 30
    },
    rankingIcon: {
        height: 30,
        width: 35
    }
  });

  export default AgreementInfo;