import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment"
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({ 
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay( state, state.day );
  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = (days) => {
  //   setState({...state, days})
  // }
  
  

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
         className="sidebar--centered"
         src="images/logo.png"
         alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appoint) => {
          const interview = getInterview(state, appoint.interview)
          return (

            <Appointment key={appoint.id} id={appoint.id} time={appoint.time} interview={interview} />)}
          )}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
