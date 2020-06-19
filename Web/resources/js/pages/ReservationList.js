import React, { Component,useState,Fragment } from 'react';
import { MDBBtn } from "mdbreact";
import axios from 'axios';
import LeftSideBar from '../animations/LeftSideBar'
import ModalLauncher from '../Modal/ModalLauncher'

class ReservationList extends Component {
  constructor(props){
    super(props);
    this.state={ 
      opened : true,
      reserves : [],
      keeper_keeping : 'keeper_keeping',
      End : 'End',
      keeper_reservation : 'keeper_reservation',
      status : '',
    };
  }

  componentWillMount(){
    let $this = this;
    axios.get('/api/rtshow/1').then(response => {
      $this.setState({
        reserves : response.data
        
      })
      console.log(this.state.reserves) 
    }).catch(error => {
      console.log(error)
    });
  }

_onGet=(id)=>{
  
  alert("荷物を受け取りました。")
  axios.post(`/api/reserveupdate/${id}`,
  {
    reservation_status : this.state.keeper_keeping
  }).then(res => {
    console.log(res)
  })
  fetch('https://fcm.googleapis.com/fcm/send',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAnXNFhws:APA91bH5gDeGFgVYolbkdx44qnOyYadDP1-xst1-tkUYlWHXqC3Lropg4GIPwqnD8-fG8kmT6yzCh8ueY1rnvSYSrVokqfMRWOLexTF87JK_2cETW8RkT2oA9r13k8FLnG0IAHGBYqsc'
    },
    body:JSON.stringify(
        {
            //여기 토큰을 딜리버리꺼로 바꾸면 될듯
            "to":"/topics/tourist",
            "priority":"high",
            "notification":{
                "body":"키퍼가 짐을 수령하였습니다.",
                "title":"키퍼 짐 수령 완료"
            }, 
            "data":{
                "title": "키퍼 짐 수령 완료.",
                "message":"키퍼가 짐을 수령하였습니다."
            }
        }
    )
});
}

_onYes=(index,id)=>{
  const {opened} = this.state;
  this.setState({
    opened:{
      ...opened,
      [index]:!opened[index]
    }
  })
  alert("予約ができました。")
  axios.post(`/api/reserveupdate/${id}`,
  {
    reservation_status : this.state.keeper_reservation
  }).then(res => {
    console.log(res)
  })
  fetch('https://fcm.googleapis.com/fcm/send',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAnXNFhws:APA91bH5gDeGFgVYolbkdx44qnOyYadDP1-xst1-tkUYlWHXqC3Lropg4GIPwqnD8-fG8kmT6yzCh8ueY1rnvSYSrVokqfMRWOLexTF87JK_2cETW8RkT2oA9r13k8FLnG0IAHGBYqsc'
            },
            body:JSON.stringify(
                {
                    //여기 토큰을 딜리버리꺼로 바꾸면 될듯
                    "to":"/topics/tourist",
                    "priority":"high",
                    "notification":{
                        "body":"키퍼가 예약을 수락하였습니다.",
                        "title":"키퍼 수락 완료"
                    }, 
                    "data":{
                        "title": "키퍼 수락 완료.",
                        "message":"키퍼가 예약을 수락하였습니다."
                    }
                }
            )
        });
    }


