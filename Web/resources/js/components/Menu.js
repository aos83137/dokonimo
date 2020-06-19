import React from 'react';
import {BrowserRouter,Router, Route} from 'react-router-dom'
import LeftSideBar from '../animations/LeftSideBar';
import Matome from '../pages/Matome'

class Menu extends React.Component {
    render(){
        return (
            <BrowserRouter>
              <LeftSideBar />
              <Matome />
            </BrowserRouter>
          );
    }
}

export default Menu;