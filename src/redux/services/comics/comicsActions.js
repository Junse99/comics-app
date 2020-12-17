import * as Comics from "./comicTypes";

export const getComics =()=> ({
    type: Comics.GET_COMICS
})

export const getComicsSuccess =(comics)=> ({
    type: Comics.GET_COMICS_SUCCESS,
    payload: comics
})