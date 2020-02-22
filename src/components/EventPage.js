import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const imgUrl = 'https://fingerpik.s3.ap-northeast-2.amazonaws.com/'

import { TouchableOpacity } from 'react-native-gesture-handler';

class EventPage extends React.Component {

    constructor() {
        super()
        this.state = {
            eventImage: '',
            eventButton: false
        }
    }

    
    componentWillMount() {
        if (this.props.navigation.state.params.ad.challenge_flag === 0) {
            this.setState({eventButton: false})
        }
        else {this.setState({eventButton: true})}
        
        this.setState({
            eventImage:  imgUrl + 'ads/' + this.props.navigation.state.params.ad.ad_img_filename
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.navigate('MainPage')}>
                    <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                </TouchableOpacity>
                <View style={styles.eventHeader}>
                    <Text style={styles.eventText}>EVENT</Text>
                </View>
                <View style={styles.fillerContainer}/>
            </View> 
             <View style={styles.eventImageContainer}>
                <Image style={styles.eventImage} source={{uri: this.state.eventImage}}/>
            </View>
            {this.state.eventButton && <TouchableOpacity activeOpacity={0.85} style={styles.eventButton} onPress={() => this.props.navigation.navigate('CurrentChallenges')}>
                <Text style={styles.eventButtonText}>지금 바로 참여하러가기</Text>
            </TouchableOpacity>}
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
        position: 'absolute',
        zIndex: 5,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
    },
    backArrowContainer: {
        position: 'relative',
        zIndex: 200,
        height: 30,
        width: 30,
        marginLeft: 20,
        marginTop: 60,
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backArrow: {
        height: 25,
        width: 15,
    },
    eventHeader: {
        position: 'relative',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    eventText: {
        fontSize: 20,
    },
    fillerContainer: {
        position: 'relative',
        zIndex: 200,
        height: 30,
        width: 30,
        marginRight: 20,
        marginTop: 50,
    },
    eventImageContainer: {
        flex: 1, 
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH
    },
    eventImage: {
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH,
        resizeMode: 'contain'
    },
    eventButton: {
        backgroundColor: 'black',
        height: 100,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
    eventButtonText: {
        fontSize: 20,
        color: 'white'
    }
});

export default EventPage;