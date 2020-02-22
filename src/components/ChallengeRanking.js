import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'
let tempPhoto;

class ChallengeRanking extends React.Component {

    constructor() {
        super()

        this.state = {
            photos:'',
            incomingRankings: '',
            rankingList: '',
            isLoaded: false,
            rankingUrl: ''
        }
    }  
    componentWillMount() {
        if (this.props.navigation.state.params.open === true) {
            this.setState({
                rankingUrl: 'http://15.164.112.15:4000/challenges/open/'
            })
        }
        else {
            this.setState({
                rankingUrl: 'http://15.164.112.15:4000/challenges/closed/'
            })
        }
    }

    componentDidMount() {
        this.pullRankings()
    }
    
    pullRankings() {
        (async () => {
            const rawResponse = await fetch(this.state.rankingUrl + this.props.navigation.state.params.challengeId + '/ranking', {
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
                    incomingRankings: [data],
                })
                this.setState({
                    rankingList: this.state.incomingRankings[0].ranking,
                    isLoaded: true
                })
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }
    renderPhotos = (rankingList) => {
        return rankingList.map((item, i) => {
            i=i+1
            if(i === 1){
                return (
                <View style={{height: SCREEN_WIDTH*2/3, width: SCREEN_WIDTH*2/3}}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PhotoDetails', {item: item, challengeId: this.props.navigation.state.params.challengeId })}>
                        <ImageBackground style={{ height: SCREEN_WIDTH*2/3, width: SCREEN_WIDTH*2/3, resizeMode: 'cover'}} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + item.photo_filename}}>
                            <ImageBackground style={{ height: 40, width: 60, resizeMode: 'contain', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10}} source={require('../images/goldCrown.png')}>
                                <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold'}}>{item.ranking}</Text>
                            </ImageBackground>
                            <View style={{flexDirection: 'row', position: 'absolute', bottom: 5, left: 5}}>
                                <Image style={{height: 20, width: 20, marginRight: 5}} source={require('../images/voteCountIcon.png')}/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.like_cnt}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
                )
            }
             if (i === 2) {
                tempPhoto = item
            }
            else if (i === 3) {
                return (
                <View style={{height: SCREEN_WIDTH*2/3, width: SCREEN_WIDTH*1/3}}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PhotoDetails', {item: tempPhoto, challengeId: this.props.navigation.state.params.challengeId })}>
                        <ImageBackground style={{ height: SCREEN_WIDTH*1/3, width: SCREEN_WIDTH*1/3, resizeMode: 'cover'}} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + tempPhoto.photo_filename}}>
                            <ImageBackground style={{ height: 25, width: 25, resizeMode: 'contain', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10}} source={require('../images/grayCircle.png')}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{tempPhoto.ranking}</Text>
                            </ImageBackground>
                            <View style={{flexDirection: 'row', position: 'absolute', bottom: 5, left: 5}}>
                                <Image style={{height: 20, width: 20, marginRight: 5}} source={require('../images/voteCountIcon.png')}/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{tempPhoto.like_cnt}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PhotoDetails', {item: item, challengeId: this.props.navigation.state.params.challengeId })}>
                    <ImageBackground style={{ height: SCREEN_WIDTH*1/3, width: SCREEN_WIDTH*1/3, resizeMode: 'cover'}} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + item.photo_filename}}> 
                            <ImageBackground style={{ height: 25, width: 25, resizeMode: 'contain', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10}} source={require('../images/grayCircle.png')}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.ranking}</Text>
                            </ImageBackground>
                            <View style={{flexDirection: 'row', position: 'absolute', bottom: 5, left: 5}}>
                                <Image style={{height: 20, width: 20, marginRight: 5}} source={require('../images/voteCountIcon.png')}/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.like_cnt}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
                )
            }
            else {
                return (
                <View style={{height: SCREEN_WIDTH*1/3, width: SCREEN_WIDTH*1/3}}>  
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PhotoDetails', {item: item, challengeId: this.props.navigation.state.params.challengeId })}>
                        <ImageBackground style={{ height: SCREEN_WIDTH*1/3, width: SCREEN_WIDTH*1/3, resizeMode: 'cover'}} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + item.photo_filename}}>
                            <ImageBackground style={{ height: 25, width: 25, resizeMode: 'contain', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10}} source={require('../images/grayCircle.png')}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.ranking}</Text>
                            </ImageBackground>
                            <View style={{flexDirection: 'row', position: 'absolute', bottom: 5, left: 5}}>
                                <Image style={{height: 20, width: 20, marginRight: 5}} source={require('../images/voteCountIcon.png')}/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.like_cnt}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
                )
            }

        })
    }

    render() {
        return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                {/* <Text style={styles.backFont}>#코카콜라</Text> */}
            </TouchableOpacity>
        </View>
        {/* <ScrollView contentContainerStyle={{ flex: 1, width: SCREEN_WIDTH, paddingBottom: 30, alignSelf: 'stretch', backgroundColor: 'red', flexDirection: 'row', flexWrap: 'wrap'}}> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
            {this.state.isLoaded && this.renderPhotos(this.state.incomingRankings[0].ranking)}
        </ScrollView>
    </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: 100,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backArrowContainer: {
        marginTop: 50,
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
    scrollView: {
        alignSelf: 'stretch',
        width: SCREEN_WIDTH,
        alignSelf: 'center',
        paddingBottom: 30,
        flexDirection: 'row', 
        flexWrap: 'wrap'
    }
})

export default ChallengeRanking;