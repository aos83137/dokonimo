import React, { Component } from 'react'
import { store } from '../register/UserFunctions'
import LeftSideBar from '../animations/LeftSideBar'
import MiniMap from './MiniMap'

class CreateStore extends Component {
    constructor() {
        super()
        this.state = {
            keeper_id:'',
            keeper_store_name:'',
            keeper_store_address:'',
            keeper_store_tel:'',
            keeper_store_openinghours:'',
            keeper_store_bag_cnt:'',
            keeper_store_car_cnt:'',
            keeper_store_latitude:'',
            keeper_store_longtitude:'',
            keeper_store_imgurl:''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()
        const newStore = {
            keeper_id: 1,
            keeper_store_name: this.state.keeper_store_name,
            keeper_store_address: this.state.keeper_store_address,
            keeper_store_tel: this.state.keeper_store_tel,
            keeper_store_openinghours: this.state.keeper_store_openinghours,
            keeper_store_bag_cnt: this.state.keeper_store_bag_cnt,
            keeper_store_car_cnt: this.state.keeper_store_car_cnt,
            keeper_store_latitude: 35.866526916270466,
            keeper_store_longtitude: 128.58999914016712,
            keeper_store_imgurl: this.state.keeper_store_imgurl
        }

        store(newStore).then(res => {
            this.props.history.push(`/keepermenu/keepermanagement`)
        })
    }

    render () {
        
        return (
            <div>
                <LeftSideBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal">
                                    店舗登録
                                </h1>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_name">店舗の名前</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_name"
                                        placeholder="店舗の名前を入力してください"
                                        value={this.state.keeper_store_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_address">店舗の住所</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_address"
                                        placeholder="店舗の住所を入力してください"
                                        value={this.state.keeper_store_address}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_tel">電話番号</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_tel"
                                        placeholder="電話番号を入力してください"
                                        value={this.state.keeper_store_tel}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_openinghours">オープン時間</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_openinghours"
                                        placeholder="00:00~00:00"
                                        value={this.state.keeper_store_openinghours}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_bag_cnt">カバン数</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_bag_cnt"
                                        placeholder="0"
                                        value={this.state.keeper_store_bag_cnt}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_car_cnt">スーツケース数</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_car_cnt"
                                        placeholder="0"
                                        value={this.state.keeper_store_car_cnt}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="keeper_store_imgurl">イメージ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keeper_store_imgurl"
                                        placeholder="イメージのURLを入力してください"
                                        value={this.state.keeper_store_imgurl}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                <MiniMap google={this.props.google}
					                center={{lat: 35.87068276769894, lng: 128.5940117248534}}
					                height='300px'
                                    zoom={15}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                >
                                    登録
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateStore