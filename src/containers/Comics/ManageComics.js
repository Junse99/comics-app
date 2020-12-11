import React, { useEffect, useState } from "react";
import { ComicCard } from "../../components";
import { Api } from "../../common/api";
import { Form, Input, InputNumber, Row, Col, Modal, Button } from "antd";
import "./ManageComics.css";
import * as validation from "./validations";

const ManageComics = () => {
  const [newComics, setNewComics] = useState([]);
  const [comics, setComics] = useState([]);
  const [revision, setRevision] = useState([]);
  const [aprobados, setAprobados] = useState([]);
  const [visible, setVisible] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    description: "",
    thumbnail: {
      path: "",
      extension: "",
    },
  });

  useEffect(() => {
    Api().then((res) => setComics(res.data.results));
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log("values: ", values);
    setNewComics([...newComics, { ...values }]);
  };

  const onFinishFailed = (res) => console.log(res);

  const handleCancel = () => setVisible(false);

  const abrirModal = () => {
    setVisible(true);
  };

  const agregarComic = (e) => {
    e.preventDefault();
    setNewComics([...newComics, { ...inputs }]);
    setVisible(false);
  };

  const filtrar = (arreglo, comic) => {
    return arreglo.filter(function (com) {
      return com.id !== comic.id;
    });
  };

  const pasarRevision = (comic) => {
    if (comics.includes(comic)) {
      setComics([...filtrar(comics, comic)]);
    } else {
      setNewComics([...filtrar(newComics, comic)]);
    }
    setRevision([...revision, { ...comic }]);
  };

  const aprobar = (comic) => {
    const arr = revision.filter(function (com) {
      return com.id !== comic.id;
    });
    setRevision([...arr]);
    setAprobados([...aprobados, { ...comic }]);
  };

  const onChange = (e) => {
    console.warn(e.target.value);
    if (e.target.name === "path" || e.target.name === "extension") {
      setInputs({
        ...inputs,
        thumbnail: {
          ...inputs.thumbnail,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const footerModal = [
    <Row>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          form="new-comic"
          onClick={agregarComic}
        >
          {" "}
          Agregar{" "}
        </Button>
      </Form.Item>
      ,
    </Row>,
  ];

  const text =
    "Heavy-hitting heroes unite! This Official Handbook contains in-depth bios on more than 30 of the Marvel Universe's most awesome assemblages - including the Defenders, Power Pack and the New Thunderbolts! Plus: An all-new cover by superstar artist Tom Grummett, digitally painted by Morry Hollowell. <br>48 PGS./All Ages ...$3.99 <br>";

  return (
    <div style={{ textAlign: "center" }}>
      <Modal
        title="Registrar nuevo comic"
        onCancel={handleCancel}
        visible={visible}
        footer={footerModal}
      >
        <Form
          {...layout}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          name="new-comic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validation.messages}
        >
          <Form.Item
            name="title" //Equivale al ID en .net
            label="Título"
            rules={validation.schema.title}
          >
            <Input name="title" onChange={onChange} />
          </Form.Item>
          <Form.Item name="id" label="Id" rules={validation.schema.id}>
            <Input name="id" onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={validation.schema.description}
          >
            <Input name="description" onChange={onChange} />
          </Form.Item>
          <Form.Item
            name={["thumbnail", "path"]}
            label="Path"
            rules={validation.schema.path}
          >
            <Input name="path" onChange={onChange} />
          </Form.Item>
          <Form.Item
            name={["thumbnail", "extension"]}
            label="Extensión"
            rules={validation.schema.extension}
          >
            <Input name="extension" onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        style={{ marginBottom: "10px" }}
        onClick={abrirModal}
      >
        Agregar Comic
      </Button>
      <Row>
        <Col
          xs={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
          className="column"
        >
          Nuevos
          {[...newComics, ...comics].map((comic) => {
            const { id, title, description, thumbnail } = comic;

            return (
              <div>
                <ComicCard
                  key={id}
                  id={id}
                  title={title}
                  description={description ? description : text}
                  thumbnail={
                    thumbnail
                      ? `${thumbnail.path}.${thumbnail.extension}`
                      : null
                  }
                />
                <Button
                  type="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={() => pasarRevision(comic)}
                  id={id}
                  data-title={title}
                >
                  Agregar a Revisión
                </Button>
              </div>
            );
          })}
        </Col>
        <Col
          xs={{ span: 11, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          className="column"
        >
          Revisión
          {revision.map((comic) => {
            const { id, title, description, thumbnail } = comic;

            return (
              <div>
                <ComicCard
                  key={id}
                  id={id}
                  title={title}
                  description={description ? description : text}
                  thumbnail={
                    thumbnail
                      ? `${thumbnail.path}.${thumbnail.extension}`
                      : null
                  }
                />
                <Button
                  type="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={() => aprobar(comic)}
                  id={id}
                  data-title={title}
                >
                  Aprobar
                </Button>
              </div>
            );
          })}
        </Col>
        <Col
          xs={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          className="column"
        >
          Aprobados
          {aprobados.map((comic) => {
            const { id, title, description, thumbnail } = comic;

            return (
              <ComicCard
                key={id}
                id={id}
                title={title}
                description={description ? description : text}
                thumbnail={
                  thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
                }
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ManageComics;
