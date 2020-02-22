import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const IC_ARR_DOWN = require('../images/downArrow.png');
const IC_ARR_UP = require('../images/upArrow.png');

class FAQ extends React.Component {
    state = {
        contents: [
            {
                title: '질문질문질문질문질문질문?',
                body: 'Hi. I love this component. What do you think?',
            },
            {
                title: '회원탈퇴는 어떻게 하나요?',
                body: 'Yes. You can have more items.',
            },
            {
                title: '질문질문질문질문질문질문?',
                body: 'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?',
            },
            {   
                title: '회원탈퇴는 어떻게 하나요?',
                body: 'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?',
            },
            {
                title: '질문질문질문질문질문질문?',
                body: 'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?',
            },
          ],
    }
    
    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>FAQ</Text>
                    <View style={styles.fillerContainer}/>
                </View>
                    <ScrollView style={styles.dropDownContainer}>
                    {
                    this.state.contents
                    ? this.state.contents.map((param, i) => {
                        return (
                        <DropDownItem
                            key={i}
                            style={styles.dropDownItem}
                            contentVisible={false}
                            invisibleImage={IC_ARR_DOWN}
                            visibleImage={IC_ARR_UP}
                            header={
                            <View style={styles.header}>
                                <Text style={styles.headerText}><Text style={styles.qFont}>Q.</Text>{param.title}</Text>
                            </View>
                            }
                        >
                            <View style={styles.bodyContainer}>
                                <Text style={styles.bodyText}>{param.body}</Text>
                            </View>
                        </DropDownItem>
                        );
                    })
                    : null
                    }
                    <View style={{ height: 96 }}/>
                    </ScrollView>         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginLeft: -20
    },
    backArrowContainer: {
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
    dropDownContainer: {
        alignSelf: 'stretch', 
        marginTop: 10,
    },
    dropDownItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        marginTop: 10
    },
    header: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    qFont: {
        fontSize: 16,
        color: '#FF6900'
    },
    headerText: {
        fontSize: 16,
        color: '#323232',
        marginRight: 60,
        flexWrap: 'wrap',
    },
    bodyContainer: {
        height: 150, 
        width: SCREEN_WIDTH+15, 
        marginLeft: -15, 
        alignSelf: 'stretch', 
        backgroundColor: '#FAFAFA',
        paddingTop: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingRight: 20
    },
    bodyText: {
        fontSize: 14,
        color: '#555555',
        marginLeft: 30,
    },
    
  });

  export default FAQ;