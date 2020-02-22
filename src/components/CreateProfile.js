import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button, AsyncStorage, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class CreateProfile extends React.Component {
    state = {
        notAllChecked: true,
        allChecked: false,
        nickname: '',
        image: null,
        photoData: '',
    }

    componentDidMount() {
        this.getPermissionAsync()
    }
    componentDidUpdate() {
        if (this.state.notAllChecked === true && this.state.allChecked === false) {
            if (this.state.nickname.length > 1) {
                this.setState({
                    notAllChecked: false,
                    allChecked: true
                })
            }
        } 
        if (this.state.notAllChecked === false && this.state.allChecked === true) {
            if (this.state.nickname.length < 2) {
                this.setState({
                    notAllChecked: true,
                    allChecked: false
                })
            }
        } 
    }
    
    onChangeText = (nickname) => this.setState({ nickname: nickname });

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async () => {        
          let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ photoData: result, image: result.uri });
        //   this.setState({ image: result.uri });
        }
      };

      createProfile(profile_img, nickname) {
        if (profile_img === '') { 
            (async () => {
                const formData = new FormData()
                formData.append("username", this.props.navigation.state.params.username);
                formData.append("nickname", nickname);

                const rawResponse = await fetch('http://15.164.112.15:4000/auth/signup', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    ContentType: 'multipart/form-data'
                  },
                  body: formData
                });
                const content = await rawResponse;  
                if (content.status === 200) {
                    this.login()
                }
                else if (content.status === 401) {
                    Alert.alert("이미 존재하는 닉네임입니다.")
                }
              })()
              .catch(error=>Alert.alert(error)) 
        }
        else { 
            (async () => {
                const formData = new FormData()
                formData.append("username", this.props.navigation.state.params.username);
                formData.append("phone", this.props.navigation.state.params.phone)
                formData.append("nickname", nickname);
                formData.append("profile_img", {
                    uri:  profile_img.uri,
                    type: "image/jpg",
                    name: profile_img.uri,
                });
                const rawResponse = await fetch('http://15.164.112.15:4000/auth/signup', {
                method: 'POST',
                //   credentials: 'include',
                headers: {
                    ContentType: 'multipart/form-data'
                },
                body: formData
                });
                const content = await rawResponse;  
                if (content.status === 200) {
                    this.login()
                }
                else if (content.status === 401) {
                    Alert.alert("이미 존재하는 닉네임입니다.")
                }
            })()
            .catch(error=>Alert.alert(error)) 
        }
    
    }

      login = async () => {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/auth/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username: this.props.navigation.state.params.username})
            });
            
            const content = await rawResponse;  
            
            if (content.status === 200) {
                try {
                    await AsyncStorage.setItem('username', this.props.navigation.state.params.username);
                    const accessToken = content.headers.map['set-cookie']
                    this.props.navigation.navigate('MainPage', {accessToken: accessToken})
                } catch (error) {
                    Alert.alert("TOKEN", error)
                }
            }
            // else {Alert.alert("ERROR")}
          })()
          .catch(error=>Alert.alert("LOGIN", error.message)) 
    }
    
    render(){
        let { image } = this.state;
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>프로필등록</Text>
                </View>
                <View>
                <TouchableOpacity 
                    onPress={this._pickImage}
                >
                <View style={styles.profilePicContainer}>
                    {image &&
                    <Image source={{ uri: image }} style={{ flex:1 , width: undefined, height: undefined }} />}
                </View>
                    <Image style={styles.photoIcon} source={require('../images/photoIcon.png')}/>
                </TouchableOpacity>
                </View>
                <View style={styles.phoneNumberContainer}>
                    <TextInput 
                    style={{ width: 200, padding: 2 }}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder='이름(닉네임)을 입력해주세요'/>
                </View>
                {this.state.notAllChecked && <View style={styles.nextButtonContainer}>
                    <View style={styles.nextButtonGray}>
                        <Text style={styles.nextText}>다음</Text>
                    </View>
                </View>}
                {this.state.allChecked &&<TouchableOpacity style={styles.nextButtonContainer} onPress={() => this.createProfile(this.state.photoData, this.state.nickname)}>
                    <LinearGradient colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]} style={styles.nextButtonColor}>
                        <View style={styles.nextButton}>
                            <Text style={styles.nextText}>시작하기</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>}
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
        marginTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 25, 
    },
    profilePicContainer: {
        backgroundColor: '#AAAAAA',
        width: 130,
        height: 130,
        borderRadius: 130/2,
        overflow: 'hidden',
        marginTop: 30
    },
    photoIcon: {
        height: 40,
        width: 40,
        position: 'absolute',
        top: 115,
        right: 3,
    },
    phoneNumberContainer: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },
    nextButtonContainer: {
        marginTop: 30,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        shadowColor: '#323232',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    nextButtonGray: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#AAAAAA',
        height: 50,
        borderRadius: 20,
        shadowColor: '#323232',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        },
    nextButtonColor: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 50,
        borderRadius: 20,
    },
    nextText: {
        color: 'white', 
        fontSize: 20, 
    },
  });

  export default CreateProfile;