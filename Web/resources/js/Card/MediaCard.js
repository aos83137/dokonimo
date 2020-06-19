import React from 'react'
import {Link} from 'react-router-dom'
import MainCardUI from './MainCardUI'

class MediaCard extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div className="container-fluid1 d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Link to='/keepermenu/kpmanagement/edit/1' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA2MTVfMTM3/MDAxNTkyMTY0Mjk2MTg2.svnE8k90H_aQuZKMCqQxVpZRZ1RIm5QMeFMPZ2TuGAQg.tU1rVGx220lkSUL2tNaWtVHb00nhQaoIsuifMVxKomUg.JPEG.rlaehwns9698/%EB%8C%80%EA%B5%AC.jpg?type=w773" title="CGV 대구점"
                                text="店舗の情報を変更したければクリックしてください" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/kpmanagement/edit/2' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA2MTVfMjQ5/MDAxNTkyMTY0Mjk2MTk4.dLecLyG48nvamwq_f0O4KGXuXfSGJgdCclTcEwk-eqYg.5wJyHHJy6ISweNinJlHF8OvKP-aqbDKiyzAQPS6VjEQg.JPEG.rlaehwns9698/%EB%8C%80%EA%B5%AC%ED%95%9C%EC%9D%BC.jpg?type=w773"　title="CGV 대구한일점"
                                text="店舗の情報を変更したければクリックしてください" />
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/keepermenu/kpmanagement/edit/3' style={{ textDecoration: 'none' }}>
                            <MainCardUI imgsrc="https://postfiles.pstatic.net/MjAyMDA2MTVfMjc5/MDAxNTkyMTY2NTU1NDAw.BbWXDXaiIhvFCmASQfKj_qvZNaN_toYWcR1d-DldjO0g.Axp9oiHr44GJ3oQsCIL1L83M1isyDgl1q8EL2vQ3iEwg.JPEG.rlaehwns9698/%EB%8C%80%EA%B5%AC%ED%98%84%EB%8C%80.jpg?type=w773"　title="CGV 대구현대점"
                                text="店舗の情報を変更したければクリックしてください" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MediaCard;