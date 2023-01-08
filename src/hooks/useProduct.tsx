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
  image?: imageType[];
  data?: ProductData;
};

type imageType = {
  id: number;
  path: string;
};

type ProductContext = {
  products: Product[];
  addBarcode: (code: string) => Promise<void>;
  addImage: (code: string, imageData: imageType) => Promise<void>;
  addData: (code: string, data: ProductData) => Promise<void>;
  removeProduct: (code: string) => Promise<void>;
  getProduct: (code: string) => Product | undefined;
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
    const data = [
      ...products,
      {
        barcode: code,
        image: [
          {
            id: 1,
            path: '',
          },
          {
            id: 2,
            path: '',
          },
          {
            id: 3,
            path: '',
          },
        ],
      },
    ];
    setProducts(data);
    await setItem(JSON.stringify(data));
  };
  const addImage = async (code: string, imageData: imageType) => {
    const prodUpdated = [...products].map((product: Product) => {
      if (product.barcode === code) {
        if (product.image && product.image.length) {
          const existing = product.image.find(
            (imageItem: imageType) => imageItem.id === imageData.id,
          );

          if (existing) {
            const imgArr = product.image.map((imageItem: imageType) => {
              if (imageItem.id === imageData.id) {
                return {...imageItem, path: imageData.path};
              } else {
                return imageItem;
              }
            });
            return {...product, image: [...imgArr]};
          } else {
            const imgArr = product.image;
            imgArr.push(imageData);
            return {...product, image: imgArr};
          }
        } else {
          return {...product, image: [imageData]};
        }
      } else {
        return product;
      }
    });

    setProducts(prodUpdated);
    await setItem(JSON.stringify(prodUpdated));
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

  const getProduct = (code: string) => {
    return [...products].find(product => product.barcode === code);
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
        getProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
