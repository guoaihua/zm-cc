import { Layout, Menu, Row, Col, Card, MenuProps } from "antd";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import historyAdapter from "./history";
import matchRoutes from "./matchRoutes";

import styles from "../style/index.module.scss";
const { Content, Footer } = Layout;

interface AppProps {
  children: React.ReactNode;
}

const items = [
  {
    label: "首页",
    key: "home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 inline-block align-text-bottom"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        />
      </svg>
    ),
  }, // 菜单项务必填写 key
  { label: "灵感", key: "ideals" },
  { label: "工作", key: "work" },
];

const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    console.log("app init start");
    historyAdapter(matchRoutes);
  }, []);

  const renderApps = () => {
    const list = [
      {
        name: "test1",
        desc: "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts",
      },
      {
        name: "test2",
        desc: "adadad",
      },
    ];
    return (
      <>
        <Card>
          <Row className={styles.testAaa}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-around" }}
              className={styles.f25}
            >
              {list.map(({ name, desc }) => (
                <Card
                  title={name}
                  key={name}
                  className="w-64 rounded hover:ring-1 hover:shadow-xl ring-gray-200 ring-opacity-20 transition-shadow cursor-pointer testred"
                >
                  <p>{desc}</p>
                </Card>
              ))}
            </Col>
          </Row>
        </Card>
      </>
    );
  };

  const onClick: MenuProps["onClick"] = (e) => {
    const { key } = e;
    console.log("click ", e);
    window.history.pushState({}, "ada", `/${key}`);
  };

  return (
    <>
      <Layout className="app w-full h-full">
        <Row className="bg-white border-slate-900/10">
          <Col span={24} className=" pl-5 ">
            <Menu
              onClick={onClick}
              items={items}
              mode="horizontal"
              style={{ minWidth: 0, flex: "auto" }}
            ></Menu>
          </Col>
        </Row>
        <Content className="h-full bg-green-300/25">{renderApps()}</Content>
        {props.children}
        <Row>
          <Col span={24} className="text-center text-current py-5 px-3">
            footer is designing
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default App;
