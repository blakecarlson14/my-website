import React, {useEffect, useState} from 'react'

export const LolAccountScraper = () => {

    const [state, setState] = useState({
        matches: [],
        season11: {
            startTime: 1610085600,
            endTime: 1636956000,
            matches: []
        },
        season12: {
            startTime: 1641535200,
            endTime: 1668405600,
            matches: []
        },
        season13: {
            startTime: 1673416800,
            matches: []
        },
        doneFetching: false
    })

    const scrapeAccountMatches =  async (region, puuid, apiKey) => {
        setState(state => ({...state, doneFetching: false}))
        let index = 0
        try {
            while(true) {
                let start = 100 * index
                const response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=${start}&count=100&api_key=${apiKey}`)
                let matches = await response.json()
                if(matches.length > 0) {
                    index = index + 1
                    let stateMatches = state?.matches.slice()
                    stateMatches.push(matches)
                    setState(state => ({...state, matches: stateMatches}))
                } else {
                    break
                }
            }
        } catch (error) {

        }
        setState(state => ({...state, doneFetching: true}))
    }

    const getSeasonMatches = async () => {
        const response = await fetch(``)
    }

    useEffect(() => {
        let region = 'americas'
        let puuid = 'Jg3T7PZdLTwZDkCV8ik_zwk1-6-aj1yjAd6G3BE2xOs7hFqRNyooswnGXwcSgOscPqz6YpWsM94ung'
        let apiKey = 'RGAPI-2f8c2298-ab9e-428e-8c93-530bb9ff0f4d'

        scrapeAccountMatches(region, puuid, apiKey)
    }, [])

    useEffect(() => {
        if(state?.doneFetching && state?.matches.length > 0) {
            getSeasonMatches()
        }
    }, [state.doneFetching])

    return (
        <>
        </>
    )
}