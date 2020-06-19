import React from 'react'
import {Link} from 'react-router-dom'
import MainCardUI from './MainCardUI'

class MainCards extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Link to='/keepermenu/reservationmanagement' style={{ textDecoration: 'none'}}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfMjgw/MDAxNTg5OTI2NTE1Njk1.MVNfGTcF5ArP8JNXK-YzWlUq1fY_WcKg74dqDsTawhAg.R-vSeFe8K6Amqib1diOrSVK226jawQy110nWDp5_GtUg.JPEG.rlaehwns9698/2020_1565707756.jpg?type=w773" title="予約管理"
                                text="
                                予約管理ではツアーリストが予約したリストをキャレンダーで確認することができる" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/keepermanagement' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfNTcg/MDAxNTg5OTI4ODg4MjE3.3S8Ox8MCd2KiMsIpSuLMwH6j2Y0uDArVT9EemwnzBY0g._vtVckn5S6dcvhhFmRSx3A8DySwCsV0NHnhccEgMCU0g.JPEG.rlaehwns9698/01_DON1358.jpg?type=w773"　title="店舗管理"
                                text="
                                店舗管理では店舗を追加し、店舗の情報を修正することができる" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/reservationlist' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfMTgw/MDAxNTg5OTI4MzI3NDU4.9P-DUwVj9KieByBH80BfzOkKcows-zbwbH-nCoN3M1Ig.aCf348MpUhAlDdAUheTieeFJfFoe_MOzR8EWqfujjB8g.JPEG.rlaehwns9698/1552034685_photo.jpg?type=w773"　title="予約リスト"
                                text="
                                予約リストでは予約したツアーリストの情報を見ることができ、予約状況の管理ができる"/>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/paymentlist' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfMjU1/MDAxNTg5OTI4MzI3NDQ0.22iN8qFyjAiUbjrKpORyq1Qtp_OqcJw7WzCLMVa9U_wg.PA8W3RQeueKM-2vpqwGvTgSbb__2UdhBvrl1D3tLfmog.JPEG.rlaehwns9698/429ea72df5e27023ec80080f68c75ca7.jpg?type=w773"　title="決済リスト"
                                text="
                                決済リストではこれまで決済したリストを時間帯別に確認することができる" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/profile' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfNjUg/MDAxNTg5OTI4MzI3NDQ5.-GuZdEGQ6FhfGc0kV2mNVeKoBd6WFU_7rs_BidnVNVog.54YMThmiQ4wuBRSqqK0t4dNDRq5kEXARTvPCawzogX8g.JPEG.rlaehwns9698/img_book_sns_10.jpg?type=w773"　title="プロフィール"
                                text="
                                プロフィールでは店舗の情報ではなくキッパーの情報を修正することができる" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/others' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA1MjBfMTcy/MDAxNTg5OTI5MDg1NzQ3.wrGbkF1pSiMDh9txIO7Fvm4JCG0cbR-ZomDlu1gFBfYg.ASTTU_WoYmZzVelVAqXcTHnhY_mYsQAvaKIA-1nlnaIg.JPEG.rlaehwns9698/etc_eye.jpg?type=w773"　title="利用規約"
                                text="
                                利用規約ではスペースを提供するキッパーの利用規約を確認することができる" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainCards;