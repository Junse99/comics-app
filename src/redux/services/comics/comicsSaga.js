import { message } from 'antd';
import { takeLatest, all, put } from 'redux-saga/effects'
import {Api} from '../../../common/api'
import { getComicsSuccess } from './comicsActions';
import { comicActions } from './comicSlice'

const fetchComics = async () => await Api();

function* getComics(action) {
    console.log('Llega')
    const response = yield fetchComics();
    console.log('Resultados',response)
    if ( response ) {
        yield put(comicActions.getComicsSuccess(response.data.results))
    }else{
        yield put(comicActions.getComicsFail({
            codigo: '',
            message: ''
        }));
    }
}

function* actionWatcher () {
    yield takeLatest(comicActions.getComics, getComics)
}

export default function* comicsSaga() {
    yield all([ actionWatcher() ]);
}

/* const fetchComics = async () => await Api();

function* getComics(action) {
    console.log('Llega')
    const response = yield fetchComics();
    console.log('Resultados',response)
    if ( response ) {
        yield put(getComicsSuccess({comics:{newComics: response.data.results}}))
    }else{
        yield put({
            type: ComicsTypes.GET_COMICS_FAIL,
            error: {
                codigo: '',
                message: ''
            }
        });
    }
}

function* actionWatcher () {
    yield takeLatest(ComicsTypes.GET_COMICS, getComics)
}

export default function* comicsSaga() {
    yield all([ actionWatcher() ]);
} */
