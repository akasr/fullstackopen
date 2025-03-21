import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}{text === "positive" ? " %" : ""}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if(!(good || bad || neutral)){
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const calculateAverage = () => (good-bad)/(good+bad+neutral)
  const calculatePositive = () => (good)/(good+bad+neutral)*100

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good+bad+neutral} />
          <StatisticLine text={"average"} value={calculateAverage()} />
          <StatisticLine text={"positive"} value={calculatePositive()} />
          </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />

      <Statistics good={good} bad={bad} neutral={neutral}/>      
    </div>
  )
}

export default App