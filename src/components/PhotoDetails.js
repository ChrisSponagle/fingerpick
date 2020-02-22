import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'



class PhotoDetails extends React.Component {

    state ={
        isLoaded: true
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
    
    reportImage(reason) {
        (async () => {
            const rawResponse = await fetch('http://15.164.112.15:4000/reports', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({registration_id: this.props.navigation.state.params.item.registration_id, category: reason})
            });
            
            const content = await rawResponse;  
            // content.json().then(data => {
            //     this.setState({
            //         incomingData: [data],
            //     })
            //     Alert.alert(incomingData)
            // })
            if (content.status === 200) {
                                
                this.props.navigation.goBack(null)
            }
            })()
            .catch(error=>Alert.alert(error.message)) 
    }
    

    render() {
        return (
        <View style={styles.container}>
            
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
                    onPressOut={() => this.setState({adult: !this.state.adult})}
                    onPress={() => this.reportImage('adult')}>
                    <Text style={styles.reportFont}>성인물</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ this.state.unsuitable? styles.reportOptionsActive : styles.reportOptions}
                    onPressIn={() => this.setState({unsuitable: !this.state.unsuitable})}
                    onPressOut={() => this.setState({unsuitable: !this.state.unsuitable})}
                    onPress={() => this.reportImage('unsuitable')}>
                    <Text style={styles.reportFont}>부적합 이미지</Text>
                </TouchableOpacity>
                <View style={{height: 100}}/>
                <View style={styles.reportFooter}>
                    <Text>꾸준한 업데이트 및 앱개선에</Text>
                    <Text>도움이 됩니다</Text>
                </View>
            </View>}

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                    <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                </TouchableOpacity>
                <View style={styles.photoInfoContainer}>
                    <View style={styles.profilePhotoContainer}>
                        <Image style={styles.profilePhoto} source={{uri: imgUrl + 'profiles/'+ this.props.navigation.state.params.item.user_photo_filename}}/>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.username}>{this.props.navigation.state.params.item.nickname}</Text>
                        <Text style={styles.userIntro}>{this.props.navigation.state.params.item.introduction}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.setState({reportView: true})}>
                    <Image style={styles.reportIcon} source={require('../images/reportIcon.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <View
                 style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 250, width: SCREEN_WIDTH, marginTop: 10, padding: 10, position: 'absolute' }]}>
                    <Image style={{ flex: 1, height: undefined, width: undefined, resizeMode: 'contain', borderRadius: 20 }} source={{uri: imgUrl + 'registrations/' + this.props.navigation.state.params.challengeId + '/' + this.props.navigation.state.params.item.photo_filename}}  />
                </View>
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
        marginRight: 5,
        marginTop: 10
    },
    photoInfoContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        marginLeft: -95,
        padding: 20
    },
    profilePhotoContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'gray',
        marginLeft: -15,
    },
    profilePhoto: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    userInfoContainer: {
        marginLeft: 10,
        height: 25,
        justifyContent: 'center'
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    userIntro: {
        fontSize: 15,
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
    reportContainer: {
        position: 'absolute',
        backgroundColor: 'white', 
        height: 250,
        width: SCREEN_WIDTH/1.5,
        zIndex: 2000,
        top: SCREEN_HEIGHT*0.3,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#777777'
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

export default PhotoDetails;