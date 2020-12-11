import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import { useHistory } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import './Master.css';
  
const MasterLayout = ({children}) => {

  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  let history = useHistory();

  const toggle = () => setCollapsed(!collapsed);

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => history.push('/')}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => history.push('/comics')}>
              Comics
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => history.push('/comics/manage')}>
              Manage comics
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MasterLayout;