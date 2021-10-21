import 'antd/dist/antd.css'
import './App.css';

import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import styled from '@emotion/styled'
// import { Spin } from 'antd';

import Header from 'components/Header';
import routes from 'pages'

function App() {
  const element = useRoutes(routes);

  return (
    <div className="App">
      <Header />
      <Suspense fallback={null}>{element}</Suspense>
    </div>
  );
}

// const fallBack = () => {
//   return (
//     <Loading><Spin tip="Loading..." size="large" /></Loading>
//   )
// }

export default App;

// const Loading = styled.div`
// width: 100%;
// display: flex;
// justify-content: center;
// padding-top: 20px;
// `