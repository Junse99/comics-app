//Para manejar la assincronia con redux
import { fork, all } from 'redux-saga/effects'
import ComicsSaga from '../redux/services/comics/comicsSaga'

export default function* rootSaga() {
    yield all([
        fork(ComicsSaga)
    ])
}