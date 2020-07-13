import React, { useContext } from 'react'
import BurgerButton  from '../BurgerButton'
import { LeftSideBarContext } from '../index'
import { makeStyles } from '@material-ui/core/styles'
import './style.scss'

const useStyles = makeStyles((theme) => ({
  plus: {
    textDecoration: 'none',
    color: 'yellow',
    textSize: '20px',
  },
}));

const TopSection = () => {
  const classes = useStyles();
  const { setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className="LeftSideBar__TopSection">
      <BurgerButton
        onClick={() => setIsShowSidebar(true)}
      />
      <h3 style={{paddingLeft:'30px'}}>キッパーメニュー</h3>
      <a href='/' style={{textDecoration: 'none', color:'black'}}><h3 style={{paddingLeft:'500px'}}>DOKONIMO</h3></a>
    </div>
  );
};

export default TopSection;
