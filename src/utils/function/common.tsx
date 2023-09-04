import { AxiosError } from "axios";

export function handleIncomingArticles(articles: any[]) {
  const receiptsObj: any = {};

  articles.forEach((article) => {
    // Create object for each individual receipt with receipt info
    const property = String(article.receipt_id);
    if (!receiptsObj[property]) {
      receiptsObj[property] = {};
      receiptsObj[property].receipt_id = article.receipt_id;
      receiptsObj[property].shop_name = article.shop_name;
      receiptsObj[property].receipt_price = article.receipt_price;
      receiptsObj[property].currency = article.currency;
      receiptsObj[property].shop_address = article.shop_address;
      receiptsObj[property].receipt_date = article.receipt_date;
      receiptsObj[property].articles = [];
      receiptsObj[property].categories = {};
    }

    receiptsObj[property].articles.push(article);
  });

  // Loops through each article in each receipt and updates mostSpentCategory in that receipt
  // for (const keyr in receiptsObj) {
  //   if (Object.hasOwnProperty.call(receiptsObj, keyr)) {
  //     receiptsObj[keyr].mostSpentCategory = { catName: "", catValue: -1 };
  //     receiptsObj[keyr].articles.forEach((article: any) => {
  //       if (!receiptsObj[keyr].categories[article.cat_name]) {
  //         receiptsObj[keyr].categories[article.cat_name] = article.articlePrice;
  //       } else {
  //         receiptsObj[keyr].categories[article.cat_name] +=
  //           article.articlePrice;
  //       }
  //     });

  //     const categories = receiptsObj[keyr].categories;
  //     for (const key in categories) {
  //       if (Object.hasOwnProperty.call(categories, key)) {
  //         if (categories[key] > receiptsObj[keyr].mostSpentCategory.catValue) {
  //           receiptsObj[keyr].mostSpentCategory.catName = key;
  //           receiptsObj[keyr].mostSpentCategory.catValue = categories[key];
  //         }
  //       }
  //     }
  //     delete receiptsObj[keyr].categories;
  //     delete receiptsObj[keyr].articles;
  //   }
  // }
  const receipts: Array<any> = [];

  for (const key in receiptsObj) {
    if (Object.hasOwnProperty.call(receiptsObj, key)) {
      receipts.push(receiptsObj[key]);
    }
  }

  receipts.sort((a, b) => {
    return (
      (new Date(b.receipt_date) as any) - (new Date(a.receipt_date) as any)
    );
  });
  return receipts;
}

export type APIErrorResponse = AxiosError<{
  message: string;
  error: string;
}>;

export function getResponseErrorMessage(error: unknown) {
  const axiosErrorMessage = (error as APIErrorResponse).response?.data;
  if (axiosErrorMessage) return axiosErrorMessage;
  return (error as any).message;
}
