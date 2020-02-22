import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, AsyncStorage, Alert  } from 'react-native';
import { createAppContainer, NavigationActions, StackActions, StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AppLoading, Font, Icon } from 'expo';
import Asset from 'expo-asset';
import HomePage from './src/components/HomePage';
// import AgreementPage from './src/components/AgreementPage';
import AgreementCheck from './src/components/registration/AgreementCheck';
import CertificationParams from './src/components/registration/CertificationParams';
import Certification from './src/components/registration/Certification';
import CertificationResult from './src/components/registration/CertificationResult';
import MobileNumber from './src/components/MobileNumber';
import ConfirmNumber from './src/components/ConfirmNumber';
import CreateProfile from './src/components/CreateProfile';
import MainPage from './src/components/MainPage';
import VotePage from './src/components/VotePage';
import PhotoDetails from './src/components/PhotoDetails';
import Ranking from './src/components/Ranking';
import Challenges from './src/components/Challenges';
import Notices from './src/components/Notices';
import Profile from './src/components/Profile';
import EventPage from './src/components/EventPage';
import CurrentChallenges from './src/components/CurrentChallenges';
import FutureChallenges from './src/components/FutureChallenges';
import MyChallenges from './src/components/MyChallenges';
import ChallengeRanking from './src/components/ChallengeRanking';
import Announcement from './src/components/Announcement';
import FAQ from './src/components/FAQ';
import EditProfile from './src/components/EditProfile';
import ContactInfo from './src/components/ContactInfo';
import AgreementInfo from './src/components/AgreementInfo';
import AgreementReview from './src/components/AgreementReview';
import images from './LocalImages';

// import { SecureStore } from 'expo';

console.disableYellowBox = true;
class HomePageScreen extends React.Component {
  render() {
    return (
      <HomePage navigation={this.props.navigation}/>
      //   <TouchableOpacity style={styles.signupHighlight} underlayColor={'white'} onPress={() => this.props.navigation.navigate('Register')}>   
    );
  }  
}

class AgreementCheckScreen extends React.Component {
  render() {
    return ( 
      <AgreementCheck navigation={this.props.navigation}/>
    );
  }  
}

class CertificationParamsScreen extends React.Component {
  render() {
    return ( 
      <CertificationParams navigation={this.props.navigation}/>
    );
  }  
}

class CertificationScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '',
    headerStyle: {height: 0}
  }
  render() {
    return ( 
      <Certification navigation={this.props.navigation}/>
    );
  }  
}

class CertificationResultScreen extends React.Component {
  render() {
    return ( 
      <CertificationResult navigation={this.props.navigation}/>
    );
  }  
}

class MobileNumberScreen extends React.Component {
  render() {
    return (
      <MobileNumber navigation={this.props.navigation}/>
    );
  }  
}

class ConfirmNumberScreen extends React.Component {
  render() {
    return (
      <ConfirmNumber navigation={this.props.navigation}/>
    );
  }  
}

class CreateProfileScreen extends React.Component {
  render() {
    return(
      <CreateProfile navigation={this.props.navigation}/>
    );
  }
}

class MainPageScreen extends React.Component {
  render() {
    return(
      <MainPage navigation={this.props.navigation}/>
    );
  }
}

class VotePageScreen extends React.Component {
  render() {
    return(
      <VotePage navigation={this.props.navigation}/>
    );
  }
}

class PhotoDetailsScreen extends React.Component {
  render() {
    return(
      <PhotoDetails navigation={this.props.navigation}/>
    );
  }
}

class RankingScreen extends React.Component {
  render() {
    return(
      <Ranking navigation={this.props.navigation}/>
    );
  }
}

class ChallengesScreen extends React.Component {
  render() {
    return(
      <Challenges navigation={this.props.navigation}/>
    );
  }
}

class NoticeScreen extends React.Component {
  render() {
    return(
      <Notices navigation={this.props.navigation}/>
    );
  }
}

