import '../styles/ScoreBoard.css'

function ScoreBoard({ score }) {
    return (
        <div className='score-board'>
            <p className='score-text'>Score</p>
            <p className='score-number'><strong>{score}</strong></p>
        </div>
    )
}

export { ScoreBoard }