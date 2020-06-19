import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phonenumber: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push(`/keeper_login`)
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                新規登録
                            </h1>
                            <div className="form-group">
                                <label htmlFor="name">名前</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="名前を入力してください"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">イーメール</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="メールアドレスを入力してください"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">電話番号</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phonenumber"
                                    placeholder="電話番号を入力してください"
                                    value={this.state.phonenumber}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">パスワード</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="パスワードを入力してください"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                新規登録
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register