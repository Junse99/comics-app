import React, {useEffect, useState} from 'react';
import './PanelComics.css';
import {ComicCard} from '../../components';
import {Api} from '../../common/api';

const PanelComics = () => {

    const [comics, setComics] = useState([]);
    const [selected, setSelected] = useState({});
    const [newComics, setNewComics] = useState([]);
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
    
    const handleComicSelected = (comic) => {
        setSelected(comic);
    };

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

    const save = () => {
        setNewComics([
            ...newComics,
            {...inputs}
        ]);
    }

    console.log(inputs)

    useEffect(() => {
        Api().then(res => setComics(res.data.results));
    }, []);



    return (
        <div className="container-panel">
            <div className="left-panel">
                <h3 className="title">Comics</h3>
            {
                [...newComics, ...comics].map(comic => {
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
            </div>
        </div>
    );
}

export default PanelComics;