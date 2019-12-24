import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import Home from '../screens/home/Home/home'
import Login from '../screens/home/Login';
import SignUp from '../screens/home/SignUp';



const StackNavigator = createStackNavigator({
    Login: { screen: Login },
    Home: { screen: Home },
    SignUp: { screen: SignUp },
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            drawerLockMode: 'locked-closed'
        },
    });


const Navigation = createAppContainer(StackNavigator)

export default Navigation;