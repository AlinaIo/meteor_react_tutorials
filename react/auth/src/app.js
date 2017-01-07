import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDX-xtFSFE9T-D14hFf4oY-OHd1-_z33A4",
            authDomain: "authentication-97a9d.firebaseapp.com",
            databaseURL: "https://authentication-97a9d.firebaseio.com",
            storageBucket: "authentication-97a9d.appspot.com",
            messagingSenderId: "695441471986"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Spinner size="large" />
                    </View>
                    );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;