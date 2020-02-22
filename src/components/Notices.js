import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

class Notices extends React.Component {
    state = {
        challengesFocus: true,
        challengesUnfocus: false,
        announcementsFocus: false,
        announcementsUnfocus: true,
        isLoaded: false,
        challengeNotices: '',
        generalNotices: '',
        currentList: '',
    }

    componentWillMount() {
        this.getChallengeNotices()
        this.getGeneralNotices()
     }
     
    getChallengeNotices() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/notices/challenges', {
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
                    challengeNotices: [data],
                })
                this.setState({
                    challengeNotices: this.state.challengeNotices[0].notices_list,
                    currentList: this.state.challengeNotices[0].notices_list,
                    loading: false,
                    isLoaded: true
                })
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }

    getGeneralNotices() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/notices/all', {
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
                    generalNotices: [data],
                })
                this.setState({
                    generalNotices: this.state.generalNotices[0].notices_list,
                    loading: false,
                    // isLoaded: true
                })
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
    
     switchFocus(focus) {
        if (focus==='challenge') {
            this.setState({
                challengesFocus: true,
                challengesUnfocus: false,
                announcementsFocus: false,
                announcementsUnfocus: true,
                currentList: this.state.challengeNotices,
            })
        }
        else {
            this.setState({
                challengesFocus: false,
                challengesUnfocus: true,
                announcementsFocus: true,
                announcementsUnfocus: false,
                currentList: this.state.generalNotices,
            })
        }
    }

    renderNotices = (currentList) => {
        return currentList.map((item, i) => {   
            if (currentList === this.state.challengeNotices) {
                if (item.category === "vote") {
                    return (
                        <View style={styles.noticeItemView}> 
                            <View style={styles.orangeCircle}>
                                <Text style={styles.challengeExp}>+{item.exp}</Text>
                            </View>
                            <View style={styles.challengeNameContainer}>
                                <Text style={styles.challengeFont}><Text style={{fontWeight: 'bold'}}>{item.title}</Text>에서 투표 {item.count}표를 받았습니다 !</Text>
                            </View>
                            <View style={styles.photoView}> 
                                <Image style={styles.challengePic} source={{uri: imgUrl + 'challenges/' + item['registration_img_filename']}}/>
                            </View>
                        </View>
                    )
                }
                else if (item.category === "alarm") {
                    return (
                        <View style={styles.noticeItemView}> 
                            <View style={styles.pinkCircle}>
                                <Image style={styles.exclamationIcon} source={require('../images/exclamationMark.png')}/>
                            </View>
                            <View style={styles.challengeNameContainer}>
                                <Text style={styles.challengeFont}><Text style={{fontWeight: 'bold'}}>{item.title}</Text>의 게이지가 줄고 있습니다 ! 투표해서 올려보세요 !</Text>
                            </View>
                            <View style={styles.photoView}> 
                            <Image style={styles.challengePic} source={{uri: imgUrl + 'challenges/' + item['registration_img_filename']}}/>
                            </View>
                        </View>
                    )
                }
                else if (item.category === "level") {
                    return (
                        <View style={styles.noticeItemView}> 
                            <View style={styles.pinkCircle}>
                                <Image style={styles.levelIcon} source={require('../images/LEVEL.png')}/>
                            </View>
                            <View style={styles.challengeNameContainer}>
                                <Text style={styles.challengeFont}>축하합니다 ! <Text style={{fontWeight: 'bold'}}>LEVEL{item.level}</Text>가 되었습니다! 투표수가 늘어났습니다.</Text>
                            </View>
                        </View>
                    )
                }
                else if (item.category === "challenge") {
                    return (
                        <View style={styles.noticeItemView}> 
                            <View style={styles.orangeCircle}>
                                <Image style={styles.fingpikIcon} source={require('../images/FINGPIK.png')}/>
                            </View>
                            <View style={styles.challengeNameContainer}>
                                <Text style={styles.challengeFont}><Text style={{fontWeight: 'bold'}}>{item.title}</Text>가 업데이트 되었습니다. 도전하여 상금의 기회를 노려보세요 !</Text>
                            </View>
                        </View>
                    )
                }
                else return null
            }
            else {
                return (
                <View style={styles.noticeItemView}> 
                    <View style={styles.challengeNameContainer}>
                        <Text style={styles.announcementFont}>{item.title}</Text>
                        <Text style={styles.announcementDescriptionFont}>{item.content}</Text>
                    </View>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Announcement')}>
                        <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                    </TouchableOpacity>
                </View>
                )
            }
        })
    }
    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>알림</Text>
                </View>
                <View style={styles.buttonsView}>
                    {this.state.challengesFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('challenge')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>챌린지</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.challengesUnfocus &&
                    <TouchableOpacity onPress={()=> this.switchFocus('challenge')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>챌린지</Text>
                        </View>
                    </TouchableOpacity> }
                    {this.state.announcementsFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('announcement')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>공지사항</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.announcementsUnfocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('announcement')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>공지사항</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                <ScrollView contentContainerStyle={styles.noticesContainer}>
                        {this.state.isLoaded && this.renderNotices(this.state.currentList)}
                </ScrollView>
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notices')}>
                            <Image style={styles.footerIcons} source={require('../images/noticeIconSelected.png')}/>
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
      backgroundColor: '#fff',
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
    orangeCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF6900',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinkCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#D439B4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    challengeExp: {
        alignSelf: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: '500',
        color: '#FF6900',
        marginLeft: -3
    },
    exclamationIcon: {
        alignSelf: 'center',
        height: 35,
        width: 8,
        marginTop: 5
    },
    levelIcon: {
        alignSelf: 'center',
        height: 12,
        width: 43,
        marginTop: 2
    },
    fingpikIcon: {
        alignSelf: 'center',
        height: 30,
        width: 33,
        marginTop: 5
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

  export default Notices;