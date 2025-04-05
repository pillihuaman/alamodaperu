export interface ReqProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    barcode: string;
    page?: number;
    pagesize?: number;
  }