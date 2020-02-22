import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, RefreshControl, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import CountDown from 'react-native-countdown-component';
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

class Challenges extends React.Component {
    state = {
        allChallengesFocus: true,
        allChallengesUnfocus: false,
        openChallengesFocus: false,
        openChallengesUnfocus: true,
        closedChallengesFocus: false,
        closedChallengesUnfocus: true,
        allChallenges: '',
        openChallenges: [],
        closedChallenges: [],
        currentList: '',
        isLoaded: false,
        refreshing: false
    }

    componentWillMount() {
        this.getChallenges()
     }

    componentDidMount() {
        setInterval(() => {this.getChallenges()}, 600000)
    }
    getChallenges() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/mypage/challenges', {
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
                    allChallenges: [data],
                    allChallengesFocus: true,
                    allChallengesUnfocus: false,
                    openChallengesFocus: false,
                    openChallengesUnfocus: true,
                    closedChallengesFocus: false,
                    closedChallengesUnfocus: true,
                    openChallenges: [],
                    closedChallenges: [],
                })

                this.state.allChallenges[0].challenges.map((item, index) => {
                    if (item['state'] === 'open') {
                        this.state.openChallenges.push(item)
                    }
                    else {
                        this.state.closedChallenges.push(item)
                    }
                })
                this.setState({
                    currentList: this.state.allChallenges[0].challenges,
                    isLoaded: true
                })
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
    
     switchFocus(focus) {
        if (focus==='all') {
            this.setState({
                allChallengesFocus: true,
                allChallengesUnfocus: false,
                openChallengesFocus: false,
                openChallengesUnfocus: true,
                closedChallengesFocus: false,
                closedChallengesUnfocus: true,
                currentList: this.state.allChallenges[0].challenges,
            })
        }
        if (focus==='open') {
            this.setState({
                allChallengesFocus: false,
                allChallengesUnfocus: true,
                openChallengesFocus: true,
                openChallengesUnfocus: false,
                closedChallengesFocus: false,
                closedChallengesUnfocus: true,
                currentList: this.state.openChallenges,
            })
        }
        if (focus==='closed') {
            this.setState({
                allChallengesFocus: false,
                allChallengesUnfocus: true,
                openChallengesFocus: false,
                openChallengesUnfocus: true,
                closedChallengesFocus: true,
                closedChallengesUnfocus: false,
                currentList: this.state.closedChallenges,
            })
        }
    }

    openTimeout(index, state) {
        if (state === 'open') {
            if (!index) {   
                let newOpenChallenges = [...this.state.currentList]
                newOpenChallenges[0].state = 'closed'

                this.setState({
                    currentList: newOpenChallenges
                })          
            }
            else if (index) {     
                let newOpenChallenges = [...this.state.currentList]
                newOpenChallenges[index].state = 'closed'

                this.setState({
                    currentList: newOpenChallenges
                })
            }
        }
        else {
            null
        }
    }

    renderChallenges = (currentList) => {
        return currentList.map((item, index) => { 
            return(
                <View key={item['challege_id']} style={styles.challengeContainer}>
                    <View style={styles.challengePhotoContainer}>
                        <View style={styles.shadowOverlay}/>
                        <Image style={styles.challengePhoto} source={{uri: imgUrl + 'challenges/' + item['background_img_filename']}}/>
                        <View style={styles.timerContainer}>
                            <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                            <CountDown
                                until={item['rest_time']}
                                onFinish={() => this.openTimeout(index, item['state'])}
                                size={10}
                                timeToShow={['D', 'H', 'M', 'S']}
                                showSeparator
                                separatorStyle={{color: '#FFF'}}
                                digitStyle={{backgroundColor: 'none', color: '#FFF'}}
                                digitTxtStyle={{color: '#FFF', marginTop: 10, fontSize: 15}}
                            />
                        </View>
                    </View>
                    <View style={styles.challengeInfoContainer}>
                        <View style={styles.challengeDescriptionContainer}>
                            <Text style={styles.challengeName}>{item['title']}</Text>
                            <Text style={styles.challengeDescription}>{item['subtitle']}</Text>
                        </View>
                        {this.renderButtons(item, index)}
                    </View>
                </View>
            )
        })
    }

    renderButtons(item, index) {
        if (!index) {
            // Alert.alert('NO INDEX')
            if (this.state.currentList[0].state === 'open') {
                return (
                    <View style={styles.challengeButtonContainer}>
                        <View style={styles.leftButtonsContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: true})}>
                                <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtonContainer}>
                            <View style={styles.joinedButton}>
                                <Text style={styles.joinedButtonFont}>참가중</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.challengeButtonContainer}>
                        <View style={styles.leftButtonsContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: false})}>
                                <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtonContainer}>
                            <View style={styles.closedButton}>
                                <Text style={styles.joinedButtonFont}>종료</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        else {
            if (this.state.currentList[index].state === 'open') {
                return (
                    <View style={styles.challengeButtonContainer}>
                        <View style={styles.leftButtonsContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: true})}>
                                <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage')}>
                                <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtonContainer}>
                            <View style={styles.joinedButton}>
                                <Text style={styles.joinedButtonFont}>참가중</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.challengeButtonContainer}>
                        <View style={styles.leftButtonsContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: false})}>
                                <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtonContainer}>
                            <View style={styles.closedButton}>
                                <Text style={styles.joinedButtonFont}>종료</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
    }
    
    _refreshControl() {
        return (
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.getChallenges()} />
        )
    }

    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>나의챌린지</Text>
                </View>
                <View style={styles.buttonsView}>
                    {this.state.allChallengesFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('all')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>전체</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.allChallengesUnfocus &&
                    <TouchableOpacity onPress={()=> this.switchFocus('all')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>전체</Text>
                        </View>
                    </TouchableOpacity> }
                    {this.state.openChallengesFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('open')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>참여중</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.openChallengesUnfocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('open')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>참여중</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.closedChallengesFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('closed')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>종료</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.closedChallengesUnfocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('closed')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>종료</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                <ScrollView contentContainerStyle={styles.noticesContainer} refreshControl={this._refreshControl()}>
                        {this.state.isLoaded && this.renderChallenges(this.state.currentList)}
                </ScrollView>
                <View elevation={10} style={styles.footerContainer}>
                    <View style={styles.footerIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.push('MainPage')}>
                            <Image style={styles.footerIcons} source={require('../images/homeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Ranking')}>
                            <Image style={styles.rankingIcon} source={require('../images/rankingIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Challenges')}>
                            <Image style={styles.footerIcons} source={require('../images/challengeIconSelected.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Notices')}>
                            <Image style={styles.footerIcons} source={require('../images/noticeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Profile')}>
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
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#FFF'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold'
    },
    buttonsView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#FFF'
    },
    viewFocus: {
        width: SCREEN_WIDTH/3,
        borderBottomWidth: 2,
        borderBottomColor: '#D439B4',
        alignItems: 'center',
        paddingBottom: 15
    },
    viewUnfocus: {
        width: SCREEN_WIDTH/3,
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
        width: SCREEN_WIDTH*0.9,
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
    challengesContainer: {
        alignSelf: 'stretch',
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: 10,
        paddingBottom: 30,
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
    backFont: {
        fontSize: 20
    },
    fillerContainer: {
        marginRight: 15,
    },
    challengePhotoContainer: {
        height: 100,
        overflow: 'hidden',
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 130,
        backgroundColor: '#FFFFFF'
    },
    shadowOverlay: {
        height: 100,
        alignSelf: 'stretch',
        opacity: 0.4,
        zIndex: 3       
    },
    challengePhoto: {
        height: 160,
        width: SCREEN_WIDTH,
        marginTop: -120,
        alignSelf: 'center',
        resizeMode: 'cover',        
    },
    timerContainer: {
        position: 'absolute',
        height: 100,
        zIndex: 5,
        top: 100,
        right: 10,
        flexDirection: 'row',
    },
    timerIcon: {
        height: 25,
        width: 20,
        marginRight: 10,
        marginTop: 1
    },
    timerText: {
        color: 'white',
        fontSize: 20
    },
    challengeInfoContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 130,
        backgroundColor: '#FFFFFF'
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
    },
    joinedButton: {
        marginTop: 10,
        borderRadius: 50,
        borderColor: '#D439B4',
        borderWidth: 1,
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closedButton: {
        marginTop: 10,
        borderRadius: 50,
        borderColor: '#AAAAAA',
        borderWidth: 1,
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    joinedButtonFont: {
        color: 'black',
        padding: 10
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

  export default Challenges;