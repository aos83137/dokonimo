import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LeftSideBar from '../animations/LeftSideBar';

class EditAsoCafe extends Component{
  constructor(props){
    super(props);
    this.state = {
      keeper_store_name:'',
      keeper_store_address:'',
      keeper_store_tel:'',
      keeper_store_openinghours:'',
      keeper_store_bag_cnt:'',
      keeper_store_car_cnt:''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getAsocafeDetails();
  }

  getAsocafeDetails(){
    axios.get('/api/kstoreinfos/8')
    .then(response => {
      this.setState({
        keeper_store_name:response.data.keeper_store_name,
        keeper_store_address:response.data.keeper_store_address,
        keeper_store_tel:response.data.keeper_store_tel,
        keeper_store_openinghours:response.data.keeper_store_openinghours,
        keeper_store_bag_cnt:response.data.keeper_store_bag_cnt,
        keeper_store_car_cnt:response.data.keeper_store_car_cnt
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editAsocafe(newAsocafe){
    axios.request({
      method:'put',
      url:'/api/kstoreinfos/8',
      data: newAsocafe
    }).then(response => {
      this.props.history.push('/keepermenu/keepermanagement');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newAsocafe = {
        keeper_store_name: this.refs.keeper_store_name.value,
        keeper_store_address: this.refs.keeper_store_address.value,
        keeper_store_tel: this.refs.keeper_store_tel.value,
        keeper_store_openinghours: this.refs.keeper_store_openinghours.value,
        keeper_store_bag_cnt: this.refs.keeper_store_bag_cnt.value,
        keeper_store_car_cnt: this.refs.keeper_store_car_cnt.value
    }
    this.editAsocafe(newAsocafe);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return (
      <div>
      <LeftSideBar/>
      <div className="container">
          <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                  <form noValidate onSubmit={this.onSubmit.bind(this)}>
                      <h1 className="h3 mb-3 font-weight-normal">
                        CGV 대구점 情報修正
                      </h1>
                      {/* <div className="form-group">
                            <label htmlFor="keeper_store_name">가게 이름</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_name"
                                ref="keeper_store_name"
                                placeholder="Enter Keeper Name"
                                value={this.state.keeper_store_name}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keeper_store_address">가게 주소</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_address"
                                ref="keeper_store_address"
                                placeholder="Enter Keeper Address"
                                value={this.state.keeper_store_address}
                                onChange={this.handleInputChange}
                            />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="keeper_store_tel">電話番号</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_tel"
                                ref="keeper_store_tel"
                                placeholder="電話番号を入力してください"
                                value={this.state.keeper_store_tel}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keeper_store_openinghours">オープン時間</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_openinghours"
                                ref="keeper_store_openinghours"
                                placeholder="00:00~00:00"
                                value={this.state.keeper_store_openinghours}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keeper_store_bag_cnt">カバン数</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_bag_cnt"
                                ref="keeper_store_bag_cnt"
                                placeholder="0"
                                value={this.state.keeper_store_bag_cnt}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keeper_store_car_cnt">スーツケース数</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_car_cnt"
                                ref="keeper_store_car_cnt"
                                placeholder="0"
                                value={this.state.keeper_store_car_cnt}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keeper_store_imgurl">イメージ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keeper_store_imgurl"
                                ref="keeper_store_imgurl"
                                placeholder="イメージのURLを入力してください"
                                value={this.state.keeper_store_imgurl}
                                onChange={this.handleInputChange}
                            />
                        </div>
                      <button
                          type="submit"
                          className="btn btn-lg btn-primary btn-block"
                      >
                          修正
                      </button>
                  </form>
              </div>
          </div>
      </div>
    </div>
    )
  }
}

export default EditAsoCafe;