import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const getFreeSpots = (appointments) => {
    const appointmentsArray = getAppointmentsForDay(
      { ...state, appointments },
      state.day
    );
    return appointmentsArray.reduce(
      (count, appointment) => (!appointment.interview ? (count += 1) : count),
      0
    );
  };
  const updateSpots = function (id, appointments) {
    const newSpots = getFreeSpots(appointments);
    return [...state.days].map((day) => {
      for (const appointment of day.appointments) {
        if (appointment === id) {
          return { ...day, spots: newSpots };
        }
      }
      return day;
    });
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const spots = updateSpots(id, appointments);
    const updatedState = {
      ...state,
      appointments: appointments,
      days: [...spots],
    };
    console.log(updatedState);
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState({
          ...updatedState,
        });
        console.log(state);
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //console.log(getFreeSpots(appointments));
    const spots = updateSpots(id, appointments);
    const updatedState = {
      ...state,
      appointments: appointments,
      days: [...spots],
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...updatedState,
      });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
