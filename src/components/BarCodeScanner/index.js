import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, Alert, TouchableOpacity,
    Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';


class BarScanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            torchOn: false
        }
    }


    onBarCodeRead = (e) => {
        console.log(e, 'eee')
        Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    // torchMode={this.state.torchOn ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                >
                    <Text style={{
                        backgroundColor: 'white'
                    }}>BARCODE SCANNER</Text>
                </RNCamera>
                {/* <View style={styles.bottomOverlay}>
                    <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
                        <Image style={styles.cameraIcon}
                            source={this.state.torchOn === true ? require('../../images/flasher_on.png') : require('../../images/flasher_off.png')} />
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }


}


export default BarScanner;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
});