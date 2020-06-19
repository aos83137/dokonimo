import React from 'react';
import MainCards from '../Card/MainCards'
import Matome from './Matome'
import ReservationManagement from './ReservationManagement'
import KeeperManagement from './KeeperManagement'
import ReservationList from './ReservationList'
import PaymentList from './PaymentList'
import Profile from './Profile'
import Others from './Others'
import EditAsoCafe from '../Card/EditAsoCafe'
import EditTwoSome from '../Card/EditTwoSome'
import LeftSideBar from '../animations/LeftSideBar';

export default function Main() {

  return (
    <div>
      <LeftSideBar />
      <MainCards />
    </div>
  );
}