import React, {useEffect, useState} from 'react';
import './PanelComics.css';
import {ComicCard} from '../../components';
import {Api} from '../../common/api';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as ComicsTypes from "../../redux/services/comics/comicTypes";
import { getComics } from "../../redux/services/comics/comicsActions";

const PanelComics = () => {

    const [comics, setComics] = useState([]);
    const [selected, setSelected] = useState({});
    const [inputs, setInputs] = useState({
        id          : '',
        title       : '',
        description : '',
        thumbnail   : {
            path: '',
            extension: ''
        },
    });



    const text = "Heavy-hitting heroes unite! This Official Handbook contains in-depth bios on more than 30 of the Marvel Universe's most awesome assemblages - including the Defenders, Power Pack and the New Thunderbolts! Plus: An all-new cover by superstar artist Tom Grummett, digitally painted by Morry Hollowell. <br>48 PGS./All Ages ...$3.99 <br>";
    

    const onChange = (e) => {
        if(e.target.name === 'path' || e.target.name === 'extension') {
            setInputs({
                ...inputs,
                thumbnail: {
                    ...inputs.thumbnail,
                    [e.target.name] : e.target.value
                }
            })
        }else{
            setInputs({
                ...inputs,
                [e.target.name] : e.target.value
            })
        }
    }

    const dispatch = useDispatch();

    console.log(inputs)

    useEffect(() => {
        //Api().then((res) => setComics(res.data.results));
        Api().then((res) => setComics(res.data.results));
      }, []);

      const { loading, comicSelected } = useSelector(
        (state) => state.comics,
        shallowEqual
      );

    console.log('Comiccccsssssss Selected', comicSelected);

    //Se ejecuta al presionar una card
    const handleComicSelected = (comic) => {
        /* setSelected(comic); */
        dispatch({
          type: ComicsTypes.SELECT_COMIC,
          payload: {comic}
        })

    };



    return (
        <div className="container-panel">
            <div className="left-panel">
                <h3 className="title">Comics</h3>
            {
                comics.map(comic => {
                    //const img = `${element.thumbnail.path}.${element.thumbnail.extension}`;

                    return (
                        <ComicCard 
                            key={comic.id} 
                            comic={comic}
                            onSelect={handleComicSelected}
                        />
                    )
                })
            }
            </div>
        </div>
    );
}

export default PanelComics;