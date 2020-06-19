/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';
import { Link, Router, Route } from 'react-router-dom';

const LeftSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? 'show' : 'hide'}`}>
      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
        />  
      </div>
        <ul className="LeftSideBar__LeftSection__menuWrapper" onClick={() => setIsShowSidebar(false)}>
          <li>
            <Link to={'/keepermenu/main'}>メイン</Link>
          </li>
          <li>
            <Link to={'/keepermenu/reservationmanagement'}>予約管理</Link>
          </li>
          <li>
            <Link to={'/keepermenu/keepermanagement'}>店舗管理</Link>
          </li>
          <li>
            <Link to={'/keepermenu/reservationlist'}>予約リスト</Link>
          </li>
          <li>
            <Link to={'/keepermenu/paymentlist'}>決済リスト</Link>
          </li>
          <li>
            <Link to={'/keepermenu/profile'}>プロフィール</Link>
          </li>
          <li>
            <Link to={'/keepermenu/others'}>利用規約</Link>
          </li>
        </ul>
    </div>
  );
};

export default LeftSection;
