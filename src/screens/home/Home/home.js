import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BarcodeScanner from '../../../components/BarCodeScanner';
import Barcode from 'react-native-barcode-builder';
import firebase from 'react-native-firebase';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            scan: false,
            uid: firebase.auth().currentUser.uid
        }
    }

    // componentDidMount() {
    //     const { name } = this.props
    //     this.setState({
    //         name
    //     })
    // }

    render() {
        const { scan } = this.state
        alert(this.state.uid)
        return (
            <View style={styles.container}>
                {
                    scan ?
                        <BarcodeScanner />
                        // <Text>{'hello'}</Text>
                        :
                        <View>
                            <TouchableOpacity onPress={() => this.setState({ scan: true })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        {'Click to Scan BarCode'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Barcode value={this.state.uid} format="CODE39" />

                            </View>

                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


function mapStateToProps(state) {
    return ({
        // name: state.authreducer.NAME,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // actions: bindActionCreators({
        //     auth
        // }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

