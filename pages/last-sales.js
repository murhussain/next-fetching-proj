import { useEffect, useState } from 'react';

function LastSalesPage() {

  // Initialized variable for getting loaded data from API
  const [sales, setSales] = useState();
  // Initialized variable to work if data are not yet loaded from API
  const [isLoading, setIsLoading] = useState(false);
  
  // the part responsible in fetching data from API
  useEffect(() => {

    // setting isLoading to True if data are not yet loaded from API
    setIsLoading(true);

    fetch('https://nextjs-fetch-prj-default-rtdb.firebaseio.com/sales.json'
    ).then((response) => response.json()
    ).then((data) => {

      // getting list of objects from API as in JSON format and transform into regular JS objects
      const transformedSales = [];

      // initialization of objects into our variable
      for (const key in data) { 
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        });
      }

      // getting data from API
      setSales(transformedSales);
      // data are available for the client
      setIsLoading(false);
    });
  }, []);

  // checking if data are loading
  if (isLoading) {
    return (
      <p>Loading ......</p>
    );
  }

  // checking if no sales in DB
  if (!sales) {
    return (
      <p>No data yet!</p>
    );
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );

}
export default LastSalesPage;