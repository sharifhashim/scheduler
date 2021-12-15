import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({ 
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const updateSpots = function(id, action) {
    for (const day of state.days) {
      for (const appointment of day.appointments) {
        if (appointment === id) {
          if (action === "book") {
            day.spots -= 1;
          };
          if (action === "cancel") {
            day.spots += 1;
          };
        };
      };
    };
  };

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    updateSpots(id, "book")
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      setState({
        ...state,
        appointments,
        
      })
    })
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]:  appointment
    };
    updateSpots(id, "cancel")
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}