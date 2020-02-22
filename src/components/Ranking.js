import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, RefreshControl, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/profiles/'
  
class Ranking extends React.Component {
    state = {
        weeklyRankingFocus: true,
        weeklyRankingUnfocus: false,
        overallRankingFocus: false,
        overallRankingUnfocus: true,
        voteCounterFocus: true, 
        voteCounterUnfocus: false,
        challengesCounterFocus: false,
        challengesCounterUnfocus: true,
        recentLikesLoaded: false,
        recentParticipationLoaded: false,
        totalLikesLoaded: false,
        totalParticipationLoaded: false,
        recentLikes: '',
        recentParticipation: '',
        totalLikes: '',
        totalParticipation: '',
        currentList: '',
        myCurrentList: '',
        countingMethod: '표',
        refreshing: false  
    }

    
    componentWillMount() {
       this.getRankings()
    }
    getRankings() {
        this.setState({
            recentLikesLoaded: false,
            recentParticipationLoaded: false,
            totalLikesLoaded: false,
            totalParticipationLoaded: false,
        })
        this.getRecentLikes()
        this.getRecentParticipation()
        this.getLikes()
        this.getParticipation()
    }

    componentDidMount() {
        setInterval(() => {this.getRankings()}, 600000)
    }
    getRecentLikes() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ranking/recentLikes', {
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
                    recentLikes: [data],
                    recentLikesLoaded: false
                })
                this.setState({
                    currentList: this.state.recentLikes[0].recent_like_ranking,
                    myCurrentList: this.state.recentLikes[0].my_ranking,
                    recentLikesLoaded: true
                })
                // Alert.alert(this.state.recentLikes[0].my_ranking)
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }

    getRecentParticipation() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ranking/recentParticipations', {
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
                    recentParticipation: [data],
                })
                this.setState({
                    recentParticipationLoaded: true
                })

                // Alert.alert(this.state.recentParticipation[0].recent_participation_ranking[0].nickname)
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }

    getLikes() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ranking/likes', {
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
                    totalLikes: [data],
                    totalLikesLoaded: true

                })
                // Alert.alert(this.state.totalLikes)
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }

    getParticipation() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ranking/participations', {
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
                    totalParticipation: [data],
                    totalParticipationLoaded: true

                })
                // Alert.alert(this.state.totalParticipation)
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }

    switchFocus(focus) {
        if (focus==='week') {
            this.setState({
                weeklyRankingFocus: true,
                weeklyRankingUnfocus: false,
                overallRankingFocus: false,
                overallRankingUnfocus: true,
            })
            if (this.state.voteCounterFocus === true) {
                this.setState({
                    currentList: this.state.recentLikes[0].recent_like_ranking,
                    myCurrentList: this.state.recentLikes[0].my_ranking,
                    countingMethod: '표'
                })
            }
            else {
                this.setState({
                    currentList: this.state.recentParticipation[0].recent_participation_ranking,
                    myCurrentList: this.state.recentParticipation[0].my_ranking,
                    countingMethod: '회'
                })
            }
        }
        else {
            this.setState({
                weeklyRankingFocus: false,
                weeklyRankingUnfocus: true,
                overallRankingFocus: true,
                overallRankingUnfocus: false,
            })
            if (this.state.voteCounterFocus === true) {
                this.setState({
                    currentList: this.state.totalLikes[0].like_ranking,
                    myCurrentList: this.state.totalLikes[0].my_ranking,
                    countingMethod: '표'
                })
            }
            else {
                this.setState({
                    currentList: this.state.totalParticipation[0].participation_ranking,
                    myCurrentList: this.state.totalParticipation[0].my_ranking,
                    countingMethod: '회'
                })
            }
        }
    }

    switchCounterFocus(focus) {
        if (focus ==='votes') {
            this.setState({
                voteCounterFocus: true, 
                voteCounterUnfocus: false,
                challengesCounterFocus: false,
                challengesCounterUnfocus: true,
            })
            if (this.state.weeklyRankingFocus === true ) {
                this.setState({
                    currentList: this.state.recentLikes[0].recent_like_ranking,
                    myCurrentList: this.state.recentLikes[0].my_ranking,
                    countingMethod: '표'
                })
            }
            else {
                this.setState({
                    currentList: this.state.totalLikes[0].like_ranking,
                    myCurrentList: this.state.totalLikes[0].my_ranking,
                    countingMethod: '표'
                })
            }
        }
        else {
            this.setState({
                voteCounterFocus: false, 
                voteCounterUnfocus: true,
                challengesCounterFocus: true,
                challengesCounterUnfocus: false,
            })
            if (this.state.overallRankingFocus === true) {
                this.setState({
                    currentList: this.state.totalParticipation[0].participation_ranking,
                    myCurrentList: this.state.totalParticipation[0].my_ranking,
                    countingMethod: '회'
                })
            }
            else {
                this.setState({
                    currentList: this.state.recentParticipation[0].recent_participation_ranking,
                    myCurrentList: this.state.recentParticipation[0].my_ranking,
                    countingMethod: '회'
                })
            }
        }
    }

    renderRankings = (currentList) => {
        return currentList.map((item, i) => {
            if (item.ranking === 1){
                return (
                <View style={styles.rankItemView}> 
                    <View style={styles.profilePicViewTop}> 
                        <Image style={styles.profilePic} source={{uri: imgUrl + item.profile_img_filename}}/>
                    </View>
                    <Image style={styles.photoMedal} source={require('../images/goldRibbon.png')}/>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFontTop}>{item.nickname}</Text>
                        <Text style={styles.introFontTop}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFontTop}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            if (item.ranking === 2){
                return (
                <View style={styles.rankItemView}> 
                    <View style={styles.profilePicViewTop}> 
                        <Image style={styles.profilePic} source={{uri: imgUrl + item.profile_img_filename}}/>
                    </View>
                    <Image style={styles.photoMedal} source={require('../images/silverRibbon.png')}/>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFontTop}>{item.nickname}</Text>
                        <Text style={styles.introFontTop}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFontTop}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            if (item.ranking === 3){
                return (
                <View style={styles.rankItemView}> 
                    <View style={styles.profilePicViewTop}> 
                        <Image style={styles.profilePic} source={{uri: imgUrl + item.profile_img_filename}}/>
                    </View>
                    <Image style={styles.photoMedal} source={require('../images/bronzeRibbon.png')}/>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFontTop}>{item.nickname}</Text>
                        <Text style={styles.introFontTop}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFontTop}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            else {
                return (
                <View style={styles.rankItemView}>
                    <View style={{flexDirection: 'row', marginRight: -60}}>
                        <Text style={styles.rankingNumber}>{item.ranking}</Text> 
                        <View style={styles.profilePicView}> 
                            <Image style={styles.profilePic} source={{uri: imgUrl + item.profile_img_filename}}/>
                        </View>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFont}>{item.nickname}</Text>
                        <Text style={styles.introFont}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFont}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
        })
    }

    renderMyRankings = (currentList) => {
        return currentList.map((item, i) => {
            // i=i+1
            if (item.ranking === 1){
                return (
                <View style={styles.myRankItemView}>
                    <View style={{flexDirection: 'row', marginRight: -60}}>
                        <Text style={styles.rankingNumber}>{item.ranking}</Text> 
                        <View style={styles.profilePicView}> 
                            <Image style={styles.profilePic} source={{uri: imgUrl + item.profile_img_filename + '?date=' + (new Date()).getTime()}}/>
                        </View>
                        <Image style={styles.myPhotoMedal} source={require('../images/goldRibbon.png')}/>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFont}>{item.nickname}</Text>
                        <Text style={styles.introFont}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFont}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            if (item.ranking === 2){
                return (
                <View style={styles.myRankItemView}>
                    <View style={{flexDirection: 'row', marginRight: -60}}>
                        <Text style={styles.rankingNumber}>{item.ranking}</Text> 
                        <View style={styles.profilePicView}> 
                            <Image style={styles.profilePic} source={item.uri}/>
                        </View>
                        <Image style={styles.myPhotoMedal} source={require('../images/silverRibbon.png')}/>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFont}>{item.nickname}</Text>
                        <Text style={styles.introFont}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFont}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            if (item.ranking === 3){
                return (
                <View style={styles.myRankItemView}>
                    <View style={{flexDirection: 'row', marginRight: -60}}>
                        <Text style={styles.rankingNumber}>{item.ranking}</Text> 
                        <View style={styles.profilePicView}> 
                            <Image style={styles.profilePic} source={item.uri}/>
                        </View>
                        <Image style={styles.myPhotoMedal} source={require('../images/bronzeRibbon.png')}/>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFont}>{item.nickname}</Text>
                        <Text style={styles.introFont}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFont}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
            else {
                return (
                <View style={styles.myRankItemView}>
                    <View style={{flexDirection: 'row', marginRight: -60}}>
                        <Text style={styles.rankingNumber}>{item.ranking}</Text> 
                        <View style={styles.profilePicView}> 
                            <Image style={styles.profilePic} source={item.uri}/>
                        </View>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameFont}>{item.nickname}</Text>
                        <Text style={styles.introFont}>{item.introduction}</Text>
                    </View>
                    <Text style={styles.volumeFont}>{item.count}{this.state.countingMethod}</Text>
                </View>
                )
            }
        })
    }

    _refreshControl() {
        return (
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.getRankings()} />
        )
    }

    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>랭킹</Text>
                </View>
                <View style={styles.buttonsView}>
                    {this.state.weeklyRankingFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('week')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>주간랭킹</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.weeklyRankingUnfocus &&
                    <TouchableOpacity onPress={()=> this.switchFocus('week')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>주간랭킹</Text>
                        </View>
                    </TouchableOpacity> }
                    {this.state.overallRankingFocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('all')}>
                        <View style={styles.viewFocus}>
                            <Text style={styles.fontFocus}>전체랭킹</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.overallRankingUnfocus && 
                    <TouchableOpacity onPress={()=> this.switchFocus('all')}>
                        <View style={styles.viewUnfocus}>
                            <Text style={styles.fontUnfocus}>전체랭킹</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                <View style={styles.counterButtonView}>
                {this.state.voteCounterFocus && 
                    <TouchableOpacity onPress={()=> this.switchCounterFocus('votes')}>
                        <View style={styles.counterFocus}>
                            <Text style={styles.counterFontFocus}>투표상</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.voteCounterUnfocus &&
                    <TouchableOpacity onPress={()=> this.switchCounterFocus('votes')}>
                        <View style={styles.counterUnfocus}>
                            <Text style={styles.counterFontUnfocus}>투표상</Text>
                        </View>
                    </TouchableOpacity> }
                    {this.state.challengesCounterFocus && 
                    <TouchableOpacity onPress={()=> this.switchCounterFocus('challenges')}>
                        <View style={styles.counterFocus}>
                            <Text style={styles.counterFontFocus}>노력상</Text>
                        </View>
                    </TouchableOpacity>}
                    {this.state.challengesCounterUnfocus && 
                    <TouchableOpacity onPress={()=> this.switchCounterFocus('challenges')}>
                        <View style={styles.counterUnfocus}>
                            <Text style={styles.counterFontUnfocus}>노력상</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                <ScrollView contentContainerStyle={styles.rankingContainer} refreshControl={this._refreshControl()}>
                        {this.state.recentLikesLoaded && this.renderRankings(this.state.currentList)}
                </ScrollView>
                <View style={{alignSelf: 'stretch'}}>
                        {this.state.recentLikesLoaded && this.renderMyRankings(this.state.myCurrentList)}
                </View>
                <View elevation={10} style={styles.footerContainer}>
                    <View style={styles.footerIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.push('MainPage')}>
                            <Image style={styles.footerIcons} source={require('../images/homeIcon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Ranking')}>
                            <Image style={styles.rankingIcon} source={require('../images/rankingIconSelected.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Challenges')}>
                            <Image style={styles.footerIcons} source={require('../images/challengeIcon.png')}/>
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
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#9139D4',
        backgroundColor: '#9139D4'
    },
    headerFont: {
        position: 'relative', 
        color: '#FFF', 
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
        borderBottomColor: '#9139D4',
        alignItems: 'center',
        paddingBottom: 15
    },
    viewUnfocus: {
        width: SCREEN_WIDTH/2,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#9139D4',
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
    counterButtonView: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 15,
        marginTop: 5
    },
    counterFocus: {
        alignItems: 'center',
        paddingBottom: 5,
        padding: 5
    },
    counterUnfocus: {
        alignItems: 'center',
        paddingBottom: 5,
        opacity: 0.7,
        padding: 5
    },
    counterFontFocus: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    counterFontUnfocus:{
        fontSize: 15,
    },
    rankingContainer: {
        alignSelf: 'stretch',
        alignSelf: 'center',
        backgroundColor: '#F6F6F6',
        width: SCREEN_WIDTH,
        marginTop: 10,
        paddingBottom: SCREEN_HEIGHT*0.25,
    },
    rankItemView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    myRankItemView: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: SCREEN_HEIGHT*0.1,
        padding: 15,
        backgroundColor: '#FFF'
    },
    profilePicViewTop: {
        backgroundColor: '#AAAAAA',
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: -20
    },
    profilePicView: {
        backgroundColor: '#AAAAAA',
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profilePic: {
        flex:1 , 
        height: undefined,
        width: undefined
    },
    photoMedal: {
        height: 30,
        width: 20,
        position: 'absolute',
        top: 10,
        left: 3,
    },
    myPhotoMedal: {
        height: 30,
        width: 20,
        position: 'absolute',
        left: 10,
    },
    rankingNumber: {
        color: '#707070',
        fontSize: 20,
        alignSelf: 'center',
        marginRight: 10,
    },
    usernameContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    usernameFontTop: {
        color: '#707070',
        fontSize: 14,
        marginLeft: -85,

    },
    introFontTop: {
        color: '#707070',
        fontSize: 14,
        marginLeft: -85,
    },
    volumeFontTop: {
        color: 'black',
        fontSize: 14,
        alignSelf: 'center'
    },
    usernameFont: {
        color: '#707070',
        fontSize: 12,
        marginLeft: -65,
    },
    introFont: {
        color: '#707070',
        fontSize: 12,
        marginLeft: -65,
    },
    volumeFont: {
        color: 'black',
        fontSize: 12,
        alignSelf: 'center'
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

  export default Ranking;