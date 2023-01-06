import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../utils/constants';

type ProductData = {
  name: string;
  height: string;
  width: string;
  weight: string;
};

type Product = {
  barcode: string;
  image?: string[];
  data?: ProductData;
};

type ProductContext = {
  products: Product[];
  addBarcode: (code: string) => Promise<void>;
  addImage: (code: string, imageArr: string[]) => Promise<void>;
  addData: (code: string, data: ProductData) => Promise<void>;
  removeProduct: (code: string) => Promise<void>;
};

type ProductProviderProps = {
  children: ReactNode;
};

const ProductContext = createContext({} as ProductContext);

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({children}: ProductProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(`${STORAGE_KEY}-PRODUCTS`);

  const [products, setProducts] = useState<Product[]>([]);

  const addBarcode = async (code: string) => {
    const data = [...products, {barcode: code}];
    setProducts(data);
    await setItem(JSON.stringify(data));
  };
  const addImage = async (code: string, imageArr: string[]) => {
    const data = [...products];
    data.map((item: Product) => {
      if (item.barcode === code) {
        return {...item, image: imageArr};
      }
    });
    setProducts(data);
    await setItem(JSON.stringify(data));
  };
  const addData = async (code: string, dataObj: ProductData) => {
    const data = [...products];
    data.map((item: Product) => {
      if (item.barcode === code) {
        return {...item, data: dataObj};
      }
    });
    setProducts(data);
    await setItem(JSON.stringify(data));
  };
  const removeProduct = async (code: string) => {
    const data = [...products].filter((item: Product) => item.barcode !== code);
    setProducts(data);
    await setItem(JSON.stringify(data));
  };

  useEffect(() => {
    (async () => {
      const data = await getItem();
      if (data) {
        setProducts(JSON.parse(data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addBarcode,
        addImage,
        addData,
        removeProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
