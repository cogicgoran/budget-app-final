export interface IMarketplace {
  id: number;
  name: string;
  address: string;
}

export interface ICurrency {
  id: number;
  code: string;
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export interface IReceipt {
  id: number;
  categoryId: number;
  category: ICategory;
  currencyId: number;
  currency: ICurrency;
  marketplaceId: number;
  marketplace: IMarketplace;
  date: string;
  articles: Array<IArticle>;
}

export interface IArticle {
  id: number;
  name: string;
  unitPrice: number;
  amount: number;
  categoryId: number;
  category: ICategory;
  currencyId: number;
  currency: ICurrency;
}
