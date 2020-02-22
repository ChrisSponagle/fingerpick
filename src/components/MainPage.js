import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, RefreshControl, ActivityIndicator, BackHandler, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { SliderBox } from './SliderBox';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Carousel from 'react-native-snap-carousel';
 
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

// const modalRef = useRef<Modalize>(null);

class MainPage extends React.Component {
        state = {
            adImages: [],
            loadedAds: false,
            infoView: false,
            xView: false,
            top10: '',
            newChallenges: '',
            adInfo: '',
            isLoaded: false,
            top10IsLoaded: false,
            hotJoined: false,
            hotNotJoined: true,
            refreshing: false,
            sending: false,
        }
    
    componentWillMount() {
      this.pullChallenges()
      this.getAds()
      this.getRanking()
    }

    getAds() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ads', {
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
                    adInfo: [data],
                })
                this.renderAds(this.state.adInfo[0].ads)
                this.setState({adsLoaded: true})
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }

    
    renderAds = (ads) => {
        return ads.map((item, index) => {  
            this.state.adImages.push(imgUrl + 'ads/' + item.ad_img_filename)       
        })
    }
    
    pullChallenges() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/challenges/main', {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
              },
            });
            
            const content = await rawResponse; 
            content.json().then(data => {
                // String.prototype.replaceAt=function(index, replacement) {
                //     return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
                // }
                // removeLastPara = removeFirstPara.replaceAt(-1, ']')
                this.setState({
                    newChallenges: [data],
                    isLoaded: false
                })
                let hotChallenges = this.state.newChallenges[0].hottime_challenges[0]
                let openChallenges = [...this.state.newChallenges[0].open_challenges]
                let preparingChallenges = [...this.state.newChallenges[0].preparing_challenges]

                this.setState({
                    hotChallenges: hotChallenges,
                    openChallenges: openChallenges,
                    preparingChallenges: preparingChallenges,
                    isLoaded: true,
                    refreshing: false
                })
              })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }

    getRanking() {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/ranking/top10', {
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
                    top10: [data],
                    top10IsLoaded: true

                })
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
           
        })()
        .catch(error=>Alert.alert(error.message))
    }
    
    showInfo() {
        this.setState({
            infoView: true,
            xView: true
        })
    }

    hideInfo() {
        for(i=0; i<2; i++){
            this.setState({
                infoView: false
            })
        }
    }

    componentDidMount() {
        this.getPermissionAsync()
        setInterval(() => {this.pullChallenges()}, 600000)

        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('MainPage')
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
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
                let newOpenChallenges = [...this.state.openChallenges]
                newOpenChallenges[0]['joined'] = 1
                newOpenChallenges[0]['not_joined'] = 0

                this.setState({
                    openChallenges: newOpenChallenges,
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
                let newOpenChallenges = [...this.state.openChallenges]
                newOpenChallenges[index]['joined'] = 1
                newOpenChallenges[index]['not_joined'] = 0

                this.setState({
                    openChallenges: newOpenChallenges,
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

    _pickHotImage = async (challengeId, index, challengeName) => { 
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });
      if (!result.cancelled) {  
            let newHotChallenges = this.state.hotChallenges
            newHotChallenges['joined'] = 1
            newHotChallenges['not_joined'] = 0

            this.setState({
                hotChallenges: newHotChallenges,
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
    };

    hotTimeout(index) {
            let newHotChallenges = this.state.hotChallenges
            newHotChallenges['closed'] = 1
            newHotChallenges['not_joined'] = 0

            this.setState({
                hotChallenges: newHotChallenges
            })          
    }

    openTimeout(index) {
        if (!index) {   
            let newOpenChallenges = [...this.state.openChallenges]
            newOpenChallenges[0]['closed'] = 1
            newOpenChallenges[0]['joined'] = 0

            this.setState({
                openChallenges: newOpenChallenges
            })          
        }
        else if (index) {     
            let newOpenChallenges = [...this.state.openChallenges]
            newOpenChallenges[index]['closed'] = 1
            newOpenChallenges[index]['joined'] = 0

            this.setState({
                openChallenges: newOpenChallenges
            })
        }
    }

    contestOpen(index) {
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

    renderHotChallenges = (challenges) => {
        return challenges.map((item, index) => {   
            if (this.state.hotChallenges['joined'] || this.state.hotChallenges['not_joined']) {
                open = true
            }
            else open = false
            return (
                <View key={item['challege_id']} style={styles.hotChallengeContainer}>
                    <View style={styles.challengePhotoContainer}>
                        <View style={styles.shadowOverlay}/>
                        <Image style={styles.challengePhoto} source={{uri: imgUrl + 'challenges/' + item['background_img_filename']}}/>
                        <View style={styles.timerContainer}>
                            <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                            <CountDown
                                until={item['rest_time']}
                                onFinish={() => this.hotTimeout(index)}
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: open})}>
                                    <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                                </TouchableOpacity>
                                {this.state.hotChallenges['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage', {challengeId: item['challenge_id']})}>
                                    <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                                </TouchableOpacity>: null}
                                {this.state.hotChallenges['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                    <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                                </TouchableOpacity>: null}
                            </View>
                            <View style={styles.rightButtonContainer}>
                                {this.state.hotChallenges['not_joined'] ? <TouchableOpacity style={styles.joinButton} onPress={() => this._pickHotImage(item['challenge_id'])}>
                                    <Text style={styles.joinButtonFont}>참가하기</Text>
                                </TouchableOpacity>: null}
                                {this.state.hotChallenges['joined'] ? <View style={styles.joinedButton}>
                                    <Text style={styles.joinedButtonFont}>참가중</Text>
                                </View>: null}
                                {this.state.hotChallenges['closed'] ? <View style={styles.closedButton}>
                                    <Text style={styles.joinedButtonFont}>종료</Text>
                                </View>: null}
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

    renderOpenChallenges = ({item, index}) => {
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
                            onFinish={() => this.openTimeout(index)}
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChallengeRanking', {challengeId: item['challenge_id'], open: open})}>
                                <Image style={styles.rankingIconSmall} source={require('../images/rankingIconSmall.png')}/>
                            </TouchableOpacity>
                            {this.state.openChallenges[index]['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('VotePage', {challengeId: item['challenge_id']})}>
                                <Image style={styles.voteIconSmall} source={require('../images/voteIconSmall.png')}/>
                            </TouchableOpacity>: null}
                            {this.state.openChallenges[index]['joined'] ? <TouchableOpacity onPress={() => this.props.navigation.navigate('MyChallenges', {challengeId: item['challenge_id']})}>
                                    <Image style={styles.voteIconSmall} source={require('../images/myIconSmall.png')}/>
                            </TouchableOpacity>: null}
                        </View>
                        <View style={styles.rightButtonContainer}>
                            {this.state.openChallenges[index]['not_joined'] ? <TouchableOpacity style={styles.joinButton} onPress={() => this._pickImage(item['challenge_id'], index, 'open')}>
                                <Text style={styles.joinButtonFont}>참가하기</Text>
                            </TouchableOpacity>: null}
                            {this.state.openChallenges[index]['joined'] ? <View style={styles.joinedButton}>
                                <Text style={styles.joinedButtonFont}>참가중</Text>
                            </View>: null}
                            {this.state.openChallenges[index]['closed'] ? <View style={styles.closedButton}>
                                <Text style={styles.joinedButtonFont}>종료</Text>
                            </View>: null}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    renderPreparingChallenges = ({item, index}) => {
        return(
            <View key={item['challege_id']} style={styles.challengeContainer}>
                <View style={styles.challengePhotoContainer}>
                    <View style={styles.shadowOverlay}/>
                    <Image style={styles.challengePhoto} source={{uri: imgUrl + 'challenges/' + item['background_img_filename']}}/>
                    <View style={styles.timerContainer}>
                        <Image style={styles.timerIcon} source={require('../images/timerClock.png')}/>
                        <CountDown
                            until={item['rest_time']}
                            onFinish={() => this.contestOpen(index)}
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
                            
                        </View>
                        <View style={styles.rightButtonContainer}>
                            {this.state.preparingChallenges[index]['not_joined'] ? <View style={styles.joinedButton}>
                                <Text style={styles.joinedButtonFont}>오픈예정</Text>
                            </View>: null}
                            {this.state.preparingChallenges[index]['closed'] ? <TouchableOpacity style={styles.joinButton} onPress={() => this._pickImage(item['challenge_id', index, 'preparing'])}>
                                <Text style={styles.joinButtonFont}>참가하기</Text>
                            </TouchableOpacity>: null}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    
    renderTop10 = ({item, index}) => {
        if (!index) {  
            return (
                <View style={{marginTop: 15}}>
                    <Image source={require('../images/goldRibbon.png')} style={{position: 'absolute', zIndex: 100, height: 30, width: 20}}/>
                    <Image key={item} id={index} style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/' + item.profile_img_filename}}/>
                </View>
            )
        }
        else if (index === 1) {
            return (
                <View style={{marginTop: 15}}>
                    <Image source={require('../images/silverRibbon.png')} style={{position: 'absolute', zIndex: 100, height: 30, width: 20}}/>
                    <Image key={item} id={index} style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/' + item.profile_img_filename}}/>
                </View>
            )
        }
        else if (index === 2) {
            return (
                <View style={{marginTop: 15}}>
                    <Image source={require('../images/bronzeRibbon.png')} style={{position: 'absolute', zIndex: 100, height: 30, width: 20}}/>
                    <Image key={item} id={index} style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/' + item.profile_img_filename}}/>
                </View>
            )
        }
        else {
            return (
                <View style={{marginTop: 15}}>
                    <Image key={item} id={index} style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/' + item.profile_img_filename}}/>
                </View>
            )
        }
    }
    _refreshControl() {
        return (
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => [this.pullChallenges(), this.getRanking()]} />
        )
    }
   
    render(){
        return( 
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}> 
                <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={this._refreshControl()}>
                {/* App info popup */}
                {this.state.infoView &&
                    <Modal
                    style={{zIndex: 2000, width: SCREEN_WIDTH, alignSelf: 'center', alignItems: 'center'}}
                    isVisible={this.state.infoView}
                    backdropOpacity={0.6}
                    >
                        <ScrollView contentContainerStyle={styles.infoScroll}>
                            <ImageBackground style={styles.infoImage} source={require('../images/guide_이용방법_img.png')}>
                                <View style={styles.infoCloseContainer}>
                                    <TouchableOpacity onPress={() => this.hideInfo()}>
                                        <Image style={styles.infoClose} source={require('../images/reportClose.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>

                        </ScrollView>
                    </Modal>                    
                }
                    <View style={styles.menuContainer}>
                        <View style={styles.headerContainter}>
                            <View style={styles.headerImageContainer}>
                                <Image style={styles.headerText} source={require('../images/challengeHeader.png')}/>
                                <TouchableOpacity onPress={() => this.showInfo()}>
                                    <Image style={styles.infoButton} source={require('../images/infoButton.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerSubText}>내앨범 속 사진이 돈이 되는 곳</Text>
                        </View>
                        <View style={styles.adContainer}>
                            <View style={styles.sliderContainer}>
                                {this.state.adsLoaded && <SliderBox
                                    images={this.state.adImages}
                                    sliderBoxHeight={250}
                                    onCurrentImagePressed={index =>
                                        this.props.navigation.navigate('EventPage', {
                                            ad: this.state.adInfo[0].ads[index],
                                            })                                  
                                    }        
                                    dotColor='#FFF'
                                    inactiveDotColor='rgba(128, 128, 128, 0.0)'
                                    dotStyle={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 15,
                                        borderColor: '#FFF',
                                        borderWidth: 1
                                    }}
                                />}
                            </View>
                        </View>
                        <View style={styles.hotTimeContainer}>
                            <Text style={styles.hotTimeFont}>HOT TIME</Text>
                        </View>
                        {this.state.sending && <Modal isVisible={true}><ActivityIndicator size='large' color='#E64D6A' style={{position: 'absolute', zIndex: 4000, top: 400, alignSelf: 'center'}}/></Modal>}

                        {this.state.isLoaded && 
                        <View style={styles.hotChallengesContainer}>
                            {this.renderHotChallenges(this.state.newChallenges[0].hottime_challenges)}
                        </View>}

                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CurrentChallenges')} style={styles.openContainer}>
                                <Text style={styles.openFont}>오픈중</Text>
                                <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                            </TouchableOpacity>
                        </View>
                        {this.state.isLoaded && 
                        <Carousel style={styles.carousel}
                            data={this.state.newChallenges[0].open_challenges}
                            renderItem={this.renderOpenChallenges}
                            itemWidth={300}
                            sliderWidth={SCREEN_WIDTH} 
                            separatorWidth={1}
                            firstItem={1}
                            itemContainerStyle={{marginRight: -80}}
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            pagingEnable={true}
                        />}
                        <View>
                            <ImageBackground style={styles.pickedUsersBackground} source={require('../images/pickedUsersBackground.png')}>
                                <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => this.props.navigation.navigate('Ranking')}>
                                    <Text style={styles.openFont}>주간핑픽</Text>
                                    <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                                </TouchableOpacity>
                                {this.state.top10IsLoaded && 
                                <Carousel style={styles.carousel}
                                    data={this.state.top10[0].weeklyFingpik}
                                    renderItem={this.renderTop10}
                                    itemWidth={68}
                                    sliderWidth={SCREEN_WIDTH} 
                                    firstItem={2}
                                    inactiveSlideScale={1}
                                    // hasParallaxImages={true}
                                    ref={(c) => {
                                        this._carousel = c;
                                    }}
                                    pagingEnable={true}
                                />}
                            </ImageBackground>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FutureChallenges')} style={styles.openContainer}>
                                <Text style={styles.openFont}>오픈예정</Text>
                                <Image style={styles.forwardArrow} source={require('../images/forwardArrow.png')}/>
                            </TouchableOpacity>
                        </View>

                        {this.state.isLoaded && 
                        <Carousel style={styles.carousel}
                            data={this.state.newChallenges[0].preparing_challenges}
                            renderItem={this.renderPreparingChallenges}
                            itemWidth={300}
                            sliderWidth={SCREEN_WIDTH} 
                            firstItem={1}
                            inactiveSlideScale={0.94}
                            hasParallaxImages={true}
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            pagingEnable={true}
                        />
                        }
                    </View>
                </ScrollView>
                <View elevation={10} style={styles.footerContainer}>
                    <View style={styles.footerIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainPage')}>
                            <Image style={styles.footerIcons} source={require('../images/homeIconSelected.png')}/>
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
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 3005,
        width: SCREEN_WIDTH,
        paddingBottom: 100
    },
    infoClose: {
        position: 'relative', 
        zIndex: 100,
        height: 30,
        width: 30,
        right: 5,
        padding: 5,
    },
    infoScroll: {
        width: SCREEN_WIDTH-50, 
        marginTop: 50, 
        paddingBottom: 50,
    },
    infoCloseContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: 300,
        height: SCREEN_HEIGHT*1.5,
        marginTop: 10,
        marginRight: 10
      },
    infoImage: {
        flex: 1, 
        height: 900, 
        width: 300, 
        resizeMode: 'contain',
        alignSelf: 'center'

    },
    menuContainer: {
      flex: 1,
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
      alignSelf: 'center'
    },
    headerContainter: {
        marginTop: SCREEN_HEIGHT*0.1,
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
        color: '#FF6900'
    },
    hotChallengesContainer: {
        alignSelf: 'stretch',
        alignSelf: 'center',
        width: 350,
        marginTop: 10,
        paddingBottom: 20,
    },
    openContainer: {
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    openFont: {
        fontSize: 20,
        color: '#323232'
    },
    forwardArrow: {
        height: 20,
        width: 20,
    },
    pickedUsersBackground: {
        height: 120, 
        width: SCREEN_WIDTH, 
        marginTop: 30, 
        justifyContent: 'center',
        paddingTop: 15
    },
    adContainer: {
        borderRadius: 20,
        height: 250,
        marginTop: 20,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    sliderContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    hotChallengeContainer: {
        backgroundColor: '#FFFFFF',
        position: 'relative',
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 20,       
    },
    challengeContainer: {
        backgroundColor: '#FFFFFF',
        position: 'relative',
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        borderRadius: 20,       
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
    profilePhoto: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'gray'
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

  export default MainPage;