import React, {useEffect, useState} from 'react';
import {ComicCard} from '../../components';
import {Modal, Spin} from 'antd';
import {Api} from '../../common/api';

const MyModal = ({comic, visible, handleOK, handleCancel}) => {

    const {
        title,
        description,
        id, 
        thumbnail
    } = comic;

    return (
            <Modal
                title={title}
                visible={visible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
{/*                 <img src={thumbnail} height="200px"></img>
                <p><b>Titulo:</b> {title}</p>
                <p>{description}</p> */}

                <ComicCard 
                    key={id} 
                    id={id}
                    title={title} 
                    description={description} 
                    thumbnail={thumbnail}
                />
                
            </Modal>
    );
}

const Comics = () => {

    //USEeFFECT PARA MANEJAR EL CICLO DE VIDA DEL COMPONENTE
    //En caso de que una variable cambie, se ejecuta el codigo, dependiendo de la variable de abjo en el arreglo
    const [comics, setComics] = useState([]);
    const [selected, setSelected] = useState({});
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        Api().then(res => setComics(res.data.results));
    }, []);

    const handleOK =  () => {
        setVisible(false);
    }

    const handleCancel =  () => {
        setVisible(false);
    }

    //Se ejecuta al presionar una card
    const handleComicSelected = (comic) => {
        setSelected(comic);
        setVisible(true);
    };
    console.log(selected);
//    console.log(comics);

    const text = "Heavy-hitting heroes unite! This Official Handbook contains in-depth bios on more than 30 of the Marvel Universe's most awesome assemblages - including the Defenders, Power Pack and the New Thunderbolts! Plus: An all-new cover by superstar artist Tom Grummett, digitally painted by Morry Hollowell. <br>48 PGS./All Ages ...$3.99 <br>";

    if(comics.length > 0){
        return (
            <div>
            {
                comics?.map(comic => {
                    //const img = `${element.thumbnail.path}.${element.thumbnail.extension}`;
                    const {
                        id,
                        title,
                        description,
                        thumbnail
                    } = comic;

                    return (
                        <ComicCard 
                            key={id} 
                            id={id}
                            title={title} 
                            description={description ? description : text} 
                            thumbnail={thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null}
                            onSelect={handleComicSelected}
                        />
                    )
                })
            }
            <MyModal 
                comic = {selected}
                visible = {visible}
                handleOK = {handleOK}
                handleCancel = {handleCancel}
            />
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