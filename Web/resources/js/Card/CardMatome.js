import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter,Router, Route} from 'react-router-dom'
import MediaCard from './MediaCard'


class Matome extends React.Component {
    render(){
        return (
          <div>
            <MediaCard />
          </div>
        );
    }
}

export default Matome;