_onSend=(id)=>{
  alert("荷物を渡しました。")
  axios.post(`/api/reserveupdate/${id}`,
  {
    reservation_status : this.state.End
  }).then(res => {
    console.log(res)
  })
}

  _onDelete=(reserve)=>{
    var $this = this;
    axios.delete(`/api/reservedelete/${reserve.reservation_id}`)
    .then(res => {
      console.log(res)
      const newState = $this.state.reserves.slice();
      newState.splice(newState.indexOf(reserve),1)
      $this.setState({
        reserves : newState
      })
    })
    alert("予約を断りました。")
    .catch(err => {
      console.log(err)
    })
    fetch('https://fcm.googleapis.com/fcm/send',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAnXNFhws:APA91bH5gDeGFgVYolbkdx44qnOyYadDP1-xst1-tkUYlWHXqC3Lropg4GIPwqnD8-fG8kmT6yzCh8ueY1rnvSYSrVokqfMRWOLexTF87JK_2cETW8RkT2oA9r13k8FLnG0IAHGBYqsc'
      },
      body:JSON.stringify(
          {
              //여기 토큰을 딜리버리꺼로 바꾸면 될듯
              "to":"/topics/tourist",
              "priority":"high",
              "notification":{
                  "body":"키퍼가 예약을 거절하였습니다.",
                  "title":"키퍼 예약 거절"
              }, 
              "data":{
                  "title": "키퍼 예약 거절.",
                  "message":"키퍼가 예약을 거절하였습니다."
              }
          }
      )
  });
  }
  
  render(){
      return (
        <div>
        <LeftSideBar />
          <div className="container text-center mb-5" >
            <h1  style={{marginLeft: '47%', marginTop: '20px'}}>予約</h1>
          </div>
          <table class="table table-sm" style={{marginLeft:'2%'}}>
            <thead>
              <tr>
                <th scope="col" style={{fontSize:'x-large'}}>Id</th>
                <th scope="col" style={{fontSize:'x-large'}}>名前</th>
                <th scope="col" style={{fontSize:'x-large'}}>電話番号</th>
                <th scope="col" style={{fontSize:'x-large'}}>店舗の名前</th>
                {/* <th scope="col" style={{fontSize:'x-large'}}>チェックイン</th>
                <th scope="col" style={{fontSize:'x-large'}}>チェックアウト</th> */}
                <th scope="col" style={{fontSize:'x-large'}}>カバン</th>
                <th scope="col" style={{fontSize:'x-large'}}>スーツケース</th>
                <th scope="col" style={{fontSize:'x-large'}}>状況</th>
                <th scope="col" style={{fontSize:'x-large'}}>荷物の写真</th>
                <th scope="col" style={{fontSize:'x-large'}} >ボタン</th>
              </tr>
            </thead>
            {this.state.reserves.map((reserve,index)=>{
             if(reserve.reservation_status == 'in_delivery'){
                return(
                <tbody>
                  <tr>
                    <th scope="row">{      
                        <td style={{fontSize:'x-large'}}>{reserve.reservation_id}</td>
                      }</th>
                        <td style={{fontSize:'x-large'}}>{reserve.tourist_name}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.tourist_phonenumber}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.keeper_store_name}</td>
                        {/* <td style={{fontSize:'x-large'}}>{reserve.check_in}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.check_out}</td> */}
                        <td style={{fontSize:'x-large'}}>{reserve.bag_cnt}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.car_cnt}</td>
                        <td style={{fontSize:'x-large'}}>デリバリー中</td>
                        <td><ModalLauncher/></td>
                        <td><MDBBtn outline color="primary" size="lg" >デリバリー中です。。</MDBBtn></td>
                  </tr>
                </tbody> 
              )
             }if(reserve.reservation_status == 'End'){
               console.log("서비스가 종료되었습니다.")
             }else{
                if(reserve.reservation_status == 'keeper_reservation'){
                 this.state.status = '予約完了'
                }else if(reserve.reservation_status == 'keeper_keeping'){
                 this.state.status = '保管中'
                }else if(reserve.reservation_status == 'end_delivery'){
                 this.state.status = 'デリバリー完了'
                }else if(reserve.reservation_status == 'keeper_listen'){
                 this.state.status = '予約待機'
                }
 
              return(
                <tbody key={index}>
                  <tr>
                    <th scope="row">{      
                        <td style={{fontSize:'x-large'}}>{reserve.reservation_id}</td>
                      }</th>
                        <td style={{fontSize:'x-large'}}>{reserve.tourist_name}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.tourist_phonenumber}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.keeper_store_name}</td>
                        {/* <td style={{fontSize:'x-large'}}>{reserve.check_in}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.check_out}</td> */}
                        <td style={{fontSize:'x-large'}}>{reserve.bag_cnt}</td>
                        <td style={{fontSize:'x-large'}}>{reserve.car_cnt}</td>
                        <td style={{fontSize:'x-large'}}>{this.state.status}</td>
                        <td><ModalLauncher/></td>
                        {/* {
                        this.state.opened[index] ? */}
                        {/* <td><MDBBtn outline color="secondary" size="sm" >Confirm</MDBBtn></td> */}
                        {/* : */}
                        {
                          this.state.opened[index] || reserve.reservation_status == 'keeper_reservation' || reserve.reservation_status == 'keeper_keeping'  || reserve.reservation_status == 'end_delivery'  ? 
                          <td>
                          <MDBBtn outline color="primary" size="lg" onClick={this._onGet.bind(this,reserve.reservation_id)} >受取</MDBBtn>
                          <MDBBtn outline color="secondary" size="lg" onClick={this._onSend.bind(this,reserve.reservation_id)} >渡す</MDBBtn>
                          </td>
                         :
                        <td>
                          <MDBBtn outline color="warning" size="lg" onClick={this._onYes.bind(this,index,reserve.reservation_id)} >承知</MDBBtn>
                          <MDBBtn outline color="danger" size="lg" onClick={this._onDelete.bind(this,reserve)}>断り</MDBBtn>
                        </td>
                        }
                  </tr>
                </tbody> 
              )
             }
            })}
          </table>
        </div>
      );
    }
  };

export default ReservationList;
