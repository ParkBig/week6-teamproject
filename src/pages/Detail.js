import React from "react";
import DetailBoard from "../components/detailBoard/DetailBoard";
import Comments from "../components/detailBoard/comments/Comments";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";

const Detail = () => (
  <Layout>
    <Header />
    <DetailBoard />
  </Layout>
);

export default Detail;
