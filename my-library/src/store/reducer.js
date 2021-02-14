import {ADD_BOOK, RATE_BOOK ,CHANGE_FIELD } from "./actions"

const data = localStorage.getItem('books')
const rating = localStorage.getItem('rating')

const initialState = {
    id: 0,
    title:  '',
    author: '',
    genre:  '',
    year:   '',
    text:   '',
    url:    '',
    search: '',
    editChoose: [],
    readChoose: '',
    genreSearch: '',
    books:  data ? JSON.parse(data) : [],
    rating: rating ? JSON.parse(rating) : []
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_BOOK:
            const body = [...state.books, payload]
            localStorage.setItem('books', JSON.stringify(body))
        case RATE_BOOK:
            const rate = [...state.rating, payload]
            localStorage.setItem('rating', JSON.stringify(rate))
            return { ...state, rating: rate }
        case CHANGE_FIELD:
            return { ...state, ...payload }
        default:
            return state
    }
}

export default reducer;