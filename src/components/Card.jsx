import '../styles/Card.css'

function Card({ url, onClick }) {
    return (
        <div className='card' onClick={onClick}>
            <img src={url} alt='card' />
        </div>
   ) 
}

export { Card }