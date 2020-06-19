import React from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBIcon, MDBContainer } from "mdbreact";




class Header extends React.Component {
state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

logOut(e) {
  e.preventDefault()
  localStorage.removeItem('usertoken')
  this.props.history.push('/')
}

render() {
  const overlay = (
    <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
  );
  const loginLink = (
    <div id="classicformpage">
      <div>
        <MDBNavbar dark expand="md" fixed="top">
          <MDBContainer>
            <MDBNavbarBrand>
              <a className="navbar-brand"><a href="/"><img src="도코니모아이콘.png" alt="home" width="250px" height="60px" /></a></a>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
            <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/maps">マップ</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavLink to="/keeper_login">ログイン</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavLink to="/keeper_register">キッパー新規取得</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="twitter" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {this.state.collapseID && overlay}
      </div>
    </div>
  )
  const userLink = (
    <div id="classicformpage">
      <div>
        <MDBNavbar dark expand="md" fixed="top">
          <MDBContainer>
            <MDBNavbarBrand>
              <a className="navbar-brand"><a href="/"><img src="도코니모아이콘.png" alt="home" width="250px" height="60px" /></a></a>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
            <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/keepermenu/main">キッパーメニュー</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavLink to='' onClick={this.logOut.bind(this)}>ログアウト</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="twitter" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {this.state.collapseID && overlay}
      </div>
    </div>
  )
  if(localStorage.usertoken){
    return userLink;
  }
  else{
    return loginLink;
  }   
  }
}

export default Header;