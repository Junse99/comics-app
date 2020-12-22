import { message } from 'antd';
import { takeLatest, all, put } from 'redux-saga/effects'
import Api from '../../../common/api'
import { getComicsSuccess } from './comicsActions';
import { comicActions } from './comicSlice'


function* getComics(action) {
    console.log('Llega')
    const response = yield Api.get('/comic/all');
    console.log('Resultados',response)
    if ( response.ok ) {
        const data = {
            newComics: response.payload,
            reviewComics: [],
            aprovedComics: []
        }
        yield put(comicActions.setComics(data))
    }else{
        yield put(comicActions.getComicsFail({
            codigo: '',
            message: ''
        }));
    }
}

function* addComic({payload}) {
    //console.log("PAYLOAD", payload)
    const {values, hide} = payload;
    const response = yield Api.post('/comic', values);

    if ( response.ok ) {

        yield put(comicActions.getComics())
        hide()
        message.success("Comic registrado correctamente ✔")
    }else{
        yield put(comicActions.getComicsFail({
            codigo: '',
            message: response.payload.message
        }));
        message.error("Comic no registrado correctamente 😢 " + response.payload.message)
    }
}

function* actionWatcher () {
    yield takeLatest(comicActions.getComics, getComics)
    yield takeLatest(comicActions.addComic, addComic)
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
