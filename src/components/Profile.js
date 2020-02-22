import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import CircularProgress from './MeterCircle';
import ProgressCircle from 'react-native-progress-circle'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'
class MyInformation extends React.Component {
    state = {
        username: '',
        userIntro: '',
        profilePhoto: '',
        levelPercent: '',
        levelNumber: '',
        profileInfo: '',
    }

    componentWillMount() {
        this.getProfileInfo()
    }

    componentDidMount() {
        setInterval(() => {this.getProfileInfo()}, 600000)
    }
    getProfileInfo() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/mypage/profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',    
            },
            });

            const content = await rawResponse; 
            content.json().then(data => {
                this.setState({
                    profileInfo: [data],
                })
                this.setState({
                    profileInfo: this.state.profileInfo[0].profile,
                })
                if (this.state.profileInfo[0].profile_img_filename) {
                    this.setState({
                        profilePhoto: imgUrl + 'profiles/'+ this.state.profileInfo[0].profile_img_filename + '?date=' + (new Date()).getTime(),
                        levelNumber: this.state.profileInfo[0].level,
                        levelPercent: this.state.profileInfo[0].exp,
                        isLoaded: true
                    })
                }
                else {
                    this.setState({
                        profilePhoto: null,
                        levelNumber: this.state.profileInfo[0].level,
                        levelPercent: this.state.profileInfo[0].exp,
                        isLoaded: true
                    })
                }
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
    
    render(){
        return( 
            <View style={styles.container}>
                <ImageBackground style={styles.headerContainter} source={require('../images/profileHeader.png')}>
                    {this.state.isLoaded && <Text style={styles.headerFont}>{this.state.profileInfo[0].nickname}</Text>}
                </ImageBackground> 
                {this.state.isLoaded && <View style={styles.photoInfoContainer}>
                    {/* {this.state.isLoaded && <Image style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/'+ this.state.profileInfo[0].profile_img_filename}}/>} */}
                    <View style={styles.userInfoContainer}>
                        {this.state.isLoaded && <Image style={styles.profilePhoto} source={{uri: this.state.profilePhoto}}/>}
                        <View style={styles.profileText}>
                            <Text style={styles.username}>{this.state.profileInfo[0].nickname}</Text>
                            <Text style={styles.userIntro}>{this.state.profileInfo[0].introduction}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <Image style={styles.settingsIcon} source={require('../images/settingsIcon.png')}/>
                    </TouchableOpacity>
                </View>}
                {this.state.isLoaded && <View style={styles.levelContainer}>
                    <View style={styles.meterView}>
                        {/* <LinearGradient style={{height: SCREEN_HEIGHT*0.15, width: this.state.barLevel}} colors={['#D439B4', '#FD6708']} start={[0, 1]} end={[1, 0]}/> */}
                        <ProgressCircle
                            percent={this.state.levelPercent}
                            radius={60}
                            borderWidth={8}
                            color='#E64D6A'
                            shadowColor='#999'
                            bgColor='#fff'
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.levelPercent+'%'}</Text>
                        </ProgressCircle>
                    </View>
                    <View style={styles.myLevelContainer}>
                        <View style={styles.myLevelHeader}>
                            <Text style={styles.myLevelFont}>MY LEVEL</Text>
                        </View>
                        <Text style={styles.levelNumber}>{this.state.levelNumber}</Text>  
                    </View> 
                </View>}
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.subHeaderFont}>핑거픽</Text>
                </View>
                <View style={styles.moreInfoContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FAQ')} style={styles.moreInfoButton}>
                        <Text style={styles.moreInfoFont}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactInfo')} style={styles.moreInfoButton}>
                        <Text style={styles.moreInfoFont}>제휴문의</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AgreementInfo')} style={styles.moreInfoButton}>
                        <Text style={styles.moreInfoFont}>회사정보</Text>
                    </TouchableOpacity>
                </View>
                <View elevation={10} style={styles.footerContainer}>
                    <View style={styles.footerIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.push('MainPage')}>
                            <Image style={styles.footerIcons} source={require('../images/homeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Ranking')}>
                            <Image style={styles.rankingIcon} source={require('../images/rankingIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Challenges')}>
                            <Image style={styles.footerIcons} source={require('../images/challengeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Notices')}>
                            <Image style={styles.footerIcons} source={require('../images/noticeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image style={styles.footerIcons} source={require('../images/profileIconSelected.png')}/>
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
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
    },
    headerFont: {
        position: 'relative', 
        color: '#FFF', 
        fontSize: 20, 
        fontWeight: 'bold',
    },
    photoInfoContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    profilePhoto: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'gray'
    },
    userInfoContainer: {
        flexDirection: 'row'
    },
    profileText: {
        marginLeft: 15,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    userIntro: {
        fontSize: 15,
    },
    settingsIcon: {
        height: 30,
        width: 30
    },
    levelContainer: {
        height: SCREEN_HEIGHT*0.25,
        alignSelf: 'stretch',
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 20,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    circleMeter: {
        marginTop: 20,
        marginLeft: 20,
    },
    innerCircle: {
        position: 'absolute',
        height: SCREEN_HEIGHT *0.13,
        width: SCREEN_HEIGHT*0.13,
        borderRadius: SCREEN_HEIGHT*0.13/2,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    myLevelContainer: {
        alignItems: 'center',
        marginLeft: 15
    },
    myLevelHeader: {
        width: 140,
        height: 30,
        borderColor: '#DFDFDF',
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    myLevelFont: {
        fontSize: 15    
    },
    levelNumber: {
        fontSize: 70
    },
    subHeaderContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        marginLeft: 45,
        marginTop: 30
    },
    subHeaderFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    moreInfoContainer: {
        height: SCREEN_HEIGHT*0.2,
        alignSelf: 'stretch',
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 20,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 15
    },
    moreInfoButton: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 10
    },
    moreInfoFont: {
        fontSize: 20,
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

  export default MyInformation;