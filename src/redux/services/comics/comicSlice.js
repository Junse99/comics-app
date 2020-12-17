import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    comics: {},
    newComics: [],
    loading: false,
    idBuscado: null,
    error: null,
    comicSelected: null
}

const comicSlice = createSlice({
    name: "comic",
    initialState,
    reducers: {
        getComics(state) {
            state.loading = true
        },
        getComicsSuccess(state, { payload }) {
            state.comics["newComics"] = payload
            state.loading = false
        },
        getComicsFail(state, { payload }) {
            state.error = payload
            state.loading = false
        }
    }
});

const comicActions = comicSlice.actions
const comicReducer = comicSlice.reducer

export {comicActions, comicReducer}

/* import * as ComicTypes from './comicTypes'

const initialState = {
    comics: [],
    newComics: [],
    loading: false,
    idBuscado: null,
    error: null,
    comicSelected: null
};

const ComicReducer = (state = initialState, action) => {
    const {payload, error} = action;

    console.log("action: ", action);
    switch (action.type) {
        case ComicTypes.GET_COMICS:
            console.log(action);
            return {...state, loading: true}
        case ComicTypes.GET_COMICS_BY_ID:
            return {...state, idBuscado: action.payload.id}
        case ComicTypes.GET_COMICS_SUCCESS:
            return {...state, comics: payload.comics, loading: false}
        case ComicTypes.GET_COMICS_FAIL:
            return {...state, error}
        case ComicTypes.SELECT_COMIC:
            console.log('ENTRANDOOOOOOOOO')
            return {...state, comicSelected: payload.comic}
        case ComicTypes.ADD_COMIC:
            return {...state, comics: {...state.comics, newComics: [payload.comics, ...state.comics.newComics]}}
        default:
            return state;
    }
}

export default ComicReducer; */