import { Layout, Menu, Row, Col, Card } from "antd";
import React from "react";

const { Header, Content, Footer } = Layout;

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = (props) => {
  console.log(props);

  const items = [
    { label: "菜单项一", key: "item-1" }, // 菜单项务必填写 key
    { label: "菜单项二", key: "item-2" },
    {
      label: "子菜单",
      key: "submenu",
      children: [{ label: "子菜单项", key: "submenu-item-1" }],
    },
  ];

  const renderApps = () => {
    const list = [1, 2, 3];

    return (
      <>
        <Card>
          <Row>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              {list.map((i) => (
                <Card
                  title="Default size card"
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              ))}
            </Col>
          </Row>
        </Card>
      </>
    );
  };
  console.log(props);

  return (
    <>
      <Layout className="app">
        <Header style={{ backgroundColor: "#ccc" }}>
          <Menu items={items} mode="horizontal"></Menu>
        </Header>
        <Content>{renderApps()}</Content>
        <Footer>footer222</Footer>
      </Layout>
    </>
  );
};

export default App;
