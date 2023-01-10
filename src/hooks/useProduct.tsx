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
  gender?: 'male' | 'female';
  productionCapacity?: string;
  purpose?: string;
  stageInBiologicalCycle?: string;
  biologicalAge?: number;
  usefulLife?: number;

  geographicalCoordinates?: string;
  zipCode?: string;
  roomNumber?: string;
  floorNumber?: string;
  buildingNumber?: string;
  city?: string;
  region?: string;
  country?: string;

  custodian?: string;
  uniqueFactoryId?: string;
  quantity?: number;
  baseUnitOfMeasure?: string;
  tagNumber?: string;
  assetDescription?: string;
  uniqueAssetNumber?: string;

  entityCode?: string;
  entity?: string;
};

type imageType = {
  id: number;
  path: string;
};

type ProdType = 'BIO' | 'MACHINE';

export type Product = {
  barcode: string;
  image?: imageType[];
  data?: ProductData;
  type?: ProdType;
};

type ProductContext = {
  products: Product[];
  addBarcode: (code: string) => Promise<void>;
  addImage: (code: string, imageData: imageType) => Promise<void>;
  addType: (code: string, type: ProdType) => Promise<void>;
  addData: (code: string, data: ProductData) => Promise<void>;
  removeProduct: (code: string) => Promise<void>;
  getProduct: (code: string) => Product | undefined;
  getType: (code: string) => ProdType | undefined;
};

type ProductProviderProps = {
  children: ReactNode;
};

const ProductContext = createContext({} as ProductContext);

export const useProduct = () => {
  return useContext(ProductContext);
};

export const PRODUCT_KEY = `${STORAGE_KEY}-PRODUCTS`;

export const ProductProvider = ({children}: ProductProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(PRODUCT_KEY);

  const [products, setProducts] = useState<Product[]>([]);

  const addBarcode = async (code: string) => {
    const found = products.find(product => product.barcode === code);
    let data;
    if (found) {
      data = products.map(product => {
        if (product.barcode === code) {
          return {...product, barcode: code};
        } else {
          return product;
        }
      });
    } else {
      data = [
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
    }
    if (data) {
      setProducts(data);
      return await setItem(JSON.stringify(data));
    } else {
      return Promise.reject();
    }
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
    return await setItem(JSON.stringify(prodUpdated));
  };

  const addType = async (code: string, type: ProdType) => {
    const prodUpdated = [...products].map((product: Product) => {
      if (product.barcode === code) {
        return {...product, type: type, data: {}};
      } else {
        return product;
      }
    });
    setProducts(prodUpdated);
    return await setItem(JSON.stringify(prodUpdated));
  };

  const addData = async (code: string, dataObj: ProductData) => {
    const prodUpdated = [...products].map((product: Product) => {
      if (product.barcode === code) {
        return {...product, data: dataObj};
      } else {
        return product;
      }
    });

    setProducts(prodUpdated);
    return await setItem(JSON.stringify(prodUpdated));
  };

  const removeProduct = async (code: string) => {
    const data = [...products].filter((item: Product) => item.barcode !== code);
    setProducts(data);
    return await setItem(JSON.stringify(data));
  };

  const getProduct = (code: string) => {
    return [...products].find(product => product.barcode === code);
  };

  const getType = (code: string) => {
    const prod = [...products].find(product => product.barcode === code);
    if (prod) {
      return prod.type;
    } else {
      return undefined;
    }
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
        addType,
        addData,
        removeProduct,
        getProduct,
        getType,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
