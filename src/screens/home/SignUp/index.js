import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button'
import { connect } from 'react-redux';
import { userSignUp } from '../../../store/action/action'
import { bindActionCreators } from 'redux';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            email: '',
            password: '',
            fields: [
                {
                    label: 'Name',
                    name: 'user',
                    type: 'default',
                    placeholder: 'Enter your First Name',
                    value: 'firstName',
                    secure: false,
                    fontAwesome: true
                },
                {
                    label: 'E-mail',
                    name: 'email',
                    type: 'email-address',
                    placeholder: 'Enter your email',
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
                },
            ],
        };
    }

    onSignUp() {
        const { firstName, email, password } = this.state
        const { actions } = this.props
        var obj = {
            firstName,
            email,
            password
        }

        actions.userSignUp(obj).then((res) => {
            if (res) this.props.navigation.navigate('Home')
        }).catch((e) => alert(e))


    }

    onChange(value, items) {
        this.setState({
            [items]: value
        })

    }

    render() {
        const { fields } = this.state

        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1, width: '100%' }} >
                    <View style={{ paddingVertical: '10%' }}>
                        <Text style={styles.Heading}>Create a Account</Text>
                    </View>

                    <View style={styles.form}>
                        {
                            fields &&
                            fields.map((items, index) => {
                                return (
                                    <InputField
                                        key={index}
                                        label={items.label}
                                        name={items.name}
                                        type={items.type}
                                        secure={items.secure}
                                        value={this.state[items.value]}
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

                    <View style={[styles.button, { marginBottom: 10 }]}>
                        <Button
                            color={true}
                            border={false}
                            name={'Sign Up'}
                            background={true}
                            buttonAction={() => this.onSignUp()}
                            textColor={'white'}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#FDB8B0',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     // marginTop: 20
    // },
    container: {
        flex: 1,
        backgroundColor: '#FDB8B0',
        alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 20
    },

    Heading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 22,
        // fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#2A2D3A',
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
        color: '#2A2D3A',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18,
        borderRadius: 5,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginTop: 17,
        opacity: 1
    },
    signupimage: {
        width: 200,
        height: 160,
        marginTop: 50,
    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        // alignItems:'center'
        fontSize: 20
    },
    form: {
        // borderWidth: 1,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center'
    },

});
function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            userSignUp
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);