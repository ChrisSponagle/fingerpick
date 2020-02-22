import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, AsyncStorage, TextInput, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

class EditProfile extends React.Component {
    state = {
        profilePhoto: '',
        emptyTextInput: true,
        filledTextInput: false,
        username: '',
        intro: '',
        photoData: '',
        placeholderText: '',
        dataType: '',
        deleteView: false
    }

    componentWillMount() {
        this.getProfileInfo()
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
                    placeholderText: this.state.profileInfo[0].profile[0].introduction,
                })
                this.setState({
                    profilePhoto: {uri: imgUrl + 'profiles/'+ this.state.profileInfo[0].profile_img_filename + '?date=' + (new Date()).getTime()},
                    isLoaded: true
                })
                if (this.state.placeholderText !== null) {
                    this.setState({
                        filledTextInput: true,
                        emptyTextInput:false
                    })
                }
                // Alert.alert(this.state.profileInfo[0]['nickname'])
            })
            .catch(error=>Alert.alert('ERROR', error.message)) 
        
        })()
        .catch(error=>Alert.alert(error.message))
    }
    
    onChangeText = (intro) => this.setState({ intro: intro });

    _pickImage = async () => {        
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ photoData: result, profilePhoto: {uri: result.uri} });
      }
    };

    editProfile(profile_img, introduction) {
        if (profile_img === '') {
            (async () => {
                const formData = new FormData()
                formData.append("introduction", introduction);
                
                const rawResponse = await fetch('http://15.164.112.15:4000/mypage/profile', {
                  method: 'PUT',
                  credentials: 'include',
                  headers: {
                    ContentType: 'multipart/form-data'
                  },
                  body: formData
                });
                const content = await rawResponse;  
                content.json().then(data => {
                    // Alert.alert(data)
                })
                if (content.status === 200) {
                    
                    this.props.navigation.push('Profile')
                }
              })()
              .catch(error=>Alert.alert(error.message)) 
        }
        else {
            (async () => {
                const formData = new FormData()
                formData.append("introduction", introduction);
                formData.append("profile_img", {
                    uri:  profile_img.uri,
                    type: "image/jpg",
                    name: profile_img.uri,
                  });
                const rawResponse = await fetch('http://15.164.112.15:4000/mypage/profile', {
                  method: 'PUT',
                  credentials: 'include',
                  headers: {
                    ContentType: 'multipart/form-data'
                  },
                  body: formData
                });
                const content = await rawResponse;  
                content.json().then(data => {
                    Alert.alert(data)
                })
                if (content.status === 200) {
                    
                    this.props.navigation.push('Profile')
                }
              })()
              .catch(error=>Alert.alert(error.message)) 
        }
        
    }
    

    deleteProfile = async () => {
        this.setState({
            deleteView: false
        })
        const value = await AsyncStorage.getItem('username');

        //API CALL TO DELETE
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/auth/withdraw', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse;  
            content.json().then(data => {
                // Alert.alert(data)
            })
            if (content.status === 200) {
                    try {
                      await AsyncStorage.removeItem('username');
                    //   return true;
                      this.props.navigation.navigate('Home')
                    }
                    catch(exception) {
                      return false;
                    }
            }
            })()
            .catch(error=>Alert.alert(error.message)) 
    }

    render(){
        return( 
            <View style={styles.container}>
                {/* Delete profile popup */}
                <Modal transparent={true} backdropColor={'black'} backdropOpacity= {0.6} animationType={'slide'} isVisible={this.state.deleteView}>
                <View style={styles.deleteContainer}>
                    <Image style={styles.alarmIcon} source={require('../images/alarmIcon.png')}/>
                    <View style={styles.deleteExplanation}>
                        <Text style={styles.explanationHeader}>탈퇴 요청 전 주의사항</Text>
                        <Text style={styles.explanationDetails}>탈퇴 시 계정의 데이터가</Text>
                        <Text style={styles.explanationDetails}>영구적으로 삭제됩니다.</Text>
                        <Text style={styles.explanationDetails}>확인 후 탈퇴 하시겠습니까 ?</Text>
                    </View>
                    <TouchableOpacity style={ this.state.adult? styles.cancelOptionActive : styles.cancelOption}
                        onPressIn={() => this.setState({adult: !this.state.adult})}
                        onPressOut={() => this.setState({adult: !this.state.adult})} onPress={() => this.setState({deleteView: false})}>
                        <Text style={styles.deleteFont}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ this.state.unsuitable? styles.deleteOptionActive : styles.deleteOption}
                        onPressIn={() => this.setState({unsuitable: !this.state.unsuitable})}
                        onPressOut={() => this.setState({unsuitable: !this.state.unsuitable})} onPress={this.deleteProfile.bind(this)}>
                        <Text style={styles.deleteFont}>동의 후 탈퇴</Text>
                    </TouchableOpacity>
                </View>  
                </Modal>    
                <View style={styles.headerContainter}>
                    {/* <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}> */}
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.push('Profile')}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>프로필수정</Text>
                    <TouchableOpacity style={styles.confirmChangeContainer} onPress={() => this.editProfile(this.state.photoData, this.state.intro)}>
                        <Text>완료</Text>
                    </TouchableOpacity>
                </View>      
                <View style={styles.profilePicContainer}>
                    {this.state.isLoaded && 
                    <Image style={styles.profilePic} source={this.state.profilePhoto}/>}
                    <TouchableOpacity style={{marginBottom: 20}} onPress={this._pickImage}>
                        <Text style={styles.changePicFont}>프로필사진 바꾸기</Text>
                    </TouchableOpacity>
                </View> 
                {this.state.isLoaded && <View style={styles.userInfoContainer}>
                    <View style={styles.userInfoSubContainer}>
                        <Text style={styles.userInfoHeaders}>이름(닉네임)</Text>
                        <Text>{this.state.profileInfo[0].nickname}</Text>
                    </View>
                    <View style={styles.userInfoSubContainer}>
                        <Text style={styles.userInfoHeaders}>소갯말</Text>
                        {this.state.emptyTextInput && <TextInput 
                        style={{ width: 250, padding: 2 }}
                        onChangeText={this.onChangeText.bind(this)}
                        placeholder='소개말을 입력해주세요 (0~15자이내)'/>}

                        {this.state.filledTextInput && <TextInput 
                        style={{ width: 250, padding: 2 }}
                        onChangeText={this.onChangeText.bind(this)}
                        placeholder={this.state.placeholderText}/>}
                    </View>
                </View>}
                <View style={styles.deleteProfileContainer}>
                    <TouchableOpacity style={styles.deleteProfileButton} onPress={() => this.setState({deleteView: true})}>
                        <Text style={styles.deleteProfileFont}>탈퇴하기</Text>
                        <Image style={styles.deleteProfileArrow} source={require('../images/deleteIcon.png')}/>
                    </TouchableOpacity>
                </View>  
                <View style={{alignSelf: 'stretch', height: SCREEN_HEIGHT*0.5, backgroundColor: '#FFF'}}/>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginLeft: -20
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
    confirmChangeContainer: {
        marginRight: 25,
        marginLeft: -30
    },
    profilePicContainer: {
        height: 200,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginTop: 10,
        paddingTop: 20
    },
    profilePic: {
        height: 120, 
        width: 120, 
        borderRadius: 60, 
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: 'gray'
    },
    changePicFont: {
        color: '#D439B4',
        marginBottom: 20
    },
    userInfoContainer: {
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        marginTop: 10
    },
    userInfoSubContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        padding: 20,
        alignItems: 'center'
    },
    userInfoHeaders: {
        width: 80,
        marginRight: 30
    },
    deleteProfileContainer: {
        alignSelf: 'stretch',
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    deleteProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteProfileFont: {
        color: '#AAAAAA',
        marginRight: 10
    },
    deleteProfileArrow: {
        height: 20,
        width: 15
    },
    deleteContainer: {
        position: 'absolute',
        backgroundColor: 'white', 
        height: 425,
        width: SCREEN_WIDTH*0.8,
        zIndex: 2000,
        top: SCREEN_HEIGHT*0.2,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10
    },
    alarmIcon: {
        width: 80,
        height: 120
    },
    deleteExplanation: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    explanationHeader: {
        fontSize: 18,
    },
    explanationDetails: {
        fontSize: 14,
        marginTop: 10
    },
    deleteFont: {
        fontSize: 20,
    },
    cancelOption: {
        width: 250,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        padding: 15,
        marginTop: 15
    },
    cancelOptionActive: {
        width: 250,
        alignItems: 'center',
        padding: 15,
        marginTop: 15,
        backgroundColor: 'white',
    },
    deleteOption: {
        width: 250,
        alignItems: 'center',
        padding: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#707070'
    },
    deleteOptionActive: {
        width: 250,
        alignItems: 'center',
        padding: 15,
        marginTop: 15,
        backgroundColor: 'gray',
    }
  });

  export default EditProfile;