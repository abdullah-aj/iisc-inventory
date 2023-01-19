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
  // INFRASTRUCTURE & MACHINE & TRANSPORT
  material?: string;
  plateNumber?: string;
  yearOfManufacture?: string;
  manufactureSerialNumber?: string;
  serialNumber?: string; // only-in 3
  countryOfOrigin?: string;
  model?: string;
  manufacturer?: string;

  // FURNITURE - no dedicated field

  // BIO
  gender?: 'male' | 'female';
  productionCapacity?: string;
  purpose?: string;
  stageInBiologicalCycle?: string;
  biologicalAge?: number;
  usefulLife?: number;

  // INTANGIBLE
  assetUtilization?: string;
  reasonForIndefinite?: string;
  licenseExpiration?: string;
  programLicense?: string;
  version?: string;

  // Geographical Location
  geographicalCoordinates?: {
    // not-in 6
    latitude: string;
    longitude: string;
  };
  zipCode?: string; // not-in 6
  roomNumber?: string; // not-in 5, 6
  floorNumber?: string; // not-in 5, 6
  buildingNumber?: string; // not-in 5, 6
  city?: string; // not-in 6
  region?: string; // not-in 6
  country?: string; // not-in 6

  // Asset Identification
  custodian?: string;
  uniqueFactoryId?: string; // not-in 6, 5, 4, 1
  quantity?: number;
  baseUnitOfMeasure?: string;
  tagNumber?: string; // not-in 6, // barcode
  assetDescription?: string;
  uniqueAssetNumber?: string;

  // Entity Data
  entityCode?: string;
  entity?: string;

  // extra
  assetCondition?: string;
};

type imageType = {
  id: number;
  path: string;
};

export type ProdType =
  | 'INFRASTRUCTURE'
  | 'MACHINE'
  | 'TRANSPORT'
  | 'FURNITURE'
  | 'BIO'
  | 'INTANGIBLE';

export type Product = {
  barcode: string;
  image?: imageType[];
  data?: ProductData;
  type?: ProdType;
};

type ProductContext = {
  products: Product[];
  addBarcode: (code: string, type?: ProdType) => Promise<boolean>;
  addImage: (code: string, imageData: imageType) => Promise<boolean>;
  addType: (code: string, type: ProdType) => Promise<boolean>;
  addData: (code: string, data: ProductData) => Promise<boolean>;
  getProduct: (code: string) => Product | undefined;
  getType: (code: string) => ProdType | undefined;
  updateAfterSubmit: (updated: Product[]) => Promise<void>;
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

  // @ts-expect-error
  const addBarcode = async (code: string, type: ProdType = '') => {
    const found = products.find(product => product.barcode === code);
    let data;
    if (found) {
      data = products.map(product => {
        if (product.barcode === code) {
          return {...product, barcode: code, type: type};
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
          type: type,
        },
      ];
    }
    if (data) {
      setProducts(data);
      await setItem(JSON.stringify(data));
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
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
    await setItem(JSON.stringify(prodUpdated));
    return Promise.resolve(true);
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
    await setItem(JSON.stringify(prodUpdated));
    return Promise.resolve(true);
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
    await setItem(JSON.stringify(prodUpdated));
    return Promise.resolve(true);
  };

  const updateAfterSubmit = async (updated: Product[]) => {
    setProducts(updated);
    await setItem(JSON.stringify(updated));
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
        getProduct,
        getType,
        updateAfterSubmit,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
