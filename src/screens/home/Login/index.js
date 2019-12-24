import React, { useReducer } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, KeyboardAvoidingView, Dimensions, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { bindActionCreators } from 'redux';
import { signInWithGoogle, login } from '../../../store/action/action'
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '433343540518-e710u0d5bef1sp5r0oloavaniqnumcm4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

let { height, width } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fields: [
                {
                    label: 'E-mail',
                    name: 'email',
                    type: 'email-address',
                    placeholder: 'Enter your Email',
                    value: 'email',
                    secure: false,
                    fontAwesome: false
                },
                {
                    label: 'Password',
                    name: 'key',
                    type: 'ascii-capable',
                    placeholder: 'Password',
                    value: 'password',
                    secure: true,
                    fontAwesome: true
                }
            ],
            email: 'abc@gmail.com',
            password: 'abc123',
        };
    }

    _Login() {
        const { password, email } = this.state;
        const obj = {
            email,
            password
        }
        this.setState({ loading: true })
        this.props.actions.login(obj)
            .then(() => {
                alert('Successfully Login')
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: "Home" }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch((i) => {
                this.setState({ loading: false })
                alert(i)

            })
    }

    onChange(value, items) {
        this.setState({
            [items]: value
        })

    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log(userInfo, 'userinfo')
            if (userInfo && userInfo.idToken) {
                const token = userInfo.idToken
                const { actions } = this.props

                actions.signInWithGoogle(token).then((res) => {
                    if (res) this.props.navigation.navigate('Home')
                })
            }

        } catch (error) {
            console.log(error, 'error')
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    render() {
        const { fields, loading } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} enabled >

                {loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                    :
                    <ScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardDismissMode="interactive"
                    >
                        <View style={{ paddingVertical: '10%' }}>
                            <Text style={styles.Heading}>{'Log Into App'}</Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: '5%', alignItems: 'center' }}>

                            {
                                fields &&
                                fields.map((items, index) => {
                                    return (
                                        <InputField
                                            key={index}
                                            label={items.label}
                                            name={items.name}
                                            defaultValue={items.value}
                                            value={this.state[items.value]}
                                            secure={items.secure}
                                            fontAwesome={items.fontAwesome}
                                            placeholder={items.placeholder}
                                            PlaceholderColor={'#3d423d'}
                                            iconColor={'grey'}
                                            change={(value) => this.onChange(value, items.value)}
                                        />
                                    )
                                })
                            }

                        </View>

                        <View style={styles.button}>
                            <Button
                                color={true}
                                border={false}
                                name={'Log In'}
                                background={true}
                                buttonAction={() => this._Login()}
                                textColor={'white'}
                            />
                        </View>
                        <View style={[styles.button, { marginBottom: 10 }]}>
                            <Button
                                color={true}
                                border={false}
                                name={'Create Account'}
                                background={true}
                                buttonAction={() => this.props.navigation.navigate('SignUp')}
                                textColor={'white'}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                {'OR'}
                            </Text>
                        </View>
                        <View style={{ paddingVertical: '2%', alignItems: 'center' }}>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this._signIn}
                            // disabled={this.state.isSigninInProgress} 
                            />
                        </View>
                    </ScrollView>
                }
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDB8B0',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // position: 'absolute'
    },
    Heading: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2A2D3A',
        textAlign: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        opacity: 1
    },
    imageView: {
        width: width,
        height: height / 2.6,
        alignItems: "center",
        justifyContent: 'flex-end'
    },
    signupimage: {
        height: '90%',
        width: '90%',
        // marginTop: 30,
    },
})


function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            signInWithGoogle, login
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);