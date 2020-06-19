import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import {BrowserRouter,Router, Route, HashRouter} from 'react-router-dom';
import Home from './Home';
import '../style/App.css';
import Maps from './Maps';
import Menu from './Menu'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import ReactNotifications from 'react-notifications-component'
import Matome from '../pages/Matome'
import Matome2 from '../pages/Matome2'
import Register from '../register/Register'
import Login from '../register/Login'
import CreateStore from '../Card/CreateStore'
import ReservationManagement from '../pages/ReservationManagement'
import KeeperManagement from '../pages/KeeperManagement'
import ReservationList from '../pages/ReservationList'
import PaymentList from '../pages/PaymentList'
import Profile from '../pages/Profile'
import Others from '../pages/Others'
import EditAsoCafe from '../Card/EditAsoCafe'
import EditTwoSome from '../Card/EditTwoSome'
import EditCgvHyun from '../Card/EditCgvHyun';

const config =  { 
    apiKey: "AIzaSyDaeJwtorHi3g-ytqU9bn5cjFhKO-2kbIE",
    authDomain: "maptest3-b3603.firebaseapp.com",
    databaseURL: "https://maptest3-b3603.firebaseio.com",
    projectId: "maptest3-b3603",
    storageBucket: "maptest3-b3603.appspot.com",
    messagingSenderId: "676243801867",
    appId: "1:676243801867:web:6f42292da369edb204c40e",
    measurementId: "G-DPDEPVDBG7"
}; 
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
	console.log('허가!');
	return messaging.getToken(); //토큰을 받는 함수를 추가!
})
.then(function(token) {
	console.log(token); //토큰을 출력!
})
.catch(function(err) {
	console.log('fcm에러 : ', err);
})

messaging.onMessage(function(payload){
	console.log(payload.notification.title);
	console.log(payload.notification.body);
})


class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ReactNotifications/>
                <Route exact path="/" component={Home}/>
                <Route path='/keepermenu/main' component={Matome2}/>
                <Route path='/maps' component={Maps}/>
                <Route path='/keeper_register' component={Register}/>
                <Route path='/keeper_login' component={Login}/>
                <Route exact path='/createstore' component={CreateStore}/>
                <Route path='/keepermenu/reservationmanagement' component={ReservationManagement}/>
                <Route path='/keepermenu/keepermanagement' component={KeeperManagement}/>
                <Route path='/keepermenu/reservationlist' component={ReservationList}/>
                <Route path='/keepermenu/paymentlist' component={PaymentList}/>
                <Route path='/keepermenu/profile' component={Profile}/>
                <Route path='/keepermenu/others' component={Others}/>
                <Route path='/keepermenu/kpmanagement/edit/1' component={EditAsoCafe}/>
                <Route path='/keepermenu/kpmanagement/edit/2' component={EditTwoSome}/>
                <Route path='/keepermenu/kpmanagement/edit/3' component={EditCgvHyun}/>
            </BrowserRouter>
          );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

