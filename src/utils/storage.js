import AsyncStorage from '@react-native-community/async-storage'

const keys = {
    RANKING: "ranking"
}

const saveRanking = (ranking) => {
    AsyncStorage.setItem(keys.RANKING, JSON.stringify(ranking))
}

const getRanking = async () => {
    const data = await AsyncStorage.getItem(keys.RANKING)
    const ranking = JSON.parse(data) || null

    return ranking
}

export {
    saveRanking,
    getRanking
}