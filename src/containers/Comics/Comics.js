import React, {useEffect, useState} from 'react';
import {ComicCard} from '../../components';
import {Modal, Spin} from 'antd';
import {Api} from '../../common/api';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as ComicsTypes from "../../redux/services/comics/comicTypes";
import { getComics } from "../../redux/services/comics/comicsActions";


const Comics = () => {

    //USEeFFECT PARA MANEJAR EL CICLO DE VIDA DEL COMPONENTE
    //En caso de que una variable cambie, se ejecuta el codigo, dependiendo de la variable de abjo en el arreglo
    const [comics, setComics] = useState([]);
    const [selected, setSelected] = useState({});
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        Api().then(res => setComics(res.data.results));
    }, []);

    const handleOK =  () => {
        setVisible(false);
    }

    const handleCancel =  () => {
        setVisible(false);
    }

    const { loading, comicSelected } = useSelector(
        (state) => state.comics,
        shallowEqual
      );

    console.log('Comiccccsssssss Selected', comicSelected);

    //Se ejecuta al presionar una card
    const handleComicSelected = (comic) => {
        setSelected(comic);
        setVisible(true);
            dispatch({
              type: ComicsTypes.SELECT_COMIC,
              payload: {comic}
            })

    };
    console.log(selected);
//    console.log(comics);

    const text = "Heavy-hitting heroes unite! This Official Handbook contains in-depth bios on more than 30 of the Marvel Universe's most awesome assemblages - including the Defenders, Power Pack and the New Thunderbolts! Plus: An all-new cover by superstar artist Tom Grummett, digitally painted by Morry Hollowell. <br>48 PGS./All Ages ...$3.99 <br>";

    if(comics.length > 0){
        return (
            <div>
            {
                comics?.map(comic => {

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

        );
    } 
    
    return(
        <div>
            <Spin size="large"/>
        </div>
    );       

}

export default Comics;