class AnnouncementScreen extends React.Component {
  render() {
    return(
      <Announcement navigation={this.props.navigation}/>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return(
      <Profile navigation={this.props.navigation}/>
    );
  }
}

class EventScreen extends React.Component {
  render() {
    return(
      <EventPage navigation={this.props.navigation}/>
    );
  }
}

class CurrentChallengesScreen extends React.Component {
  render() {
    return(
      <CurrentChallenges navigation={this.props.navigation}/>
    );
  }
}

class FutureChallengesScreen extends React.Component {
  render() {
    return(
      <FutureChallenges navigation={this.props.navigation}/>
    );
  }
}

class MyChallengesScreen extends React.Component {
  render() {
    return(
      <MyChallenges navigation={this.props.navigation}/>
    );
  }
}

class ChallengeRankingScreen extends React.Component {
  render() {
    return(
      <ChallengeRanking navigation={this.props.navigation}/>
    );
  }
}

class FAQScreen extends React.Component {
  render() {
    return(
      <FAQ navigation={this.props.navigation}/>
    );
  }
}

class EditProfileScreen extends React.Component {
  render() {
    return(
      <EditProfile navigation={this.props.navigation}/>
    );
  }
}

class ContactInfoScreen extends React.Component {
  render() {
    return(
      <ContactInfo navigation={this.props.navigation}/>
    );
  }
}

class AgreementInfoScreen extends React.Component {
  render() {
    return(
      <AgreementInfo navigation={this.props.navigation}/>
    );
  }
}

class AgreementReviewScreen extends React.Component {
  render() {
    return(
      <AgreementReview navigation={this.props.navigation}/>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: {screen: HomePageScreen, navigationOptions: {header: null}},    
    AgreementCheck: {screen: AgreementCheckScreen, navigationOptions: {header: null}},
    CertificationParams: {screen: CertificationParamsScreen, navigationOptions: {header: null}},
    Certification: CertificationScreen,
    CertificationResult: {screen: CertificationResultScreen, navigationOptions: {header: null}},
    MobileNumber: {screen: MobileNumberScreen, navigationOptions: {header: null}},
    ConfirmNumber: {screen: ConfirmNumberScreen, navigationOptions: {header: null}},
    CreateProfile: {screen: CreateProfileScreen, navigationOptions: {header: null}},
    MainPage: {screen: MainPageScreen, navigationOptions: {header: null}},
    VotePage: {screen: VotePageScreen, navigationOptions: {header: null}},
    PhotoDetails: {screen: PhotoDetailsScreen, navigationOptions: {header: null}},
    Ranking: {screen: RankingScreen, navigationOptions: {header: null}},
    Challenges: {screen: ChallengesScreen, navigationOptions: {header: null}},
    Notices: {screen: NoticeScreen, navigationOptions: {header: null}},
    Announcement: {screen: AnnouncementScreen, navigationOptions: {header: null}},
    Profile: {screen: ProfileScreen, navigationOptions: {header: null}},
    EventPage: {screen: EventScreen, navigationOptions: {header: null}},
    CurrentChallenges: {screen: CurrentChallengesScreen, navigationOptions: {header: null}},
    FutureChallenges: {screen: FutureChallengesScreen, navigationOptions: {header: null}},
    MyChallenges: {screen: MyChallengesScreen, navigationOptions: {header: null}},
    ChallengeRanking: {screen: ChallengeRankingScreen, navigationOptions: {header: null}},
    FAQ: {screen: FAQScreen, navigationOptions: {header: null}},
    EditProfile: {screen: EditProfileScreen, navigationOptions: {header: null}},
    ContactInfo: {screen: ContactInfoScreen, navigationOptions: {header: null}},
    AgreementInfo: {screen: AgreementInfoScreen, navigationOptions: {header: null}},
    AgreementReview: {screen: AgreementReviewScreen, navigationOptions: {header: null}}
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'none'
  }
);

const RootStackLoggedIn = createStackNavigator(
  {
    Home: {screen: HomePageScreen, navigationOptions: {header: null}},    
    AgreementCheck: {screen: AgreementCheckScreen, navigationOptions: {header: null}},
    CertificationParams: {screen: CertificationParamsScreen, navigationOptions: {header: null}},
    Certification: CertificationScreen,
    CertificationResult: {screen: CertificationResultScreen, navigationOptions: {header: null}},
    MobileNumber: {screen: MobileNumberScreen, navigationOptions: {header: null}},
    ConfirmNumber: {screen: ConfirmNumberScreen, navigationOptions: {header: null}},
    CreateProfile: {screen: CreateProfileScreen, navigationOptions: {header: null}},
    MainPage: {screen: MainPageScreen, navigationOptions: {header: null}},
    VotePage: {screen: VotePageScreen, navigationOptions: {header: null}},
    PhotoDetails: {screen: PhotoDetailsScreen, navigationOptions: {header: null}},
    Ranking: {screen: RankingScreen, navigationOptions: {header: null}},
    Challenges: {screen: ChallengesScreen, navigationOptions: {header: null}},
    Notices: {screen: NoticeScreen, navigationOptions: {header: null}},
    Announcement: {screen: AnnouncementScreen, navigationOptions: {header: null}},
    Profile: {screen: ProfileScreen, navigationOptions: {header: null}},
    EventPage: {screen: EventScreen, navigationOptions: {header: null}},
    CurrentChallenges: {screen: CurrentChallengesScreen, navigationOptions: {header: null}},
    FutureChallenges: {screen: FutureChallengesScreen, navigationOptions: {header: null}},
    MyChallenges: {screen: MyChallengesScreen, navigationOptions: {header: null}},
    ChallengeRanking: {screen: ChallengeRankingScreen, navigationOptions: {header: null}},
    FAQ: {screen: FAQScreen, navigationOptions: {header: null}},
    EditProfile: {screen: EditProfileScreen, navigationOptions: {header: null}},
    ContactInfo: {screen: ContactInfoScreen, navigationOptions: {header: null}},
    AgreementInfo: {screen: AgreementInfoScreen, navigationOptions: {header: null}},
    AgreementReview: {screen: AgreementReviewScreen, navigationOptions: {header: null}}
  },
  {
    initialRouteName: 'MainPage',
    // headerMode: 'none'
  }
);

const RegisterStack = createAppContainer(RootStack);
const LoggedInStack = createAppContainer(RootStackLoggedIn);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn: false,
    logCheck: false
  }

