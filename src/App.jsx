import { Loader } from "lucide-react";
import Products from "./components/Products";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [available, setAvailable] = useState(true);
  const loaderRef = useRef();
  const productPerPage = 10;

  useEffect(() => {
    //product fetching function
    const fetchProducts = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${productPerPage}&skip=${
          productPerPage * page
        }`
      );

      const data = res.data;
      if (data.products.length === 0) {
        setAvailable(false);
      } else {
        setProducts([...products, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver((entry) => {
      const loader = entry[0];
      if (loader.isIntersecting) {
        fetchProducts();
      }
    });

    if (observer && available) observer.observe(loaderRef.current);

    //cleanup function
    return () => {
      if (observer) observer.disconnect();
    };
  }, [available, page, products]);

  return (
    <div className="w-full min-h-screen bg-black text-gray-400 flex-col flex items-center">
      <Products products={products} />
      {available && (
        <div className="mt-4" ref={loaderRef}>
          <Loader size={"2rem"} color="gray" />
        </div>
      )}
    </div>
  );
}

export default App;
