import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../API/api-utils";
import { Card } from "../../components/Products/Card/Card";
import { Product } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setProducts, toggleLike } from "../../store/ProductsSlice";
import { Link } from "react-router-dom";
import style from "./ProductList.module.css"

const productsOnPage = 6;

const getPagesCount = (productsCount: number): number =>{
  if (!productsCount || productsCount===undefined)
    return 1;
  return Math.ceil(productsCount / productsOnPage);
}


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
  const [showFavorites, setShowFavorites] = useState<boolean>();
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState<string>("");
  const products = useSelector((state: RootState) => state.products.products);
  const [dataApi, setDataApi] = useState<Product[]>()
  const [page,setPage] = useState<number>(1);
  const [dataPag,setDataPag] = useState<Product[]>();

  const handleToggleLike = (id: number) => {
    dispatch(toggleLike(id));
    setDataApi(prevData => prevData &&
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFavorites(event.target.checked);
    setPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
    setPage(1);
  }


  const filteredProducts = useMemo(() => {
    return showFavorites
      ? dataApi?.filter(product => product.liked) || []
      : dataApi || [];
  }, [dataApi, showFavorites]);

  const searchedProducts = useMemo(() => {
    return filteredProducts?.filter(product =>
      product.text.toLowerCase().includes(searchedText.toLowerCase()) ||
      product.title.toLowerCase().includes(searchedText.toLowerCase())
    ) || [];
  }, [filteredProducts, searchedText]);


const pagesCount = getPagesCount(searchedProducts.length);

const handleNextPage = () => {
 if (page< pagesCount)
setPage(page+1);
}

const handlePrevPage = () => {
  if (page> 1)
    setPage(page-1);
}

useEffect(()=>{
  const getProductsPage = (page:number) => {
    const productsPag = [];
  for (let i = (page-1)*6;i<page*6&&i<searchedProducts.length;i++)
    productsPag.push(searchedProducts[i]);
    return productsPag;
  };
  setDataPag(    getProductsPage(page));
},[page,searchedProducts])

const pages = Array.from({length: pagesCount},(_,index)=> index+1)
  return (
    <div>
      <header className={style.main__header}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <input id="favourite" type="checkbox" onChange={handleCheckboxChange} />
          <label htmlFor="favourite" ><h2 className={style.nav__elem}>Показать избранное</h2></label>
        </div>
        <input value={searchedText} onChange={handleSearch} className={style.search__input} />
        <Link to={`/create-product`}><h2 className={style.nav__elem}>Добавить продукт</h2></Link>
      </header>
      <main>
        <section className={style.list} >
          {
            dataPag && dataPag.map(elem => { return <Card key={elem.id} {...elem} onToggleLike={handleToggleLike} /> })
          }
        </section>
        <div className={style.pagination__buttons}>
        <button onClick={handlePrevPage} disabled={page===1} className={style.pagination__button}>{`<`}</button>
        {pages.map (pageNumber => {return (<button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`${style.pagination__button} ${page === pageNumber ? style["pagination__step-active"] : ''}`}
            >
              {pageNumber}
            </button>)})}
          <button onClick={handleNextPage} disabled={page===pagesCount} className={style.pagination__button}>{`>`}</button>
        </div>
      </main>
    </div>
  )
}