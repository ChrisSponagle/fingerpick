import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import CountDown from 'react-native-countdown-component';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

class FutureChallenges extends React.Component {
    state = {
        image: null,
        joinedContest: false,
        unjoinedContest: true,
        incomingData: '',
        preparingChallenges: '',
        isLoaded: false,
        sending: false

    }
    componentDidMount() {
        this.getPermissionAsync()
        this.getPreparingChallenges()
    }
    
    getPreparingChallenges() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/challenges/preparing', {
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
                this.setState({
                    preparingChallenges: this.state.incomingData[0].preparing_challenges,
                    isLoaded: true
                }) 
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
    _pickImage = async (challengeId, index, challengeName) => { 
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });
      if (!result.cancelled) {  
          if(!index) { 
              let newPreparingChallenges = [...this.state.preparingChallenges]
              newPreparingChallenges[0]['joined'] = 1
              newPreparingChallenges[0]['closed'] = 0

              this.setState({
                  PreparingChallenges: newPreparingChallenges,
                  sending: true
              })
          
              this.setState({ image: result.uri
              });
              
              (async () => {
                  const formData = new FormData()
                  formData.append("registration_img", {
                      uri:  this.state.image,
                      type: "image/jpg",
                      name: this.state.image,
                    });
                  const rawResponse = await fetch('http://15.164.112.15:4000/challenges/open/' + challengeId, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        ContentType: 'multipart/form-data'
                    },
                    body: formData
                  });
  
                  const content = await rawResponse;
                  
                  if (content.status === 200) {
                      this.setState({sending: false})
                      this.props.navigation.navigate('MyChallenges', {
                          chosenPhoto: result,
                          challengeId: challengeId
                      })  
                  }
                })()
                .catch(error=>Alert.alert(error.message))    
          }  
          else {
              let newPreparingChallenges = [...this.state.preparingChallenges]
              newPreparingChallenges[index]['joined'] = 1
              newPreparingChallenges[index]['closed'] = 0

              this.setState({
                preparingChallenges: newPreparingChallenges,
                sending: true
              }) 
              this.setState({ image: result.uri,
              }); 
              
              (async () => {
                  const formData = new FormData()
                  formData.append("registration_img", {
                      uri:  this.state.image,
                      type: "image/jpg",
                      name: this.state.image,
                    });
                  const rawResponse = await fetch('http://15.164.112.15:4000/challenges/open/' + challengeId, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        ContentType: 'multipart/form-data'
                    },
                    body: formData
                  });
  
                  const content = await rawResponse;
                  // Alert.alert(content)  
                  // content.json().then(data => {
                  //     Alert.alert(data)
                  // })
                  if (content.status === 200) {
                      this.setState({sending: false})
                      this.props.navigation.navigate('MyChallenges', {
                          chosenPhoto: result,
                          challengeId: challengeId
                      })  
                  }
                })()
                .catch(error=>Alert.alert(error.message))   
            }     
        }
    };

    preparingTimeout(index) {
        if (!index) {   
            let newPreparingChallenges = [...this.state.preparingChallenges]
            newPreparingChallenges[0]['closed'] = 1
            newPreparingChallenges[0]['not_joined'] = 0

            this.setState({
                preparingChallenges: newPreparingChallenges
            })          
        }
        else if (index) {     
            let newPreparingChallenges = [...this.state.preparingChallenges]
            newPreparingChallenges[index]['closed'] = 1
            newPreparingChallenges[index]['not_joined'] = 0

            this.setState({
                preparingChallenges: newPreparingChallenges
            })
        }
    }

    renderPreparingChallenges = (challenges) => {
        return challenges.map((item, index) => {   
            if (this.state.openChallenges[index]['joined'] || this.state.openChallenges[index]['not_joined']) {
                open = true
            }
            else open = false
            return (
                <View key={item['challege_id']} style={styles.challengeContainer}>
                    <View style={styles.challengePhotoContainer}>
                        <View style={styles.shadowOverlay}/>
                        <Image style={styles.challengePhoto} source={{uri: imgUrl + 'challenges/' + item['background_img_filename']}}/>
                        <View style={styles.timerContainer}>
                            <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                            <CountDown
                                until={item['rest_time']}
                                onFinish={() => this.preparingTimeout(index)}
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
                        <View style={styles.challengeButtonContainer}>
                            <View style={styles.leftButtonsContainer}>
                                {this.state.preparingChallenges[index]['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: open})}>
                                    <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                                </TouchableOpacity>: null}
                                {this.state.preparingChallenges[index]['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage', {challengeId: item['challenge_id']})}>
                                    <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                                </TouchableOpacity>: null}
                                {this.state.preparingChallenges[index]['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                    <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                                </TouchableOpacity>: null}
                            </View>
                            <View style={styles.rightButtonContainer}>
                                {this.state.preparingChallenges[index]['not_joined'] ? <View style={styles.joinedButton}>
                                    <Text style={styles.joinedButtonFont}>오픈예정</Text>
                                </View>: null}
                                {this.state.preparingChallenges[index]['joined'] ? <View style={styles.joinedButton}>
                                <Text style={styles.joinedButtonFont}>참가중</Text>
                                </View>: null}
                                {this.state.preparingChallenges[index]['closed'] ? <TouchableOpacity style={styles.joinButton} onPress={() => this._pickImage(item['challenge_id', index, 'preparing'])}>
                                    <Text style={styles.joinButtonFont}>참가하기</Text>
                                </TouchableOpacity>: null}
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }
    
    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>오픈예정</Text>
                    <View style={styles.fillerContainer}/>
                </View>
                {this.state.sending && <Modal isVisible={true}><ActivityIndicator size='large' color='#E64D6A' style={{position: 'absolute', zIndex: 4000, top: 400, alignSelf: 'center'}}/></Modal>}
                <ScrollView contentContainerStyle={styles.challengesContainer}>
                    {this.state.isLoaded && 
                        <View style={styles.hotChallengesContainer}>
                            {this.renderPreparingChallenges(this.state.incomingData[0].preparing_challenges)}
                    </View>}
                </ScrollView>       
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
        marginLeft: -15
    },
    challengesContainer: {
        alignSelf: 'stretch',
        alignSelf: 'center',
        marginLeft: 30,
        marginRight: 30,
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 100,
        marginTop: 20,
        overflow: 'hidden',
        alignItems: 'center',
    },
    shadowOverlay: {
        height: 100,
        alignSelf: 'stretch',
        opacity: 0.4,
        zIndex: 3
    },
    challengePhoto: {
        height: 140,
        width: SCREEN_WIDTH*0.85,
        marginTop: -120,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    timerContainer: {
        position: 'absolute',
        height: 100,
        zIndex: 5,
        top: 72,
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
    joinedButtonFont: {
        color: 'black',
        padding: 10
    },
    
  });

  export default FutureChallenges;