export function getAppointmentsForDay(state, day) {
  const newArr = []
  const filteredAppointments = state.days.filter(date => {
    if (date.name === day) {
      for (const item of date.appointments) {
        newArr.push(state.appointments[item])
      }
      //console.log(state.appointments[1])
    }
    //newArr.push(state.appointments[date.appointments])
    //day.name === day

  });
  return newArr
  //console.log(filteredAppointments)
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



// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }
