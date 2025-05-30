import { FileMetadata } from "../files/fileMetadata";
import { SizeStock } from "./sizeStock";

export interface ReqProduct {
  id: string;

  // Identifiers
  productCode: string;
  barcode: string;
  sku: string;
  upc: string;

  // Basic Info
  name: string;
  description: string;
  category: string;
  subcategory: string;

  // Supplier & Manufacturer
  supplierId?: string;
  manufacturer: string;
  brand: string;

  // Sizes
   fileMetadata?:FileMetadata[];

  // Batching & Production
  expirationDate: string;       // ISO Date string
  manufacturingDate: string;

  // Embedded Objects
  pricing: ProductPricing;
  inventory: ProductInventory;
  media: ProductMedia;

  // Status & Audit
  status: boolean;
  typeFile?:string;
}

// Subtypes



export interface ProductPricing {
  costPrice: number;
  sellingPrice: number;
  discount: number;
  currency: string;
}

export interface ProductInventory {
  unitMeasure: string;
  minStock: number;
  maxStock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  batch: string;
  weight: number;
  height: number;
  width: number;
  length: number;
}

export interface ProductMedia {
  imageUrls: string[];
  thumbnailUrl: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

