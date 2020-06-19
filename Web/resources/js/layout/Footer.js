import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="stylish-color"  className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">DOKONIMO</h5>
            <p style={{color:'white'}}>
            We will be a company that constantly develops for the comfort and comfort of your travels.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">会社情報</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">会社ホームページ</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">会社概要</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">採用情報</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">その他</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">利用規約</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">プライバシーポリシー</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">お問い合わせ</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;