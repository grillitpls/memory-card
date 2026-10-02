import { useState, useEffect } from 'react'
import '../styles/CardBoard.css'
import { Card } from './Card'

function CardBoard({ handleCardClick, score }) {

    const [gifUrls, setGifUrls] = useState([])
    const [loading, setLoading] = useState(true)

    const API_KEY = 'wuF75viqP0jptgz6T3mpe45ueft6aIXu'

    const cats = [
        'WykUqckDqi95YIqtFZ',
        'h6AMD4GXFxO2k',
        'gjsBu8ZUniOODwgPP5',
        'l81k81N9znEqHYmtRz',
        'TjSPQgowhhJdHgvnwA',
        'Fig1uR9DGHf6E',
        'M3KeQ2khSTTrFZZlRI',
        'zm1Hm7xViBfG',
        '2zlSwREmLmiQw',
        'kKeJ4JuNkaEZbkPOOL'
    ]

    const shuffleCard = (cards) => {
        const shuffled = [...cards]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    useEffect(() => {
        async function fetchAllGifs() {
            try {
                const promises = cats.map(async (cat) => {
                    const res = await fetch(
                        `https://api.giphy.com/v1/gifs/${cat}?api_key=${API_KEY}`
                    )
                    const data = await res.json()

                    if (data && data.data) {
                        return {
                            id: data.data.id,
                            url:data.data.images.original.url
                        }
                    }

                    return null
                })

                const results = await Promise.all(promises)

                const validCats = results.filter(cat => cat !== null)
                
                setGifUrls(shuffleCard(validCats))
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }

        fetchAllGifs()
    }, [])

    console.log(gifUrls)

    useEffect(() => {
        if (gifUrls.length > 0) {
            setGifUrls(shuffleCard(gifUrls))
        }
    }, [score])

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="card-board">
            {gifUrls.map((gifUrl) => (
                <Card 
                    key={gifUrl.id}
                    url={gifUrl.url}
                    onClick={() => handleCardClick(gifUrl.id)}
                />
            ))}
        </div>
    )
}

export { CardBoard }