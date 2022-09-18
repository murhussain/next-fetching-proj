import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if(!loadedProduct){
    return (
      <p>Loading......</p>
    );
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  // this line is responsible for storing id from user request
  const productId = params.pid;

  // the line is responsible to read dataFile 
  const data = await getData();

  // this line is responsible for fetching individual object from dataFile
  const product = data.products.find((product) => product.id === productId);

  // return not found if parameter passed in request is notFound in dummyData
  if(!product){
    return { notFound: true };
  }

  // this line is responsible for sending fetched object to the Component
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  // the line is responsible to read dataFile 
  const data = await getData();

  // search all ids in dummyData file
  const ids = data.products.map((product) => product.id);

  // creating parameters of all id to be sent on a page based on selected one
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))
  return {
    paths: pathsWithParams,
    fallback: true
  };
}

export default ProductDetailPage;