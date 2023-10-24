import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}></StatisticsLine>
          <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
          <StatisticsLine text="bad" value={bad}></StatisticsLine>
          <StatisticsLine text="all" value={total}></StatisticsLine>
          <StatisticsLine text="average" value={(good - bad) / total}> </StatisticsLine>
          <StatisticsLine text="positive" value={(good / total) * 100 + "%"}></StatisticsLine>
        </tbody>
      </table>
    )
  }
  return (<p>No feedback given</p>)
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App