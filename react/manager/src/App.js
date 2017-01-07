import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount(){
        const config = {
        apiKey: 'AIzaSyAlZavMgdFX8fI69VbKHnf3eUbFtoxIcEU',
        authDomain: 'manager-8a0f2.firebaseapp.com',
        databaseURL: 'https://manager-8a0f2.firebaseio.com',
        storageBucket: 'manager-8a0f2.appspot.com',
        messagingSenderId: '764227558781'
    };
  firebase.initializeApp(config);
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;