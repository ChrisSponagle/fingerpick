import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const SCREEN_WIDTH = Dimensions.get('window').width

// import styles, { header, button } from './styles';
  // const { wrapper, container } = styles;

class AgreementCheck extends Component {
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
    agreementSixUncheck: true,
    agreementSixCheck: false,
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
        if (this.state.agreementOneCheck && this.state.agreementTwoCheck === true) {
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

// clickedCheckAll = () => {
//     //if anything is unchecked, check all. if all checked, uncheck all
//     if (this.state.agreementOneUncheck || this.state.agreementTwoUncheck || this.state.agreementThreeUncheck || this.state.agreementFourUncheck || 
//         this.state.agreementFiveUncheck === true) {
//         this.setState({
//             agreementUncheckAll: false,
//             agreementCheckAll: true,
//             agreementOneUncheck: false,
//             agreementOneCheck: true,
//             agreementTwoUncheck: false,
//             agreementTwoCheck: true,
//             agreementThreeUncheck: false,
//             agreementThreeCheck: true,
//             agreementFourUncheck: false,
//             agreementFourCheck: true,
//             agreementFiveUncheck: false,
//             agreementFiveCheck: true,
//             agreementSixUncheck: false,
//             agreementSixCheck: true,
//         });
//     }
//     else {
//         this.setState({
//             agreementUncheckAll: true,
//             agreementCheckAll: false,
//             agreementOneUncheck: true,
//             agreementOneCheck: false,
//             agreementTwoUncheck: true,
//             agreementTwoCheck: false,
//             agreementThreeUncheck: true,
//             agreementThreeCheck: false,
//             agreementFourUncheck: true,
//             agreementFourCheck: false,
//             agreementFiveUncheck: true,
//             agreementFiveCheck: false,
//             agreementSixUncheck: true,
//             agreementSixCheck: false,
//         })
//     }
//     this.checkButton()
// }
clickedOneCheck = () => {
    this.setState({
        agreementOneUncheck: !this.state.agreementOneUncheck,
        agreementOneCheck: !this.state.agreementOneCheck,
    })
    this.checkButton()    
}

clickedTwoCheck = () => {
    this.setState({
        agreementTwoUncheck: !this.state.agreementTwoUncheck,
        agreementTwoCheck: !this.state.agreementTwoCheck,
    })
    this.checkButton()        

}    
// clickedThreeCheck = () => {
//     this.setState({
//         agreementThreeUncheck: !this.state.agreementThreeUncheck,
//         agreementThreeCheck: !this.state.agreementThreeCheck
//     });
//     this.checkButton()        

// }
// clickedFourCheck = () => {
//     this.setState({
//         agreementFourUncheck: !this.state.agreementFourUncheck,
//         agreementFourCheck: !this.state.agreementFourCheck
//     });

//     this.checkButton()        

// }
// clickedFiveCheck = () => {
//     this.setState({
//         agreementFiveUncheck: !this.state.agreementFiveUncheck,
//         agreementFiveCheck: !this.state.agreementFiveCheck
//     });
// }
// clickedSixCheck = () => {
//     this.setState({
//         agreementSixUncheck: !this.state.agreementSixUncheck,
//         agreementSixCheck: !this.state.agreementSixCheck
//     });
// }
  
  render() {
  return (
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.navigate('Home')}>
                        <Image style={styles.backArrow} source={require('../../../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>약관동의</Text>
                    <View style={styles.fillerContainer}/>
                </View>
                <ScrollView style={{width: SCREEN_WIDTH, paddingBottom: 100}}>
                    <View style={styles.agreementContainer}>
                        <Text style={styles.agreementFont}><Text style={styles.underline}>만 14세 이상</Text>이며 약관에 동의합니다 (필수)</Text>
                        <TouchableOpacity onPress={() => this.clickedOneCheck()}>
                            {this.state.agreementOneUncheck && <Image style={styles.agreementCheck} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementOneCheck && <Image style={styles.agreementCheck} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.firstAgreementContainer}>
                        <TouchableOpacity onPress={() => this.clickedTwoCheck()}>
                            {this.state.agreementTwoUncheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementTwoCheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                        <View style={styles.agreementFontSmallContainer}>
                            <Text style={styles.agreementFontSmall}>핑거픽 이용 약관 (필수)</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Text style={styles.readMore}>전문보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.agreementContainer}>
                        {/* <Text style={styles.agreementFont}><Text style={styles.bold}>아래 약관에 모두 동의합니다.</Text></Text>
                        <TouchableOpacity onPress={() => this.clickedCheckAll()}>
                            {this.state.agreementUncheckAll && <Image style={styles.agreementCheck} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementCheckAll && <Image style={styles.agreementCheck} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity> */}
                    </View>
                    {/* <View style={styles.agreementContainer}>
                        <TouchableOpacity onPress={() => this.clickedThreeCheck()}>
                            {this.state.agreementThreeUncheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementThreeCheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                        <View style={styles.agreementFontSmallContainer}>
                            <Text style={styles.agreementFontSmall}>사진,앨범 서비스 이용 약관 (필수)</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Text style={styles.readMore}>전문보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.agreementContainer}>
                        <TouchableOpacity onPress={() => this.clickedFourCheck()}>
                            {this.state.agreementFourUncheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementFourCheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                        <View style={styles.agreementFontSmallContainer}>
                            <Text style={styles.agreementFontSmall}>개인정보 수집 / 이용 동의 (필수)</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Text style={styles.readMore}>전문보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.agreementContainer}>
                        <TouchableOpacity onPress={() => this.clickedFiveCheck()}>
                            {this.state.agreementFiveUncheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementFiveCheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                        <View style={styles.agreementFontSmallContainer}>
                            <Text style={styles.agreementFontSmall}>개인정보 수집 / 이용 동의 (선택)</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Text style={styles.readMore}>전문보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.agreementContainer, styles.lastAgreementBorder]}>
                        <TouchableOpacity onPress={() => this.clickedSixCheck()}>
                            {this.state.agreementSixUncheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/unclickedCheck.png')}/>}
                            {this.state.agreementSixCheck && <Image style={styles.agreementCheckSmall} source={require('../../../images/clickedCheck.png')}/>}
                        </TouchableOpacity>
                        <View style={styles.agreementFontSmallContainer}>
                            <Text style={styles.agreementFontSmall}>마케팅 이용 동의(선택)</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('AgreementReview')}>
                            <Text style={styles.readMore}>전문보기</Text>
                        </TouchableOpacity>
                    </View> */}
                    {this.state.notAllChecked && <View style={styles.nextButtonContainer}>
                        <View style={styles.nextButtonGray}>
                            <Text style={styles.nextText}>다음</Text>
                        </View>
                    </View>}
                    {this.state.allChecked &&<TouchableOpacity style={styles.nextButtonContainer} onPress={() => this.props.navigation.push('CertificationParams')}>
                        <LinearGradient colors={['#FD6708', '#D439B4']} start={[0, 1]} end={[1, 0]} style={styles.nextButtonColor}>
                            <View style={styles.nextButton}>
                                <Text style={styles.nextText}>다음</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>}
                </ScrollView>
            </View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backArrowContainer: {
    // marginTop: 50,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  backArrow: {
      height: 25,
      width: 15,
      marginRight: 5
  },
  fillerContainer: {
    marginRight: 15
  },
  headerContainter: {
      marginTop: 50,
      alignSelf: 'stretch',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      marginLeft: 20,
      marginRight: 20,
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
      marginLeft: 20,
      marginRight: 20,
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  agreementFont: {
      position: 'relative',
      color: 'black',
      fontSize: 16,
      alignSelf: 'flex-start',
      alignSelf: 'center'
  },
  bold:  {
      fontWeight: 'bold'
  },
  underline: {
        textDecorationLine: 'underline',
        fontWeight: 'bold'
  },
  agreementCheck: {
      height: 30,
      width: 30,
  },
  agreementFontSmallContainer: { 
        width: 240, 
        alignItems: 'flex-start', 
        justifyContent: 'center'
  },
  agreementFontSmall: {
      position: 'relative',
      color: 'black',
      fontSize: 16,
      marginLeft: 5,
  },
  readMore: {
      fontSize: 12,
      color: '#AAAAAA'
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
      paddingBottom: 50
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
export default AgreementCheck;