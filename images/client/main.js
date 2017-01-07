//Any JS in here is automatically run for us

// Import the React library
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageList from './components/image_list';

// Create a component
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { images: [] };
    }

    componentWillMount() {
        // Fantastic place to load data - ajax request
        axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
            .then(response => this.setState({ images: response.data.data }));
            //NEVER DO THIS-
            // this.state.images = [ {}, {} ];
    }

    render() {
        return (
            <div>
                <ImageList images={this.state.images}/>
            </div>
        );
    }
};

// Render this component to the screen
// by putting <App /> we create an instance of App
// we render the App to a div that has class="container"
Meteor.startup(() => { // wait until page (main.html) is loaded (DOM is loaded)
    ReactDOM.render(<App />, document.querySelector('.container'));    
});
