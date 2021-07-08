import React, {Component} from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : ''
        }
    }

    realizarLogin = async () => {
        console.warn(this.state.email + ' ' + this.state.senha);

        try {
            
            const resposta = await api.post('/login', {
                email : this.state.email,
                senha : this.state.senha,
            });
    
            const token = resposta.data.token;
            
            console.warn(token);
            
            await AsyncStorage.setItem('userToken', token);
            
            this.props.navigation.navigate('Main');

        } catch (error) {
            console.warn(error)
        }
    };

    render(){
        return (
            <ImageBackground
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.overlay} />
                <View style={styles.main}>
                <View style={styles.borda}>
                    <Image 
                        source={require('../../assets/img/logo.png')}
                        style={styles.mainImgLogin}
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        keyboardType='email-address'
                        fontfamily= "Cairo"
                        fontstyle= "normal"
                        fontweight= "normal"
                        fontsize= "24px"
                        lineheight= "2px"
                        onChangeText={email => this.setState({ email })}
                        
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder="Senha"
                        placeholderTextColor="#000000"
                        secureTextEntry={true}

                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.realizarLogin}
                    >
                        <Text style={styles.btnLoginText}>Login</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFF'

    },

    // conteúdo da main
    main: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
     
    },

    borda:{
        width: 333,
        height: 477,
  //      backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    mainImgLogin: {
        
        height: 90,
        width: 90,
        margin: 60,
        marginTop: 0
    },

    inputLogin: {
        width: 240,
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 18,
        color: '#000000',
        borderBottomColor: '#000000',
        borderBottomWidth: 2,
        fontFamily: 'Arial',
        fontSize: 14,
        letterSpacing: 2,
        textDecorationLine: 'none'
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 240,
        backgroundColor: '#000',
        
       
        borderRadius: 4,
        
        marginTop: 20
    },

    btnLoginText: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: '#FFF',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontfamily: "Cairo",
        fontstyle: "normal",
        fontweight: "normal",
        fontsize: "24px",
        lineheight: "2px"
    }
  
});