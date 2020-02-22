import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';

class FooterNav extends React.Component {
    state = {
        
    }

    render(){
        return( 
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.headerContainter}>
                        <View style={styles.headerImageContainer}>
                            <Image style={styles.headerText} source={require('../images/challengeHeader.png')}/>
                            <TouchableOpacity>
                                <Image style={styles.infoButton} source={require('../images/infoButton.png')}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerSubText}>내앨범 속 사진이 돈이 되는 곳</Text>
                    </View>
                    <View style={styles.hotTimeContainer}>
                        <Text style={styles.hotTimeFont}>HOT TIME</Text>
                    </View>
                    <View style={styles.challengeContainer}>
                        <View style={styles.challengePhotoContainer}>
                            <View style={styles.shadowOverlay}/>
                            <Image style={styles.challengePhoto} source={require('../images/challengePhotoOne.png')}/>
                            <View style={styles.timerContainer}>
                                <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                                <Text style={styles.timerText}>00:59:30</Text>
                            </View>
                        </View>
                        <View style={styles.challengeInfoContainer}>
                            <View style={styles.challengeDescriptionContainer}>
                                <Text style={styles.challengeName}>#오늘의 점심</Text>
                                <Text style={styles.challengeDescription}>지금 당장 점심의 사진을 찍어 핑픽!</Text>
                            </View>
                            <View style={styles.challengeButtonContainer}>
                                <View style={styles.leftButtonsContainer}>
                                    <TouchableOpacity>
                                        <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage')}>
                                        <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rightButtonContainer}>
                                    <TouchableOpacity style={styles.joinButton}>
                                        <Text style={styles.joinButtonFont}>참가하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.challengeContainer}>
                        <View style={styles.challengePhotoContainer}>
                            <View style={styles.shadowOverlay}/>
                            <Image style={styles.challengePhoto} source={require('../images/challengePhotoTwo.png')}/>
                            <View style={styles.timerContainer}>
                                <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                                <Text style={styles.timerText}>00:58:15</Text>
                            </View>
                        </View>
                        <View style={styles.challengeInfoContainer}>
                            <View style={styles.challengeDescriptionContainer}>
                                <Text style={styles.challengeName}>#우리집강아지</Text>
                                <Text style={styles.challengeDescription}>우리집 강아지를 찍어 자랑해보세요!</Text>
                            </View>
                            <View style={styles.challengeButtonContainer}>
                                <View style={styles.leftButtonsContainer}>
                                    <TouchableOpacity>
                                        <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage')}>
                                        <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rightButtonContainer}>
                                    <TouchableOpacity style={styles.joinButton}>
                                        <Text style={styles.joinButtonFont}>참가하기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        marginTop: 100,
        alignSelf: 'stretch',
        marginRight: 30,
        marginLeft: 30,
        alignItems: 'flex-start',
    },
    headerImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch'
    },
    headerText: {
        height: 40,
        width: 200,
        marginBottom: 10
    },
    headerSubText: {
        fontSize: 20
    },
    infoButton: {
        height: 40,
        width: 40
    },
    hotTimeContainer: {
        marginTop: 30
    },
    hotTimeFont: {
        fontSize: 20,
        color: '#323232'
    },
    challengeContainer: {
        backgroundColor: '#FFFFFF',
        position: 'relative',
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,        
    },
    challengePhotoContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 100,
        overflow: 'hidden',
        alignItems: 'center',
    },
    shadowOverlay: {
        height: 100,
        backgroundColor: '#000000',
        alignSelf: 'stretch',
        opacity: 0.4,
        zIndex: 3
    },
    challengePhoto: {
        height: 160,
        width: 330,
        marginTop: -120,
    },
    timerContainer: {
        position: 'absolute',
        height: 100,
        zIndex: 5,
        top: 70,
        right: 10,
        flexDirection: 'row',
    },
    timerIcon: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    timerText: {
        color: 'white',
        fontSize: 20
    },
    challengeInfoContainer: {
        borderColor: '#AAAAAA',
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 130
    },
    challengeName: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
    },
    challengeDescription: {
        marginTop: 10,
        marginLeft: 20
    },
    challengeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15, 
        marginRight: 15
    },
    leftButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    rankingIconSmall: {
        height: 30,
        width: 30,
    },
    voteIconSmall: {
        height: 30,
        width: 30,
        marginLeft: 20
    },
    rightButtonContainer: {
        justifyContent: 'center'
    },
    joinButton: {
        marginTop: 10,
        borderRadius: 50,
        backgroundColor: '#D439B4',
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    joinButtonFont: {
        color: '#FFFFFF',
        padding: 10
    }
    
  });

  export default FooterNav;