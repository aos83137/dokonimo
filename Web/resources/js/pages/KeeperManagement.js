import React from 'react'
import {Link, Route, BrowserRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { MDBBtn } from "mdbreact";
import '../../../node_modules/mdbreact/dist/css/mdb.css'
import CardMatome from '../Card/CardMatome'
import LeftSideBar from '../animations/LeftSideBar';
import CreateStore from '../Card/CreateStore';

const useStyles = makeStyles((theme) => ({
  plus: {
    marginLeft:"52%",
    marginTop:"70px",
  },
}));

const KeeperManagement = () => {
    const classes = useStyles();

    return (
        <div>
          <LeftSideBar />
          <CardMatome />
          <MDBBtn href="/createstore" gradient="aqua" className={classes.plus}>追加</MDBBtn>
          <Route path='/createstore' component={CreateStore}/>
        </div>
    );
};

export default KeeperManagement;