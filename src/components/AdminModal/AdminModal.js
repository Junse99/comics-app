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
    description: "",
    imageUrl: ""
  });

  const onChange = (e) => {
    console.warn(e.target.value);

      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });

  };

  const onFinish = (values) => {
    if(comic) {
        const reviewComics = comics.reviewComics.map(c => (c.id === comic.id) ? values : c)
        dispatch(comicActions.setComics({...comics, reviewComics}))
        message.success("Comic actualizado")
    }else{
      console.log(values)
      dispatch(comicActions.addComic({values, hide}));
      /*
        message.success("Comic agregado") */
    }
    
  };

  const hide = () => {
    setVisible(false);
    form.resetFields()
  }
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
          <Form.Item
            name="description"
            label="Descripción"
            rules={validation.schema.description}
          >
            <Input name="description" onChange={onChange} />
          </Form.Item>
          <Form.Item
            name={"imageUrl"}
            label="URL de Imagen"
            rules={validation.schema.imageUrl}
          >
            <Input name="imageUrl" onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminModal;
