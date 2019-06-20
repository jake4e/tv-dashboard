import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import LoggedInView from './LoggedInView';

const mapStateToProps = state => ({
  tags: state.home.tags,
  token: state.common.token,
  currentUser: state.common.currentUser,
  events: state.common.events
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

const MainView = props => {
  return (
    <div className='view flex padding'>
      <LoggedOutView currentUser={props.currentUser}/>
      <LoggedInView currentUser={props.currentUser} events={props.events}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
