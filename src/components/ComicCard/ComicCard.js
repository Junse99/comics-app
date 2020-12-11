import React from 'react';
import './ComicCard.css';

const ComicCard = ({title, id, description, thumbnail, onSelect}) => {

    const onClick = () => {
        if(onSelect) {
            onSelect({
                id, 
                title, 
                description, 
                thumbnail
            })
        }
    };

    return (
        <div className="card-comic-container" onClick={onClick}>
            <div className="img-card">
                <img src={thumbnail || "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1471610692/content-items/001/689/946/potada_comic-original.jpg?1471610692"}></img>
            </div>
            <div className="right-content-card">
                <div className="title-card">
                    <label><b>Titulo: </b>{title}</label>
                </div>
                <div className="description-card">
                    <p>{description}</p>
                </div>
            </div>
            
        </div>
    );
}

export default ComicCard;