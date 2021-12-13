import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  let historyCopy = []
  function transition(newMode, replace = false) {
    if (replace === false) {
      setMode(newMode)
      setHistory([...history, newMode])
    } else {
      setMode(newMode)
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length-1])
    }
    setMode(history[history.length-1])
  }
  return { mode, transition, back }
}