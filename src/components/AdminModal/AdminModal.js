import React, { useEffect, useState } from "react";
import * as validation from "../../containers/Comics/validations";
import { Form, Input, InputNumber, Row, Col, Modal, Button, message } from "antd";
import {comicActions} from '../../redux/services/comics/comicSlice'
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const AdminModal = ({comic, visible, setVisible, title, buttonTitle}) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {comics} = useSelector(state => state.comics)

    useEffect(() => {
        form.setFieldsValue(comic)
    }, [])

  const [inputs, setInputs] = useState({
    title: "",
    id: "",
    description: "",
    thumbnail: {
      path: "",
      extension: "",
    },
  });

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

  const onFinish = (values) => {
    if(comic) {
        const reviewComics = comics.reviewComics.map(c => (c.id === comic.id) ? values : c)
        dispatch(comicActions.setComics({...comics, reviewComics}))
        message.success("Comic actualizado")
    }else{
        dispatch(comicActions.addComic(values));
        message.success("Comic agregado")
    }
    setVisible(false);
  };

  const onFinishFailed = (res) => console.log(res);

  const handleCancel = () => setVisible(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const footerModal = [
    <Row>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" form="comic">
          Guardar
        </Button>
      </Form.Item>
      ,
    </Row>,
  ];
  return (
    <>
      <Modal
        title={title}
        onCancel={handleCancel}
        visible={visible}
        footer={footerModal}
      >
        <Form
          {...layout}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          name="comic"
          form={form}
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
    </>
  );
};

export default AdminModal;