  componentWillMount = async () => {
    this.login()
}
login = async () => {
    // await AsyncStorage.removeItem('username');
    const value = await AsyncStorage.getItem('username');
        if (value === null) {
          this.setState({
            loggedIn: false,
            logCheck: true
          })
        }
        else {   
            (async () => {
                const rawResponse = await fetch('http://15.164.112.15:4000/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: value})
                });
                
                const content = await rawResponse;  
            
                if (content.status === 200) {
                    const accessToken = content.headers.map['set-cookie']
                    
                    this.setState({
                      loggedIn: true,
                      logCheck: true
                    })
                }
            })()
            .catch(error=>Alert.alert(error.message)) 
        }
  }
  
    _loadResourcesAsync = async () => {
      return Promise.all([
        await Asset.loadAsync(images),
        await Font.loadAsync({
          // This is the font that we are using for our tab bar
          // ...Icon.Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf'),
          'Roboto_medium 2': require('./assets/fonts/Roboto_medium 2.ttf'),

        }),
      ]);
    };
  
    _handleLoadingError = error => {
      console.warn(error);
    };
  
    _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
    };
  
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen && !this.state.logCheck) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 
    else if (this.state.loggedIn === false) {
      return (
        <RegisterStack/>
      );
    }
    else {  
      return (
        <LoggedInStack/>
      )
    }
  }
}
