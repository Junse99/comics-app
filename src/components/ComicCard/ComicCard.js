import {React, useState} from 'react';
import {Button} from 'antd';
import './ComicCard.css';
import AdminModal from '../AdminModal/AdminModal'

const ComicCard = ({comic, onSelect}) => {

    const [visible, setVisible] = useState(false);
    const {
        title, 
        id, 
        description,
        state,
        thumbnail} = comic;

    const onClick = () => {
        if(onSelect) {
            onSelect(comic)
        }
    };

    const abrirModal = () => {
        setVisible(true);
      };

    let message = 'A revisar';
    let buttonType = 'primary';
    switch(comic.state){
        case 'NEW': 
            buttonType = 'default';
            message = 'Añadir a revisados';
            break;
        case 'REVIEW': 
            buttonType = 'primary';
            message = 'Añadir a la lista';
            break;
        case 'APPROVED':
            buttonType = 'text';
            message = 'Completado';
            break;
        default:
            buttonType = 'text';
            message = 'Sin estado';
            break;
    }

    return (
        <div className="card-comic-container">
            <div className="img-card">
                <img src={(thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null) || "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1471610692/content-items/001/689/946/potada_comic-original.jpg?1471610692"}></img>
            </div>
            <div className="right-content-card">
                <div className="title-card">
                    <label><b>Titulo: </b>{title}</label>
                </div>
                <div className="description-card">
                    <p>{description}</p>
                </div>
            </div>
            <div>
            {
                onSelect && (<Button
                    type={buttonType}
                    style={{ marginBottom: "10px" }}
                    onClick={onClick}
                  >
                      {message}
              </Button>)
            }
            {
                state === "REVIEW" && (
                <Button
                    type="danger"
                    style={{ marginBottom: "10px", marginLeft: "10px"}}
                    onClick={abrirModal}
                  >
                      Editar
              </Button>)
            }
            </div>
            <AdminModal comic = {comic} visible={visible} setVisible={setVisible} title="Editar Comic"></AdminModal>
        </div>
    );
}

export default ComicCard;