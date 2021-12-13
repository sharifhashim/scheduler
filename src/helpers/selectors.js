export function getAppointmentsForDay(state, day) {
  const newArr = []
  const filteredAppointments = state.days.filter(date => {
    if (date.name === day) {
      for (const item of date.appointments) {
        newArr.push(state.appointments[item])
      }
    }
  });
  return newArr
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewKey = interview.interviewer
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewKey]
  }
  return newObj
}

export function getInterviewersForDay(state, day) {
  const newArr = []
  const filteredAppointments = state.days.filter(date => {
    if (date.name === day) {
      for (const item of date.interviewers) {
        newArr.push(state.interviewers[item])
      }
    }
  });
  return newArr
}
// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }
