import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import { Jumbotron } from 'react-bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import calendarPlugins from '@fullcalendar/google-calendar'
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import reactwrapper from 'fullcalendar-reactwrapper';
import jQuery from 'jquery';
import axios from 'axios';
import Tooltip from "tooltip.js";
import moment from 'moment';
import './App.css';
import LeftSideBar from '../animations/LeftSideBar'

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import 'fullcalendar/dist/fullcalendar.css';


// const MyCalendar = ({match}) => {

class ReservationManagement extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//         chores : [],
//         events : [],
//         eventes : [],
//     };
// };


  state = {
      chores : [],
      events : [],
      eventes : [],
      event: {
        title: "",
        start: new Date(),
        end: new Date(),
        description: "",
      },
      modal: false
  };

  toggle = () => {
    this.setState({ 
      modal: !this.state.modal 
    });
  };

  handleEventClick = ({ event }) => {
    this.toggle();
    this.setState({ 
      event :  event
    });
    console.log(event)
  };

componentWillMount() {
  axios.get('/api/rtshow/1')
  .then(response => {
    this.setState({ 
      chores: response.data 
    })
    this.state.chores.map(chore => {
      this.state.events.push({
        title: chore.tourist_name,
        start: moment(chore.check_in).format("YYYY-MM-DD HH:mm"),
        end: moment(chore.check_out).format("YYYY-MM-DD HH:mm"),
        description: chore.bag_cnt,
        color: "green",
        textColor: "white",
        borderColor: "black"
      })
    })
    this.setState({
      eventes : this.state.events
    })
    console.log(this.state.eventes)
  }).catch(error => {
    console.log(error)
  });
}

eventRender(info){
  var tooltip = new Tooltip(info.el, {
    title: info.event.extendedProps.description,
    placement: "top",
    trigger: "hover",
    container: "body"
  });
}

  calendarRef = React.createRef()
  render(){
    return(
      <div>
        <LeftSideBar />
        <div className="sidebar " style={{ height: '20vh',backgroundColor: '#CED8F6', borderTop: '1px solid #e7e7e7',textAlign:'center'}}>
          <h1 style={{marginLeft: '43%',marginTop: '3.5%'}}>予約管理</h1>
        </div>
        <div className="calendar" style={{marginTop: '3%'}}>
        <FullCalendar
            header={{
              left: "prev,next myCustomButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }} 
            defaultView="dayGridMonth"
            schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
            allDaySlot={true}
            slotEventOverlap={true}
            handleWindowResize={true}
            selectable={true}
            themeSystem="bootstrap"
            displayEventTime={true}
            aspectRatio={2}
            timeZone="UTC"
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            ref={this.calendarRef}
            displayEventTime={true}
            plugins={[dayGridPlugin,interactionPlugin,resourceTimelinePlugin,calendarPlugins,timeGridPlugin,listPlugin]}
            eventClick={this.handleEventClick}
            events={this.state.eventes}
            eventLimit={3}
            eventRender={this.eventRender}     
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            nowIndicator='true'
          />
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            >
            <ModalHeader toggle={this.toggle}>
              予約者の名前 : {this.state.event.title}
            </ModalHeader>
            <ModalBody>
              <div>
                予約始め : {this.state.event.start.toUTCString()}
              </div>
              <div>
                予約終わり : {this.state.event.end.toUTCString()}
              </div>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary">Do Something</Button>{" "} */}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
         </div>
      </div>
    );
  }
  someMethod(){
    let calendarApi = this.calendarRef.current.getApi()
    calendarApi.next()
  }
}
export default ReservationManagement;