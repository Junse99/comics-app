import { Fragment, React, useState } from "react";
import { Button } from "antd";
import "./ComicCard.css";
import AdminModal from "../AdminModal/AdminModal";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { comicActions } from "../../redux/services/comics/comicSlice";

const ComicCard = ({ comic, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const { title, id, description, state, thumbnail, imageUrl } = comic;

  const dispatch = useDispatch();

  const {comics} = useSelector(state => state.comics)

  const onClick = () => {
    if (onSelect) {
      onSelect(comic);
    }
  };

  const abrirModal = () => {
    setVisible(true);
  };

  const deleteComic = ()=> {
      dispatch(comicActions.setComics({
          ...comics,
          reviewComics: comics.reviewComics.filter(i => i.id !== comic.id)
      }))
  };

  let message = "A revisar";
  let buttonType = "primary";
  switch (comic.state) {
    case "NEW":
      buttonType = "default";
      message = "Añadir a revisados";
      break;
    case "REVIEW":
      buttonType = "primary";
      message = "Añadir a la lista";
      break;
    case "APPROVED":
      buttonType = "text";
      message = "Completado";
      break;
    default:
      buttonType = "text";
      message = "Sin estado";
      break;
  }

  return (
    <div className="card-comic-container">
      <div className="img-card">
        <img
          src={
            imageUrl ||
            "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1471610692/content-items/001/689/946/potada_comic-original.jpg?1471610692"
          }
        ></img>
      </div>
      <div className="right-content-card">
        <div className="title-card">
          <label>
            <b>Titulo: </b>
            {title}
          </label>
        </div>
        <div className="description-card">
          <p>{description}</p>
        </div>
      </div>
      <div>
        {onSelect && (
          <Button
            type={buttonType}
            style={{ marginBottom: "10px" }}
            onClick={onClick}
          >
            {message}
          </Button>
        )}
        {state === "REVIEW" && (
          <Fragment>
            <Button success

              style={{ marginBottom: "10px", marginLeft: "10px" }}
              onClick={abrirModal}
            >
              Editar
            </Button>
            <Button
              type="danger"
              style={{ marginBottom: "10px", marginLeft: "10px" }}
              onClick={deleteComic}
            >
              Eliminar
            </Button>
          </Fragment>
        )}
      </div>
      <AdminModal
        comic={comic}
        visible={visible}
        setVisible={setVisible}
        title="Editar Comic"
      ></AdminModal>
    </div>
  );
};

export default ComicCard;
