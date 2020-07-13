import React, { Fragment } from "react";
import { MDBNavLink, MDBMask, MDBRow, MDBIcon, MDBBtn, MDBView, MDBContainer,  MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact";
import 'animate.css';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
// import { ToastContainer, toast } from 'react-toastify';
import "../style/index.css";

class Home extends React.Component {

render() {
  const loginLink =(
      <div className="justify-content-center align-items-center gradient">
        <Header/>
        {/* <div>
          <img src="./home_main.jpg" alt="home" width="100%" height="500px" />
        </div> */}
        <div className="img-gradient">
          <MDBView>
            <img src="home_main.jpg" alt="home" width="100%" height="700px" />
            <Fragment>
              <div className="home_text">
                <MDBRow>
                  <MDBMask className="align-middle">
                    <h1 className="h1-responsive font-weight-bold p-6 col-example text-center text-white" color="white" style={{marginTop:"200px", height:"100px"}}>
                      スマートフォンで簡単に荷物を預けることができます。
                    </h1>
                  <MDBNavLink to="/createstore" style={{color:"white"}} >
                    <MDBBtn className="keeper_register" rounded color="primary"
                    style={{marginLeft:"750px", marginTop:"40px",width:"130px",height:"70px"}}>
                      <MDBIcon icon="store" className="mr-2"/>店舗登録
                    </MDBBtn>
                  </MDBNavLink>    
                  </MDBMask>
                </MDBRow>
              </div>
              </Fragment>
            </MDBView>
        </div>
        <div className="app_download col-sm-12 text-center" style={{borderTop: '3px solid #808080'}}>
          <div class="row">
            <div className="text-center" style={{marginLeft:'220px',marginTop: '30px',marginBottom: '30px'}}>
              <img class="col-md-3" width="300" alt="app" src="app.png"/>
              <img class="col-md-3" width="200" alt="app" src="app_store.png"/>   
            </div>                       
          </div>
        </div>
        <div className="container-fluid" style={{borderTop: '3px solid #808080',marginBottom: '30px'}}>
            <div className="row">
                <div className="col-sm-12 text-center" style={{ marginLeft:'650px', marginTop:'30px'}}>
                    <p className="h1" style={{marginBottom:'10px'}}>DOKONIMOの特徴</p>
                </div>
            </div>
            <div className="container" style={{marginRight:'450px'}}>
                <div class="row">
                    <div class="col-md-4"><img src="1.png" alt="" height="200px" width="300px" /></div>
                    <div class="col-md-4"><img src="2.png" alt="" height="200px" width="300px" /></div>
                    <div class="col-md-4"><img src="3.png" alt="" height="200px" width="300px" /></div>
                </div>
                <div class="row text-center" style={{ marginTop: '30px'}}>
                    <div class="col-md-4 h3">スマホから事前に予約</div>
                    <div class="col-md-4 h3">コインロッカー代わり</div>
                    <div class="col-md-4 h3">手ぶらで観光</div>
                </div>
            </div>
          </div>
            <div className="image-slot" style={{borderTop: '3px solid #808080'}}>
              <div className="image-body" style={{marginTop: '30px'}}>
                <MDBContainer>
                  <MDBCarousel
                    activeItem={1}
                    length={3}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1"
                  >
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        <MDBView>
                          <img
                            className="d-block w-100"
                            src="app_13.jpg"
                            alt="First slide"
                            height="600px"
                          />
                        </MDBView>
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId="2">
                        <MDBView>
                          <img
                            className="d-block w-100"
                            src="app_14.jpg"
                            alt="Second slide"
                            height="600px"
                          />
                        </MDBView>
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId="3">
                        <MDBView>
                          <img
                            className="d-block w-100"
                            src="app_15.jpg"
                            alt="Third slide"
                            height="600px"
                          />
                        </MDBView>
                      </MDBCarouselItem>
                    </MDBCarouselInner>
                  </MDBCarousel>
                </MDBContainer>
              </div>
            </div>
        <Footer/>
      </div>
      )

  const userLink =(
    <div className="justify-content-center align-items-center gradient">
      <Header/>
      {/* <div>
        <img src="./home_main.jpg" alt="home" width="100%" height="500px" />
      </div> */}
      <div className="img-gradient">
        <MDBView>
          <img src="home_main.jpg" alt="home" width="100%" height="700px" />
          <Fragment>
            <div className="home_text">
              <MDBRow>
                <MDBMask className="align-middle">
                  <h1 className="h1-responsive font-weight-bold p-6 col-example text-center text-white" color="white" style={{marginTop:"200px", height:"100px"}}>
                  スマートフォンで簡単に荷物を預けることができます。
                  </h1>  
                </MDBMask>
              </MDBRow>
            </div>
            </Fragment>
          </MDBView>
      </div>
      <div className="app_download col-sm-12 text-center" style={{borderTop: '3px solid #808080'}}>
        <div class="row">
          <div className="text-center" style={{marginLeft:'220px',marginTop: '30px',marginBottom: '30px'}}>
            <img class="col-md-3" width="300" alt="app" src="app.png"/>
            <img class="col-md-3" width="200" alt="app" src="app_store.png"/>   
          </div>                       
        </div>
      </div>
      <div className="container-fluid" style={{borderTop: '3px solid #808080',marginBottom: '30px'}}>
          <div className="row">
              <div className="col-sm-12 text-center" style={{ marginLeft:'650px', marginTop:'30px'}}>
                  <p className="h1" style={{marginBottom:'10px'}}>DOKONIMOの特徴</p>
              </div>
          </div>
          <div className="container" style={{marginRight:'450px'}}>
              <div class="row">
                  <div class="col-md-4"><img src="1.png" alt="" height="200px" width="300px" /></div>
                  <div class="col-md-4"><img src="2.png" alt="" height="200px" width="300px" /></div>
                  <div class="col-md-4"><img src="3.png" alt="" height="200px" width="300px" /></div>
              </div>
              <div class="row text-center" style={{ marginTop: '30px'}}>
                  <div class="col-md-4 h3">スマホから事前に予約</div>
                  <div class="col-md-4 h3">コインロッカー代わり</div>
                  <div class="col-md-4 h3">手ぶらで観光</div>
              </div>
          </div>
        </div>
          <div className="image-slot" style={{borderTop: '3px solid #808080'}}>
            <div className="image-body" style={{marginTop: '30px'}}>
              <MDBContainer>
                <MDBCarousel
                  activeItem={1}
                  length={3}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                >
                  <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="app_13.jpg"
                          alt="First slide"
                          height="600px"
                        />
                      </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="app_14.jpg"
                          alt="Second slide"
                          height="600px"
                        />
                      </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="app_15.jpg"
                          alt="Third slide"
                          height="600px"
                        />
                      </MDBView>
                    </MDBCarouselItem>
                  </MDBCarouselInner>
                </MDBCarousel>
              </MDBContainer>
            </div>
          </div>
      <Footer/>
    </div>
    )
      if(localStorage.usertoken){
        return loginLink;
      }
      else{
        return userLink;
      }   
  }
}
export default Home;
