import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // Transitions to new state when called 
  function transition(newMode, replace = false) {
    if (replace === false) {
      setMode(newMode)
      setHistory(prev => ([...history, newMode]))
    } else {
      setMode(newMode)
    }
  }
  // Transitions back to previous state 
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length-1])
    }
    setMode(history[history.length-1])
  }
  return { mode, transition, back }
}