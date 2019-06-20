import React, {Component} from 'react';
import 'tui-calendar/dist/tui-calendar.css';
import Calendar from '@toast-ui/react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const today = new Date();

const calendars = [
  {
    id: '0',
    name: 'Fargo',
    bgColor: '#da291c',
    dragBgColor: '#da291c',
    borderColor: '#000',
    color: '#fff'
  },
  {
    id: '1',
    name: 'Litchfield',
    bgColor: '#4B0082',
    dragBgColor: '#4B0082',
    borderColor: '#000',
    color: '#fff'
  },
  {
    id: '2',
    name: 'Mt. Pleasant',
    bgColor: '#ff4500',
    dragBgColor: '#ff4500',
    borderColor: '#000',
    color: '#fff'
  },
  {
    id: '3',
    name: 'Sioux Falls',
    bgColor: '#003366',
    dragBgColor: '#003366',
    borderColor: '#000',
    color: '#fff'
  },
  {
    id: '4',
    name: 'RESERVED',
    bgColor: '#2c2a29',
    dragBgColor: '#2c2a29',
    borderColor: '#000',
    color: '#fff'
  }
]

class LoggedInView extends Component{
  constructor(props){
    super(props);

    this.state = {
      date: new Date(),
      schedule: []
    }

    this.calendarRef = React.createRef();
  }

  componentDidMount(){
    if(this.props.currentUser){
      const calendarInstance = this.calendarRef.current.getInstance();
      calendarInstance.changeView('month', true);
      this.createEvents();
    }
  }

  onClickNext = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    calendarInstance.next();

    this.setState({
      date: calendarInstance.getDate()
    })
  }

  onClickPrev = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    calendarInstance.prev();

    this.setState({
      date: calendarInstance.getDate()
    })
  }

  onClickToday = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    calendarInstance.today();

    this.setState({
      date: calendarInstance.getDate()
    })
  }

  createEvents = () => {
    const schedule = [];
    const events = this.props.events;
    for(let i = 0; i < events.length; i++){
      let item = events[i]
      let event = {
        id: item.id,
        calendarId: this.getCalendarID(item.branch),
        title: item.auctionName,
        start: new Date(item.auctionDate + '-05:00'),
        end: new Date(item.auctionDate + '-05:00'),
        category: 'allday',
        dragBgColor: '#2c2a29',
        location: item.location,
        branch: item.branch,
        state: 'busy',
        salesRep: item.salesRep,
        body: item.description,
        phone: item.phone
      }
      schedule.push(event);
    }

    console.log(schedule)

    this.setState({
      schedule: schedule
    })
  }

  getCalendarID = (branch) => {
    if(branch === 'Fargo')
    {
      return '0'
    }
    else if (branch === 'Litchfield') {
      return '1'
    }
    else if (branch === 'Mt. Pleasant'){
      return '2'
    }
    else if(branch === 'Sioux Falls'){
      return '3'
    }
    else if(branch === 'RESERVED'){
      return '4'
    }
    else{
      return '5'
    }
  }

  render(){
    const { date } = this.state;
    if(this.props.currentUser){
      return(
        <>
          <div className='calendar-menu'>
            <button
              type='button'
              className='calendar-button'
              onClick={this.onClickToday}
            >
              Today
            </button>
            <button
              type='button'
              className='calendar-button-circle'
              onClick={this.onClickPrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} size='lg'/>
            </button>
            <button
              type='button'
              className='calendar-button-circle'
              onClick={this.onClickNext}
            >
              <FontAwesomeIcon icon={faChevronRight} size='lg'/>
            </button>
            <p className='calendar-text'>{new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date)} {date.getFullYear()}</p>
          </div>
          <Calendar
            ref={this.calendarRef}
            isReadOnly={this.props.currentUser.Role == 'Admin' ? false : true}
            defaultView="month"
            height='90%'
            month={{
              startDayOfWeek: 0,
              narrowWeekend: true
            }}
            calendars={calendars}
            schedules={this.state.schedule}
            scheduleView
            taskView
            useDetailPopup
            useCreationPopup
            template={{

            }}
          />
        </>
      )
    }
    return null;
  }
}

export default LoggedInView;
