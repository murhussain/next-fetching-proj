import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {
        products.map((product) => (
          // <li key={product.id}>{product.title}</li>
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))
      } 
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // if failed to find data file then redirect user to the other path
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // if it finds empty content in the file the returns 404 page
  if (data.products.length === 0) {
    return { notFound: true };
  }

  //  return page with the content if file has data
  return {
    props: {
      products: data.products
    },
    // reload the page after every 10sec if data changes, then update the webpage
    revalidate: 10, 
  };
}

export default HomePage;