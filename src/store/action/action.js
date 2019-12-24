
import ActionTypes from '../constant/constant';
import firebase from 'react-native-firebase'


//login user 
export function login(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            console.log(user, 'user here')
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((success) => {
                console.log(success.user, 'success')
                dispatch({ type: ActionTypes.USERDATA, payload: success.user })
                resolve(true)

            })
                .catch((err) => {
                    console.log(err, 'err signup')
                    reject(err.message)
                })
            // dispatch({ type: ActionTypes.NAME, payload: 'abc' })

        })
    }
}


export function userSignUp(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log(user, 'user signup')

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((success) => {
                    console.log(success.user, 'success')
                    dispatch({ type: ActionTypes.USERDATA, payload: success.user })
                    resolve(true)

                })
                .catch((err) => {
                    console.log(err, 'err signup')
                    reject(err.message)
                })

        })
    }
}


export function signInWithGoogle(accessTokenData) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            const credential = firebase.auth.GoogleAuthProvider.credential(
                accessTokenData
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(function (user) {
                    console.log(user, 'user google')
                    // alert(JSON.stringify(user))
                    if (user && user.user) {
                        resolve(true)
                    }
                });

        })
    }
}