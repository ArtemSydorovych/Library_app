import {ADD_BOOK, EDIT_BOOK, RATE_BOOK, CHANGE_FIELD } from "./actions"

const data = localStorage.getItem('books')

const initialState = {
    title:  '',
    author: '',
    genre:  '',
    year:    0,
    text:   '',
    url:    '',
    books:  data ? JSON.parse(data) : [],
    genreSearch: '',
    search: '',
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_BOOK:
            const body = [...state.books, payload]
            localStorage.setItem('books', JSON.stringify(body))
            return { ...state, books: body }
        case EDIT_BOOK:
            return { ...state, books: body }
        case RATE_BOOK:
            return { ...state, ...payload }
        case CHANGE_FIELD:
            return { ...state, ...payload }
        default:
            return state
    }
}

export default reducer;