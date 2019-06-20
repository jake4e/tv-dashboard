import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const mapStateToProps = state => ({
  tags: state.home.tags,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const LoggedOutView = props => {
  if(!props.currentUser){
    return(
      <div>
      </div>
    )
  }
  return null;
}

const LoggedInView = props => {
  if(props.currentUser){
    return(
      <Calendar
        selectable
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        oSelectSlot={() => console.lo('clicked')}
        onDoubleClickEvent={() => console.log('clicked')}
      />
    )
  }
  return null;
}

const MainView = props => {
  return (
    <div className='view flex padding'>
      <LoggedOutView currentUser={props.currentUser}/>
      <LoggedInView currentUser={props.currentUser} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
