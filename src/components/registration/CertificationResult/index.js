import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { List, ListItem, Icon, Button, Text } from 'native-base';

import { resultStyles, resultSuccessStyles, resultFailureStyles } from '../styles';

export default class CertificationParams extends Component {
  constructor(props) {
    super(props);
   this.state = {
    };
  }
 
  render(){
    const response = this.props.navigation.state.params.response;
    const { success, imp_uid, merchant_uid, error_msg } = response;
    const { wrapper, title, listContainer, list, label, value } = resultStyles;

    const isSuccess = success === true;
    const { icon, btn, btnText, btnIcon } = isSuccess ? resultSuccessStyles : resultFailureStyles;
    return (
      <View style={wrapper}>
        <Icon
          style={icon}
          type='AntDesign'
          name={isSuccess ? 'checkcircle' : 'exclamationcircle'}
        />
        <Text style={title}>{`본인인증에 ${isSuccess ? '성공' : '실패'}하였습니다`}</Text>
        <List style={listContainer}>
          <ListItem style={list}>
            {/* <Text style={label}>아임포트 번호</Text> */}
            <Text style={value}></Text>
          </ListItem>
          {isSuccess ? (
            <View>
              {/* <ListItem style={list}>
                <Text style={label}>주문번호</Text>
                <Text style={value}>{merchant_uid}</Text>
              </ListItem> */}
              <Button
              bordered
              transparent
              style={btn}
              onPress={() => this.props.navigation.navigate('CreateProfile', {username: this.props.navigation.state.params.data.username, phone: this.props.navigation.state.params.data.phone})}
              >
                <Text style={btnText}>들어가기</Text>
                <Icon name='arrow-forward' style={btnIcon} />
            </Button>
            </View>
          ) : (
            <View>
              <ListItem style={list}>
                <Text style={label}>에러메시지</Text>
                <Text style={value}>{error_msg}</Text>
              </ListItem>
              <Button
              bordered
              transparent
              style={btn}
              onPress={() => this.props.navigation.navigate('AgreementCheck')}
              >
                <Icon name='arrow-back' style={btnIcon} />
                <Text style={btnText}>돌아가기</Text>
              </Button>
            </View>
          )}
        </List>
      </View>
    );
  }
}
