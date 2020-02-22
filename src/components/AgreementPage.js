import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class AgreementPage extends React.Component {
    state= {
        agreementUncheckAll: true,
        agreementCheckAll: false,
        agreementOneUncheck: true,
        agreementOneCheck: false,
        agreementTwoUncheck: true,
        agreementTwoCheck: false,
        agreementThreeUncheck: true,
        agreementThreeCheck: false,
        agreementFourUncheck: true,
        agreementFourCheck: false,
        agreementFiveUncheck: true,
        agreementFiveCheck: false,
        mailUncheck: true,
        mailCheck: false,
        smsUncheck: true,
        smsCheck: false,
        pushUncheck: true,
        pushCheck: false,
        notAllChecked: true,
        allChecked: false
    }
    
    componentDidUpdate() {
        if (this.state.notAllChecked === true && this.state.allChecked === false) {
            if (this.state.agreementTwoCheck && this.state.agreementThreeCheck && this.state.agreementFourCheck === true && 
                this.state.mailCheck || this.state.smsCheck || this.state.pushCheck === true) {
                this.setState({
                    notAllChecked: false,
                    allChecked: true
                })
            }
        }   
    }

    checkButton =() => {
        if (this.state.agreementTwoCheck || this.state.agreementThreeCheck || this.state.agreementFourCheck === false) {            
            this.setState({
                notAllChecked: true,
                allChecked: false
            })
        }
    }

    clickedCheckAll = () => {
        //if anything is unchecked, check all. if all checked, uncheck all
        if (this.state.agreementOneUncheck || this.state.agreementTwoUncheck || this.state.agreementThreeUncheck || this.state.agreementFourUncheck || 
            this.state.agreementFiveUncheck === true) {
            this.setState({
                agreementUncheckAll: false,
                agreementCheckAll: true,
                agreementOneUncheck: false,
                agreementOneCheck: true,
                agreementTwoUncheck: false,
                agreementTwoCheck: true,
                agreementThreeUncheck: false,
                agreementThreeCheck: true,
                agreementFourUncheck: false,
                agreementFourCheck: true,
                agreementFiveUncheck: false,
                agreementFiveCheck: true,
            });
        }
        else {
            this.setState({
                agreementUncheckAll: true,
                agreementCheckAll: false,
                agreementOneUncheck: true,
                agreementOneCheck: false,
                agreementTwoUncheck: true,
                agreementTwoCheck: false,
                agreementThreeUncheck: true,
                agreementThreeCheck: false,
                agreementFourUncheck: true,
                agreementFourCheck: false,
                agreementFiveUncheck: true,
                agreementFiveCheck: false,
            })
        }
        this.checkButton()
    }
    clickedOneCheck = () => {
        if (this.state.agreementTwoUncheck || this.state.agreementThreeUncheck || this.state.agreementFourUncheck === true)
        this.setState({
            agreementOneUncheck: false,
            agreementOneCheck: true,
            agreementTwoUncheck: false,
            agreementTwoCheck: true,
            agreementThreeUncheck: false,
            agreementThreeCheck: true,
            agreementFourUncheck: false,
            agreementFourCheck: true
        });
        else {
            this.setState({
            agreementOneUncheck: true,
            agreementOneCheck: false,
            agreementTwoUncheck: true,
            agreementTwoCheck: false,
            agreementThreeUncheck: true,
            agreementThreeCheck: false,
            agreementFourUncheck: true,
            agreementFourCheck: false
            })
        }
        this.checkButton()
    }
  
    clickedTwoCheck = () => {
        this.setState({
            agreementTwoUncheck: !this.state.agreementTwoUncheck,
            agreementTwoCheck: !this.state.agreementTwoCheck,
        })
        this.checkButton()        

    }    
    clickedThreeCheck = () => {
        this.setState({
            agreementThreeUncheck: !this.state.agreementThreeUncheck,
            agreementThreeCheck: !this.state.agreementThreeCheck
        });
        this.checkButton()        

    }
    clickedFourCheck = () => {
        this.setState({
            agreementFourUncheck: !this.state.agreementFourUncheck,
            agreementFourCheck: !this.state.agreementFourCheck
        });

        this.checkButton()        

    }
    clickedFiveCheck = () => {
        this.setState({
            agreementFiveUncheck: !this.state.agreementFiveUncheck,
            agreementFiveCheck: !this.state.agreementFiveCheck
        });
    }

    clickedComm = (comm) => {
        if (comm === 'mail') {
            this.setState({
                mailUncheck: false,
                mailCheck: true,
                smsUncheck: true,
                smsCheck: false,
                pushUncheck: true,
                pushCheck: false
            })
        }
        else if (comm === 'sms') {
            this.setState({
                mailUncheck: true,
                mailCheck: false,
                smsUncheck: false,
                smsCheck: true,
                pushUncheck: true,
                pushCheck: false
            })
        }
        else
        this.setState({
                mailUncheck: true,
                mailCheck: false,
                smsUncheck: true,
                smsCheck: false,
                pushUncheck: false,
                pushCheck: true
        })
        this.checkButton()
    }
        

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <Text style={styles.headerFont}>약관동의</Text>
                </View>
                <View style={styles.firstAgreementContainer}>
                    <Text style={styles.agreementFont}>아래 약관에 모두 동의합니다.</Text>
                    <TouchableOpacity onPress={() => this.clickedCheckAll()}>
                        {this.state.agreementUncheckAll && <Image style={styles.agreementCheck} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementCheckAll && <Image style={styles.agreementCheck} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.agreementContainer}>
                    <Text style={styles.agreementFont}>핑거픽 이용약관 (필수)</Text>
                    <TouchableOpacity onPress={() => this.clickedOneCheck()}>
                        {this.state.agreementOneUncheck && <Image style={styles.agreementCheck} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementOneCheck && <Image style={styles.agreementCheck} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.agreementContainer}>
                    <Text style={styles.agreementFontSmall}>핑거픽 이용 약관 (필수)</Text>
                    <TouchableOpacity onPress={() => this.clickedTwoCheck()}>
                        {this.state.agreementTwoUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementTwoCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.agreementContainer}>
                    <Text style={styles.agreementFontSmall}>사진,앨범 서비스 이용 약관 (필수)</Text>
                    <TouchableOpacity onPress={() => this.clickedThreeCheck()}>
                        {this.state.agreementThreeUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementThreeCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.agreementContainer}>
                    <Text style={styles.agreementFontSmall}>개인정보 수집 / 이용 동의 (필수)</Text>
                    <TouchableOpacity onPress={() => this.clickedFourCheck()}>
                        {this.state.agreementFourUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementFourCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={[styles.agreementContainer, styles.lastAgreementBorder]}>
                    <Text style={styles.agreementFontSmall}>개인정보 수집 / 이용 동의 (선택)</Text>
                    <TouchableOpacity onPress={() => this.clickedFiveCheck()}>
                        {this.state.agreementFiveUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.agreementFiveCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.agreementContainer}>
                    <Text style={styles.agreementFont}>혜택 / 알림에 동의 (선택)</Text>
                </View>
                <View style={styles.firstAgreementContainer}>
                    <Text>이메일</Text>
                    <TouchableOpacity style={styles.commChecks} onPress={() => this.clickedComm('mail')}>
                        {this.state.mailUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.mailCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                    <Text>SMS</Text>
                    <TouchableOpacity style={styles.commChecks} onPress={() => this.clickedComm('sms')}>
                        {this.state.smsUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.smsCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                    <Text>푸시알림</Text>
                    <TouchableOpacity style={styles.commChecks} onPress={() => this.clickedComm('push')}>
                        {this.state.pushUncheck && <Image style={styles.agreementCheckSmall} source={require('../images/unclickedCheck.png')}/>}
                        {this.state.pushCheck && <Image style={styles.agreementCheckSmall} source={require('../images/clickedCheck.png')}/>}
                    </TouchableOpacity>
                </View>
                {this.state.notAllChecked && <View style={styles.nextButtonContainer}>
                    <View style={styles.nextButtonGray}>
                        <Text style={styles.nextText}>다음</Text>
                    </View>
                </View>}
                {this.state.allChecked &&<TouchableOpacity style={styles.nextButtonContainer} onPress={() => this.props.navigation.navigate('Registration')}>
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
    firstAgreementContainer: {
        marginTop: 25,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },
    agreementContainer: {
        marginTop: 25,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    agreementFont: {
        position: 'relative',
        color: 'black',
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    agreementCheck: {
        height: 30,
        width: 30,
    },
    agreementFontSmall: {
        position: 'relative',
        color: 'black',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 5
    },
    agreementCheckSmall:{
        height: 20,
        width: 20,
        marginRight: 5,
    },
    lastAgreementBorder: {
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },
    commChecks:{
        marginLeft: -25,
        marginTop: -3
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

  export default AgreementPage;