import React, { Component } from "react";
import ImageModal from "./ImageModal";
import { MDBBtn } from "mdbreact";
import axios from 'axios';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

class ModalLauncher extends Component {
  constructor(props){
    super(props);
    this.state={
      showModal: false, 
      photos : [],
    };
  }

  componentDidMount(){
    let $this = this;
    axios.get('/api/rphotos/35').then(response => {
      $this.setState({
        photos : response.data
        
      })
      console.log(this.state.photos) 
    }).catch(error => {
      console.log(error)
    });
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {

    return (
      <div>
        {/* <button
          type="button"
          className={classes.modalButton}
          onClick={() => this.handleToggleModal()}
        >
          {buttonLabel}
        </button> */}
        <MDBBtn outline color="danger" size="lg" onClick={() => this.handleToggleModal()} >写真</MDBBtn>

          {this.state.showModal && (
            <ImageModal onCloseRequest={() => this.handleToggleModal()}>
              {this.state.photos.map((photo,index)=>{
                <div style={{display: 'flex',flexDirection:'row'}}>
                  <img style={{marginLeft: '6%', marginTop:'12%', width:'20%', height:'50%'}} src= {photo.rphoto_url} />
                </div>
              })}
            </ImageModal>
          )}
      </div>
  );
}
}

export default ModalLauncher