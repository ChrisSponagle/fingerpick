import React, { Component } from 'react';
// import IMP from 'iamport-react-native';
import IMP from '../iamport';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView, ImageBackground, Alert } from 'react-native';
import Loading from '../Loading';
import { Button } from 'native-base';

class Certification extends React.Component {
    state = {
        
    }

sendResponse(response) { 

    (async () => {
        const rawResponse = await fetch('http://15.164.112.15:4000/auth/certifications', {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imp_uid: response.imp_uid})
        });
        
        const content = await rawResponse;  
        content.json().then(data => {
          if (content.status === 200) { 
            this.props.navigation.replace('CertificationResult', { response, data })
          }
        })
    })()
    .catch(error=>Alert.alert(error.message)) 
      
}

// export default function Certification({ navigation }) {
  render() {
    // const params = navigation.getParam('params');
    return (
      <IMP.Certification
        userCode='imp24141498'
        loading={<Loading />}
        data={this.props.navigation.state.params.params}
        callback={response => this.sendResponse(response)}
      />
      // <View><Button title="CLICK" onPress={() => this.sendResponse()}/></View>
    );   
  }
}

export default Certification;
