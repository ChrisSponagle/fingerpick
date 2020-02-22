import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, AsyncStorage, TouchableOpacity, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'

class VotePage extends React.Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
        photos: '',
        currentIndex: 0,
        firstLaunch: false,
        reportView: false,
        adult: false,
        unsuitable: false,
        barLevel: 0,
        challenges: '',
        loading: true,
        isLoaded: false,
        moved: false,
        pressed: false,
        currentPhoto: '',
        voteArray: [],
        empty: false
        }

        this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
        transform: [{
            rotate: this.rotate,
        },
        ...this.position.getTranslateTransform()
        ]
        }

        this.likeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
        })

        this.dislikeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
        })

    }

    componentWillMount() {
        this.getChallengesPhotos()
        this.panResponder()
    }

    getChallengesPhotos() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/challenges/open/'+this.props.navigation.state.params.challengeId, {
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
                    challenges: [data],
                })
                // Alert.alert(this.state.challenges)
                this.setState({
                    photos: this.state.challenges[0].vote_list,
                    loading: false,
                    isLoaded: true,
                    barLevel: this.state.challenges[0].gage,
                })
                if(this.state.photos.length === 0) {this.setState({empty: true})}
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
   
    sendVotes() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/challenges/open/' + this.props.navigation.state.params.challengeId + '/votes', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({vote_list: this.state.voteArray})
            });
            
            const content = await rawResponse;  
          
            if (content.status === 200) {
                console.log('VOTED')
            }
          })()
          .catch(error=>Alert.alert(error.message)) 
    }
    swipeRight() {
        if (!this.state.challenges[0].vote_list[this.state.currentIndex]) {return null}
        else {
            this.state.voteArray.push({registration_id: this.state.challenges[0].vote_list[this.state.currentIndex].registration_id, vote_flag: 1, user_id: this.state.challenges[0].vote_list[this.state.currentIndex].user_id})
            if (this.state.currentIndex === 4) {
                // Alert.alert(this.state.voteArray)
                this.setState({
                    photos: '',
                    currentIndex: -1,
                    firstLaunch: false,
                    reportView: false,
                    adult: false,
                    unsuitable: false,
                    barLevel: 10,
                    challenges: '',
                    loading: true,
                    isLoaded: false,
                    moved: false,
                    pressed: false,
                    currentPhoto: '',
                    voteArray: [],
                })
                this.sendVotes()
                this.getChallengesPhotos()
            }
            Animated.spring(this.position, {
                toValue: { x: SCREEN_WIDTH + 100, y: 0 },
                speed: 100
            }).start(() => {
                if(this.state.barLevel < SCREEN_WIDTH-25) {
                    this.setState({ currentIndex: this.state.currentIndex + 1, 
                                    barLevel: this.state.barLevel+5 }, () => {
                    this.position.setValue({ x: 0, y: 0 })
                    })
                    // Alert.alert('RIGHT')
                }
            
            })
        }
    }

    swipeLeft() {
        if (!this.state.challenges[0].vote_list[this.state.currentIndex]) {return null}
        else {
        this.state.voteArray.push({registration_id: this.state.challenges[0].vote_list[this.state.currentIndex].registration_id, vote_flag: 0, user_id: this.state.challenges[0].vote_list[this.state.currentIndex].user_id})
            if (this.state.currentIndex === 4) {
                // Alert.alert(this.state.voteArray)
                this.setState({
                    photos: '',
                    currentIndex: -1,
                    firstLaunch: false,
                    reportView: false,
                    adult: false,
                    unsuitable: false,
                    barLevel: 10,
                    challenges: '',
                    loading: true,
                    isLoaded: false,
                    moved: false,
                    pressed: false,
                    currentPhoto: '',
                    voteArray: []
                })
                this.sendVotes()
                this.getChallengesPhotos()
            }
            Animated.spring(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: 0},
                speed: 100
            }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
                })
                // Alert.alert('LEFT')
            })  
        }
    }

    backButton() {
        if (this.state.voteArray.length > 0) {
            //call api//
            this.sendVotes()
        }
        this.props.navigation.goBack(null)
    }

    timeout() {
        if (this.state.voteArray.length > 0) {
            //call api//
            this.setState({
                photos: '',
                currentIndex: 0,
                firstLaunch: false,
                reportView: false,
                adult: false,
                unsuitable: false,
                barLevel: 10,
                challenges: '',
                loading: true,
                isLoaded: false,
                moved: false,
                pressed: false,
                currentPhoto: '',
                voteArray: []
            })
            this.sendVotes()
            this.getChallengesPhotos()  
        }
    }

    panResponder(photos) {
        this.PanResponder = PanResponder.create({

        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (e, gestureState) => {
            this.setState({
                pressed: true
            })

            setTimeout(() => {
                if (this.state.pressed === true && this.state.moved === false) {
                    this.props.navigation.navigate('PhotoDetails', {item: this.state.challenges[0].vote_list[this.state.currentIndex], challengeId: this.props.navigation.state.params.challengeId })
            }
              }, 1000);
            
          },
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dx > 1 || gestureState.dx < -1 && gestureState.dy > 1 || gestureState.dy < -1){
                this.setState({
                    moved: true
                })
                // Alert.alert('MOVED')
            }
            this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (evt, gestureState) => {
            this.setState({
                pressed: false
            })
            if (gestureState.dx > 120) {
                    this.state.voteArray.push({registration_id: this.state.challenges[0].vote_list[this.state.currentIndex].registration_id, vote_flag: 1, user_id: this.state.challenges[0].vote_list[this.state.currentIndex].user_id})
                    if (this.state.currentIndex === 4) {
                        // Alert.alert(this.state.voteArray)
                        this.setState({
                            photos: '',
                            currentIndex: -1,
                            firstLaunch: false,
                            reportView: false,
                            adult: false,
                            unsuitable: false,
                            barLevel: 10,
                            challenges: '',
                            loading: true,
                            isLoaded: false,
                            moved: false,
                            pressed: false,
                            currentPhoto: '',
                            voteArray: []
                        })
                        this.sendVotes()
                        this.getChallengesPhotos()
                    }
            Animated.spring(this.position, {
                toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                speed: 100
            }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1,
                                barLevel: this.state.barLevel+5 }, () => {
                this.position.setValue({ x: 0, y: 0 })
                // Alert.alert('RIGHT')
                })
                
            })
            }
            else if (gestureState.dx < -120) {
                    this.state.voteArray.push({registration_id: this.state.challenges[0].vote_list[this.state.currentIndex].registration_id, vote_flag: 0, user_id: this.state.challenges[0].vote_list[this.state.currentIndex].user_id})
                if (this.state.currentIndex === 4) {
                    // Alert.alert(this.state.voteArray)
                    this.setState({
                        photos: '',
                        currentIndex: -1,
                        firstLaunch: false,
                        reportView: false,
                        adult: false,
                        unsuitable: false,
                        barLevel: 10,
                        challenges: '',
                        loading: true,
                        isLoaded: false,
                        moved: false,
                        pressed: false,
                        currentPhoto: '',
                        voteArray: []
                    })
                    this.sendVotes()
                    this.getChallengesPhotos()
                }
            Animated.spring(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                speed: 100
            }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
                // Alert.alert('LEFT')
                })
            })
                
            }
            else {

                if (this.state.moved === true) {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        speed: 100,
                    }).start()
                    this.setState({
                        moved: false
                    })
                }
            }
        }
        })
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
        try {
            await AsyncStorage.setItem('alreadyLaunched', 'true');
            this.setState({firstLaunch: true});
          } catch (error) {
              Alert.alert(error)
          }
        }
        else {
            this.setState({firstLaunch: false});
        }
        setInterval(() => {this.timeout()}, 600000)

        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            this.backButton() 
            return true;
        });
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(null);
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }


    renderPhotos = () => {
        return this.state.photos.map((item, i) => {

        if (i < this.state.currentIndex) {
            return null
        }
        else if (i == this.state.currentIndex) {

            return (
            <Animated.View
                {...this.PanResponder.panHandlers}
                key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 250, width: SCREEN_WIDTH, marginTop: 10, padding: 10, position: 'absolute' }]}>
                <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                    <Image style={{height: 110, width: 80}} source={require('../images/yesVote.png')}/>
                </Animated.View>
                <Animated.View style={{ opacity: this.dislikeOpacity, position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                    <Image style={{height: 110, width: 80}} source={require('../images/noVote.png')}/>
                </Animated.View>
                {this.state.isLoaded && <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + item.photo_filename}} />}
            </Animated.View>
            )
        }
        else {
            return (
            <Animated.View
                key={item.id} style={[{
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 250, width: SCREEN_WIDTH, marginTop: 10, padding: 10, position: 'absolute'
                }]}>
                <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                </Animated.View>
                <Animated.View style={{ opacity: 0, position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                </Animated.View>
                {this.state.isLoaded && <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + item.photo_filename}} />}
            </Animated.View>
            )
        }
        }).reverse()
    }

    report() {
        this.setState({
            reportView: true
        })
    }
    closeReport() {
        this.setState({
            reportView: false
        })
    }


    render() {
        return (
        <View style={styles.container}>
            {/* First Time Overlay to explain voting system */}
            <Modal transparent={true} backdropColor={'black'} backdropOpacity= {0.3} animationType={'slide'} isVisible={this.state.firstLaunch}>
                <View style={styles.firstLaunchContainer}/>
                    <View style={styles.closeInstructionsContainer}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', zIndex: 2003}} onPress={() => this.setState({firstLaunch: false})}>
                            <Text style={styles.closeInstructions}>다시보지 않기</Text>
                            <Image style={styles.reportHeaderX} source={require('../images/closeInstructions.png')}/>
                        </TouchableOpacity>
                    </View>
                <View style={styles.voteInstructionsContainer}>
                    <Image style={styles.voteInstructions} source={require('../images/voteInstructions.png')}/>
                </View>
            </Modal>  

            {/* Report photo popup */}
            {this.state.reportView &&
            <View style={styles.reportContainer}>
                <View style={styles.reportHeader}>
                    <View style={styles.reportHeaderX}/>
                    <Text style={styles.reportFont}>신고</Text>
                    <TouchableOpacity onPress={() => this.setState({reportView: false})}>
                        <Image style={styles.reportHeaderX} source={require('../images/reportClose.png')}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={ this.state.adult? styles.reportOptionsActive : styles.reportOptions}
                    onPressIn={() => this.setState({adult: !this.state.adult})}
                    onPressOut={() => this.setState({adult: !this.state.adult})}>
                    <Text style={styles.reportFont}>성인물</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ this.state.unsuitable? styles.reportOptionsActive : styles.reportOptions}
                    onPressIn={() => this.setState({unsuitable: !this.state.unsuitable})}
                    onPressOut={() => this.setState({unsuitable: !this.state.unsuitable})}>
                    <Text style={styles.reportFont}>부적합 이미지</Text>
                </TouchableOpacity>
                <View style={{height: 100}}/>
                <View style={styles.reportFooter}>
                    <Text>꾸준한 업데이트 및 앱개선에</Text>
                    <Text>도움이 됩니다</Text>
                </View>
            </View>}

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.backButton()}>
                    <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    {/* <Text style={styles.backFont}>#코카콜라</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({reportView: true})}>
                    <Image style={styles.reportIcon} source={require('../images/reportIcon.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {this.state.loading && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.loadingFont}>로딩</Text> 
                    <ActivityIndicator size='large' color='#E64D6A' />
                </View>}
                {this.state.isLoaded && this.renderPhotos()}
                {this.state.empty && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: '#AAAAAA'}}>투표를 완료하셨습니다</Text>
                        <Text style={{fontSize: 20, color: '#AAAAAA'}}>ㅠㅠ</Text>
                    </View>}
            </View>
            <View style={{ height: 100 }}>
                <View style={styles.faceContainer}>
                    <TouchableOpacity onPress={() => this.swipeLeft()}>
                        <Image style={styles.faces} source={require('../images/sadFace.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.swipeRight()}>
                        <Image style={styles.faces} source={require('../images/smileyFace.png')}/>
                    </TouchableOpacity>
                </View>
                    <View style={styles.voteBarContainer}>
                        <LinearGradient style={{height: 16, width: this.state.barLevel}} colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]}/>
                    </View>
                    <Image style={{height: 30, width: 30, marginLeft: this.state.barLevel, marginTop: -22}}  source={require('../images/upIcon.png')}/>
            </View>
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
    reportIcon: {
        marginTop: 50,
        marginRight: 30,
        height: 15,
        width: 15,
        zIndex: 3,
        padding: 15,
        alignSelf: 'center'

    },
    loadingFont: {
        fontSize: 30, 
        color: '#E64D6A',
        marginBottom: 20
    },
    faceContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginTop: -30
    },
    faces: {
        height: 40,
        width: 40
    },
    voteBarContainer: {
        alignSelf: 'stretch',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#DBDBDB',
        height: 16,
        borderRadius: 50,
        marginTop: 25,
        overflow: 'hidden',
    },
    firstLaunchContainer: {
        backgroundColor: '#000000', 
        opacity: 0.6, 
        alignSelf: 'center', 
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH, 
        position: 'absolute', 
        zIndex: 2000,
    },
    closeInstructionsContainer: {
        zIndex: 2002,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 120,
        right: 15,
    },
    closeInstructions: {
        color: 'white',
        fontSize: 14,
        marginRight: 10
    },
    voteInstructionsContainer: {
        zIndex: 2001,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCREEN_HEIGHT/3
    },
    voteInstructions: {
        height: 200,
        width: 320

    },
    reportContainer: {
        position: 'absolute',
        backgroundColor: 'white', 
        height: 250,
        width: SCREEN_WIDTH/1.5,
        zIndex: 2000,
        top: SCREEN_HEIGHT*0.3,
        alignSelf: 'center',
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        padding: 8
    },
    reportFont: {
        fontSize: 20,
    },
    reportHeaderX: {
        height: 20,
        width: 20
    },
    reportOptions: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15
    },
    reportFooter: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    reportOptionsActive: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'gray'
    }
});

export default VotePage;