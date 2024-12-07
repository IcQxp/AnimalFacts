import { useEffect, useState } from "react";
import { getProducts } from "../../API/api-utils";
import { Card } from "../../components/Products/Card/Card";
import { Product } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setProducts, toggleLike } from "../../store/ProductsSlice";
import { Link } from "react-router-dom";
import style from "./ProductList.module.css"

function formatDate(DateForFormatted: Date): string {
  const pad = (i: number) => (i < 10) ? "0" + i : "" + i;
  return `${DateForFormatted.getFullYear()}.${pad(1 + DateForFormatted.getMonth())}.${pad(DateForFormatted.getDate())}, ${pad(DateForFormatted.getHours())}:${pad(DateForFormatted.getMinutes())}:${pad(DateForFormatted.getSeconds())}`
}

function normalizeData(data: any[]): Product[] {
  return data.map((item, index): Product => {
    let formattedDate = formatDate(new Date());
    return {
      id: index + 1, 
      title: item.title,
      text: item.description,
      createdDate: formattedDate,
      image: item.image,
      liked: false
    };
  });
}

export const ProductList = () => {
  const [showFavorites,setShowFavorites] = useState<boolean>();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const [dataApi, setDataApi] = useState<Product[]>()
  const handleToggleLike = (id: number) => {
    dispatch(toggleLike(id));
    setDataApi(prevData => prevData&& 
      prevData.map(product => 
        product.id === id ? { ...product, liked: !product.liked } : product
      ))
    
  };

  useEffect(() => {
    const getData = async () => {
      const allData = await getProducts();
      const normalizedData = normalizeData(allData);
      setDataApi(normalizedData);
      dispatch(setProducts(normalizedData));
    };

    if (products.length === 0) {
      getData();
    } else {
      setDataApi(products); 
    }
  }, [dispatch, products]);

  const filteredProducts = dataApi&&showFavorites
    ? dataApi.filter(product => product.liked) 
    : dataApi; 

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={() => setShowFavorites(!showFavorites)}>Избранные карточки</button>
      <Link to={`/create-product`}>asdasd</Link>
      </header>
        <main>
        <section className={style.list} >
          {
            filteredProducts&&filteredProducts.map(elem => { return <Card key={elem.id} {...elem} onToggleLike={handleToggleLike}/>  })
          }
        </section>
        </main>
    </div>
  )
}

