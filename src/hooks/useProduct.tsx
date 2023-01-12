/* eslint-disable curly */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {API_URL, STORAGE_KEY} from '../utils/constants';
import axios from 'axios';

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
  tagNumber?: string; // not-in 6,
  assetDescription?: string;
  uniqueAssetNumber?: string;

  // Entity Data
  entityCode?: string;
  entity?: string;
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
  addBarcode: (code: string) => Promise<boolean>;
  addImage: (code: string, imageData: imageType) => Promise<boolean>;
  addType: (code: string, type: ProdType) => Promise<boolean>;
  addData: (code: string, data: ProductData) => Promise<boolean>;
  removeProduct: (code: string) => Promise<boolean>;
  submitData: () => Promise<boolean>;
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

  const removeProduct = async (code: string) => {
    const data = [...products].filter((item: Product) => item.barcode !== code);
    setProducts(data);
    await setItem(JSON.stringify(data));
    return Promise.resolve(true);
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

  const submitData = async () => {
    const rez = await products.map(async product => {
      const formData = new FormData();
      product.image?.map((img, imgIndx) => {
        formData.append('images[]', {
          uri: img.path,
          type: 'image/jpeg',
          name: `image-${img.id}-${imgIndx}`,
        });
      });
      if (product.barcode) formData.append('asset_tag', product.barcode);
      if (product.data?.custodian)
        formData.append('custodian', product.data?.custodian);
      if (product.data?.uniqueAssetNumber)
        formData.append(
          'unique_asset_number_entity',
          product.data?.uniqueAssetNumber,
        );
      if (product.data?.quantity)
        formData.append('quantity', product.data?.quantity);
      if (product.data?.baseUnitOfMeasure)
        formData.append('base_unit', product.data?.baseUnitOfMeasure);
      if (product.data?.assetDescription)
        formData.append(
          'asset_description_for_maintenance_purpose_english',
          product.data?.assetDescription,
        );
      if (product.data?.geographicalCoordinates?.latitude)
        formData.append('lat', product.data?.geographicalCoordinates?.latitude);

      if (product.data?.geographicalCoordinates?.longitude)
        formData.append(
          'lng',
          product.data?.geographicalCoordinates?.longitude,
        );

      if (product.data?.zipCode)
        formData.append('ZIP_code', product.data?.zipCode);
      if (product.data?.roomNumber)
        formData.append('room_number', product.data?.roomNumber);
      if (product.data?.floorNumber)
        formData.append('floors_number', product.data?.floorNumber);
      if (product.data?.buildingNumber)
        formData.append('building_number', product.data?.buildingNumber);
      if (product.data?.city) formData.append('city', product.data?.city);
      if (product.data?.region) formData.append('region', product.data?.region);
      if (product.data?.country)
        formData.append('country', product.data?.country);
      if (product.data?.gender) formData.append('gender', product.data?.gender);
      if (product.data?.productionCapacity)
        formData.append(
          'production_capacity',
          product.data?.productionCapacity,
        );
      if (product.data?.purpose)
        formData.append('purpose', product.data?.purpose);
      if (product.data?.stageInBiologicalCycle)
        formData.append(
          'stage_biological_cycle',
          product.data?.stageInBiologicalCycle,
        );
      if (product.data?.biologicalAge)
        formData.append('biological_age', product.data?.biologicalAge);
      if (product.data?.usefulLife)
        formData.append('useful_life', product.data?.usefulLife);
      if (product.data?.material)
        formData.append('material', product.data?.material);
      if (product.data?.plateNumber)
        formData.append('plate_number', product.data?.plateNumber);
      if (product.data?.yearOfManufacture)
        formData.append('year_of_manufacture', product.data?.yearOfManufacture);
      if (product.data?.manufactureSerialNumber)
        formData.append(
          'manufacturer_serial_number',
          product.data?.manufactureSerialNumber,
        );
      if (product.data?.countryOfOrigin)
        formData.append('country_of_origin', product.data?.countryOfOrigin);
      if (product.data?.model) formData.append('model', product.data?.model);
      if (product.data?.manufacturer)
        formData.append('manufacturer', product.data?.manufacturer);
      if (product.data?.entityCode)
        formData.append('company_id', product.data?.entityCode);
      if (product.data?.serialNumber)
        formData.append('serial_number', product.data?.serialNumber);
      if (product.data?.assetUtilization)
        formData.append('asset_Utilization', product.data?.assetUtilization);
      try {
        const res = await axios.post(`${API_URL}/hardware`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('==============');
        console.log('==============');
        console.log(res.data);
        console.log('==============');
        console.log('==============');
        return Promise.resolve(true);
      } catch (error: any) {
        console.log(error.message);
        return Promise.resolve(false);
      }

      /*
        uniqueFactoryId?: string;
        tagNumber?: string;
        reasonForIndefinite?: string;
        licenseExpiration?: string;
        programLicense?: string;
        version?: string;
      */
    });
    if (rez) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
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
        submitData,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
