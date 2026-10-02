import { useState, useEffect } from 'react'
import { ScoreBoard } from './components/ScoreBoard'
import { CardBoard } from './components/CardBoard'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [clickedCardIds, setClickedCardIds] = useState([])

  const handleCardClick = (id) => {
    if (clickedCardIds.includes(id)) {
      setScore(0)
      setClickedCardIds([])
      alert('Game over, Sorry ya lost!')
    } else if (score === 9) {
      setScore(0)
      setClickedCardIds([])
      alert('You won!')
    } else {
      const newScore = score + 1
      setScore(newScore)
      setClickedCardIds([...clickedCardIds, id])
    }
  }
  return (
    <div className="game-container">
      <ScoreBoard score={score} />
      <CardBoard handleCardClick={handleCardClick} score={score} />
    </div>

  )
}

export default App
