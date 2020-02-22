import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';

class MobileNumber extends React.Component {
    state = {
        notAllChecked: true,
        allChecked: false,
        phoneNumber: '',
        visible: false,
        countryCode: '대한민국 +82'
    }

    componentDidUpdate() {
        if (this.state.notAllChecked === true && this.state.allChecked === false) {
            if (this.state.phoneNumber.length > 9) {
                this.setState({
                    notAllChecked: false,
                    allChecked: true
                })
            }
        } 
        if (this.state.notAllChecked === false && this.state.allChecked === true) {
            if (this.state.phoneNumber.length < 10) {
                this.setState({
                    notAllChecked: true,
                    allChecked: false
                })
            }
        } 
    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    onChangeText = (phoneNumber) => this.setState({ phoneNumber: phoneNumber });
    render(){
        let data = [{
            value: '대한민국 +82',
          },{
            value: '미국 +1',
          }, {
            value: '싱가포르 +65',
          },{
            value: '영국 +44',
          },{
            value: '중국 +86',
          }, {
            value: '호주 +61',
          },
        ];
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>본인인증</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionFont}>핸드폰 번호를 입력해주세요</Text>
                     <Dropdown
                     style={{alignSelf: 'flex-start'}}
                     data={data}
                     value={ this.state.countryCode }
                     onChangeText={ (countryCode) => this.setState({ countryCode })}
                     containerStyle={{width: 140, 
                     }}  />
                </View>
                <View style={styles.phoneNumberContainer}>
                    <TextInput 
                    style={{ width: 200, padding: 2 }}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder='핸드폰 번호를 입력해주세요'/>
                </View>
                {this.state.notAllChecked && <View style={styles.nextButtonContainer}>
                    <View style={styles.nextButtonGray}>
                        <Text style={styles.nextText}>다음</Text>
                    </View>
                </View>}
                {this.state.allChecked &&<TouchableOpacity style={styles.nextButtonContainer} onPress={() => this.props.navigation.navigate('ConfirmNumber')}>
                    <LinearGradient colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]} style={styles.nextButtonColor}>
                        <View style={styles.nextButton}>
                            <Text style={styles.nextText}>다음</Text>
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
    descriptionContainer: {
        marginTop: 25,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'stretch',
        display: 'flex',
        paddingBottom: 20
    },
    descriptionFont: {
        position: 'relative',
        color: 'black',
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    phoneNumberContainer: {
        marginTop: 10,
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

  export default MobileNumber;