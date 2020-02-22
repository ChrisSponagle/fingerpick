// import React, { useState } from 'react';
import React, { Component } from 'react';
import { Content, Form, Item, Label, Input, Button, Text } from 'native-base';
import {Alert} from 'react-native';
import Picker from '../Picker';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from '../NavigationService';
import { CARRIERS } from '../constants';
import { formStyles } from '../styles';
const { wrapper, form, item, label, input, btn, btnText } = formStyles;

class CertificationParams extends Component {
  constructor(props) {
        super(props);
       this.state = {
        merchantUid: 0,
        company: '핑거픽',
        carrier: '',
        name: '',
        phone: '',
        minAge: 14,
        navigation: this.props.navigation

        };
      }
  // const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  componentWillMount() {
    this.onPress()
  }
  onPress = () => {
    const params = {
      merchant_uid: this.state.merchantUid,
    };
      params.company = this.state.company;
    
      params.carrier = this.state.carrier;
    
      params.name = this.state.name;
    
      params.phone = this.state.phone;
    
      params.minAge = this.state.minAge;
    
    this.props.navigation.navigate('Certification', { params });
  };
render() {
  return (
    <Content style={{display: 'none'}}>
      <Form style={form}>
        <Item inlineLabel style={item}>
          <Label style={label}>주문번호</Label>
          <Input
            style={input}
            value={this.state.merchantUid}
            onChangeText={value => setMerchantUid(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>회사명</Label>
          <Input
            style={input}
            placeholder='또는 도메인'
            value={this.state.company}
            onChangeText={value => setCompany(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>통신사</Label>
          <Picker
            iosHeader='통신사 선택'
            data={CARRIERS}
            selectedValue={this.state.carrier}
            onValueChange={value => setCarrier(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>이름</Label>
          <Input
            style={input}
            value={this.state.name}
            onChangeText={value => setName(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>전화번호</Label>
          <Input
            style={input}
            keyboardType='number-pad'
            value={this.state.phone}
            onChangeText={value => setPhone(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>최소연령</Label>
          <Input
            style={input}
            keyboardType='number-pad'
            placeholder='허용 최소 만 나이'
            value={this.state.minAge}
            onChangeText={value => setMinAge(value)}
          />
        </Item>
        <Button
          primary
          style={btn}
          onPress={this.onPress}
        >
          <Text style={btnText}>본인인증 하기</Text>
        </Button>
      </Form>
    </Content>
  );  
}
}
export default CertificationParams;