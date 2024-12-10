import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../API/api-utils";
import { Card } from "../../components/Products/Card/Card";
import { Product } from "../../data/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setProducts, toggleLike } from "../../store/ProductsSlice";
import { Link } from "react-router-dom";
import style from "./ProductList.module.css"
import { normalizeData } from "../../data";

const productsOnPage = 6;

const getPagesCount = (productsCount: number): number => {
  if (!productsCount || productsCount === undefined)
    return 1;
  return Math.ceil(productsCount / productsOnPage);
}

export const ProductList = () => {
  const [dataApi, setDataApi] = useState<Product[]>([])
  const [dataPag, setDataPag] = useState<Product[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [searchedText, setSearchedText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

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
    if (page < pagesCount)
      setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page > 1)
      setPage(page - 1);
  }

  useEffect(() => {
    const getProductsPage = (page: number) => {
      const productsPag = [];
      for (let i = (page - 1) * productsOnPage; i < page * productsOnPage && i < searchedProducts.length; i++)
        productsPag.push(searchedProducts[i]);
      return productsPag;
    };
    setDataPag(getProductsPage(page));
  }, [page, searchedProducts])

  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1)
  return (
    <div>
      <header className={style.main__header}>
        <div className={style.header__container}>
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
          <button onClick={handlePrevPage} disabled={page === 1} className={style.pagination__button}>{`<`}</button>
          {pages.map(pageNumber => {
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`${style.pagination__button} ${page === pageNumber ? style["pagination__step-active"] : ''}`}
              >
                {pageNumber}
              </button>)
          })}
          <button onClick={handleNextPage} disabled={page === pagesCount} className={style.pagination__button}>{`>`}</button>
        </div>
      </main>
    </div>
  )
}