import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-anchor-carousel';
const arrayMove = require('array-move');
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'


class MyChallenges extends React.Component {
    state = {
        incomingPhoto: '',
        incomingData: '',
        myChallenges: '',
        isLoaded: false
    }
    
    componentWillMount() {
        // Alert.alert(this.props.navigation.state.params.challengeId)
        if (this.props.navigation.state.params.chosenPhoto !== undefined) {
            this.setState({
                incomingPhoto: this.props.navigation.state.params.chosenPhoto
            })
        }
        this.getMyChallenges()
    }

    getMyChallenges() {
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
                    incomingData: [data],
                })
                let test = this.state.incomingData[0].challenges;
                
                let oldIndex;
                test.map((item, index) => { 
                    if(item.challenge_id === this.props.navigation.state.params.challengeId) {

                        oldIndex = index
                    }
                })
                function array_move(arr, old_index, new_index) {
                    if (new_index >= arr.length) {
                        var k = new_index - arr.length + 1;
                        while (k--) {
                            arr.push(undefined);
                        }
                    }
                    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                };
                array_move(test, oldIndex, 0 )
                this.setState({
                    myChallenges: this.state.incomingData[0].challenges,
                    isLoaded: true
                })               
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }

    renderMyChallenges = ({item, index}) => {
        if (item['state'] === 'open') {
            item['open'] = true
        }
        else { item['open'] = false }
        return (
            <View>
                <View style={styles.challengeHeader}>
                    <Text style={styles.challengeName}>{item.title}</Text>
                    <Text style={styles.challengeDescription}>{item.subtitle}</Text>
                </View>
                <View style={styles.myChallengePhotoView}>
                    <TouchableOpacity onPress={() => this._carousel.scrollToIndex(index-1)}>
                        <Image style={styles.scrollBack} source={require('../images/scrollBack.png')}/>
                    </TouchableOpacity>
                    <Image style={styles.myChallengePhoto} 
                        source={{uri: imgUrl + 'registrations/' + item.challenge_id + '/' + item.registration_img_filename}}
                    />
                    <TouchableOpacity onPress={() => this._carousel.scrollToIndex(index+1)}>
                        <Image style={styles.scrollForward} source={require('../images/scrollForward.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.voteContainer}>
                    <View style={styles.myVotesContainer}>
                        <Text style={styles.myVotesFont}>나의 투표수</Text>
                        <Text style={styles.myVotes}>{item.count}</Text>
                    </View>
                    <View style={styles.myRankingContainer} >
                        <Text style={styles.myVotesFont}>나의 등수</Text>
                        <Text style={styles.myVotes}>{item.ranking}</Text>
                    </View>
                </View>
                <View style={{ height: 100, alignSelf: 'stretch', bottom: 20, marginTop: 100 }}>
                    <View style={styles.faceContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: item['open']})}>
                            <Image style={styles.largeIcons} source={require('../images/rankingIconLarge.png')}/>
                        </TouchableOpacity>
                        {item['open'] && <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage', {challengeId: item['challenge_id']})}>
                            <Image style={styles.largeIcons} source={require('../images/voteIconLarge.png')}/>
                        </TouchableOpacity>}
                    </View>
                    {item['open'] && <View style={styles.voteBarContainer}>
                    <LinearGradient style={{height: 16, width: item.gage/100*SCREEN_WIDTH}} colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]}/>
                    </View>}
                </View>
            </View>
        )
    }

    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>참여중</Text>
                    <View style={styles.fillerContainer}/>
                </View>
                {/*PHOTO HERE*/}
                {this.state.isLoaded && 
                    <Carousel style={styles.carousel}
                    data={this.state.myChallenges}
                    renderItem={this.renderMyChallenges}
                    itemWidth={SCREEN_WIDTH}
                    containerWidth={SCREEN_WIDTH} 
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      height: SCREEN_HEIGHT
    },
    headerContainter: {
        backgroundColor: '#FFF',
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 25, 
    },
    challengeContainer: {
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
    challengeHeader: {
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    challengeName: {
        fontSize: 20,
        marginTop: 10,
    },
    challengeDescription: {
        marginTop: 10,
    },
    myChallengePhotoView: {
        height: SCREEN_HEIGHT - 450, 
        width: SCREEN_WIDTH, 
        marginTop: 10, 
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    myChallengePhoto: {
        flex: 1, 
        height: SCREEN_HEIGHT - 450, 
        width: SCREEN_WIDTH-50, 
        resizeMode: 'contain', 
        borderRadius: 20,
    },
    scrollBack: {
        height: 120,
        width: 40
    },
    scrollForward: {
        height: 120,
        width: 40
    },
    voteContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    myVotesContainer: {
        width: SCREEN_WIDTH/2-60,
        alignItems: 'center',
    },
    myRankingContainer: {
        width: SCREEN_WIDTH/2-40,
        alignItems: 'center',
        borderLeftColor: '#707070',
        borderLeftWidth: 1,
    },
    myVotesFont: {
        fontSize: 20,
        color: '#555555',
        alignSelf: 'center'
    },
    myVotes: {
        marginTop: 20,
        fontSize: 20,
        color: '#FF6900'
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
    faceContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginTop: -50,
        marginLeft: 50, 
        marginRight: 50
    },
    largeIcons: {
        height: 60,
        width: 60
    },
    voteBarContainer: {
        alignSelf: 'stretch',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#DBDBDB',
        height: 16,
        borderRadius: 50,
        marginTop: 30,
        overflow: 'hidden'
    },
    
  });

  export default MyChallenges;