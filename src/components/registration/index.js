import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Alert } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';

import { Container } from 'native-base';

import Header from './Header';
import AgreementCheck from './AgreementCheck';
import MainPage from '../MainPage';
import App from '../../../App';
// import PaymentTest from './PaymentTest';
// import Payment from './Payment';
// import PaymentResult from './PaymentResult';
import CertificationTest from './CertificationTest';
import Certification from './Certification';
import CertificationResult from './CertificationResult';

import NavigationService from './NavigationService';

const noHeader = {
  headerStyle: {
    height: 0,
  },
};

const hideHeader = {
  header: null,
};

class CertificationTestScreen extends React.Component {

  componentDidMount() {
  }
  render() {
    return(
      <CertificationTest navigation={this.props.navigation}/>
    );
  }
}
const AppNavigator = createStackNavigator({
  MainPage: {
    screen: MainPage,
    navigationOptions: noHeader,
  },
  AgreementCheck: {
    screen: AgreementCheck,
    navigationOptions: noHeader,
  },
  App: {
    screen: App,
    navigationOptions: noHeader,
  },
  // PaymentTest: {
  //   screen: PaymentTest,
  //   navigationOptions: hideHeader,
  // },
  // Payment: {
  //   screen: Payment,
  //   navigationOptions: noHeader,
  // },
  // PaymentResult: {
  //   screen: PaymentResult,
  //   navigationOptions: hideHeader,
  // },
  CertificationTest: {
    screen: CertificationTestScreen,
    navigationOptions: hideHeader,
  },
  Certification: {
    screen: Certification,
    navigationOptions: noHeader,
  },
  CertificationResult: {
    screen: CertificationResult,
    navigationOptions: hideHeader,
  },
}, {
  initialRouteName: 'AgreementCheck',
});

const AppContainer = createAppContainer(AppNavigator);

class Registration extends Component {

  constructor(props) {
    super(props);
   this.state = {
    isHeaderShow: false,
    headerTitle: '',
    currentScreen: 'Home',
    navigation: this.props.navigation,
    isLoadingComplete: false,
    

    } 
  }
  componentDidMount() {
    this.handleNavigation()
  }
  
  // const [isHeaderShow, setIsHeaderShow] = useState(false);
  // const [headerTitle, setHeaderTitle] = useState('');
  // const [currentScreen, setCurrentScreen] = useState('Home');

  // useEffect(() => {
  //   let headerTitle = '';
  //   let isHeaderShow = true;
  //   // if (currentScreen === 'PaymentTest') {
  //   //   headerTitle = '아임포트 결제 테스트';
  //   // } else 
  //   if (currentScreen === 'CertificationTest') {
  //     headerTitle = '아임포트 본인인증 테스트';
  //   } else {
  //     isHeaderShow = false;
  //   }

  //   setIsHeaderShow(isHeaderShow);
  //   setHeaderTitle(headerTitle);
  // }, [currentScreen]);

  handleNavigation(prevState, newState) {
    const { routes } = newState;
    const { routeName } = routes[routes.length - 1];
    if (this.state.currentScreen !== routeName) {
      setCurrentScreen(routeName);
    }    
  }
   handleNavigation() {
    this.setState({
      currentScreen: 'CertificationTest',
      animations: {
        push: {
          enabled: false
        }
      }
    })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      await Asset.loadAsync(images),
      // await Font.loadAsync({
      //   // This is the font that we are using for our tab bar
        // ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
        // 'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf'),
      //   'Roboto_medium 2': require('./assets/fonts/Roboto_medium 2.ttf'),

      // }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
    return (
      <Container>
        {/* {this.state.isHeaderShow && <Header title={headerTitle} />} */}
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={this.handleNavigation.bind(this)}
        />
      </Container>
    );
      }
  }
}

export default Registration;
