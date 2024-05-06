import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import "@/styles/home.css";

import type { AppProps } from "next/app";
import { Layout, Menu, theme } from "antd";
import PageHeader from "@/components/PageHeader";
import React from "react";
import axios from "axios";
import { UserContextProvider } from "@/context/UserContext";
import { SparklesCore } from "@/components/ui/sparkles";

const { Header, Content, Footer } = Layout;

// axios.defaults.baseURL = "https://scrappingbackend.onrender.com";
axios.defaults.baseURL = "http://localhost:4000";

axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <UserContextProvider>
        <Layout>
          <Sidebar />
          <Layout>
            <Header
              style={{ padding: 0, background: colorBgContainer }}
              className="sticky relative top-0"
            >
              <PageHeader />
            </Header>

            <Content style={{ margin: "24px 14px 0" }}>
              <div
                style={{
                  // padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
                className="rounded-xl shadow-xl h-full w-full sm:p-[24px]"
              >
                <Component {...pageProps} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Predictor ©2024 Created by Harsh and Gagan
            </Footer>
          </Layout>
        </Layout>
      </UserContextProvider>
    </>
  );
}
