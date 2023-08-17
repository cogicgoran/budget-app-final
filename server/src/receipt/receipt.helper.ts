import { IReceipt } from 'src/interface';

export class ReceiptHelper {
  static createSummary(receipts: Array<IReceipt>) {
    let total = 0;
    let currency = 'RSD';
    const categoryTotals = new Map<string, number>();
    const categories = new Map<string, any>();

    receipts.forEach((receipt) => {
      if (receipt.currency.code !== 'RSD') return; // Only use receipts with RSD currency
      receipt.articles.forEach((article) => {
        total += article.unitPrice;
        const categoryTotal = categoryTotals.get(article.category.name);
        if (!categoryTotal) {
          categoryTotals.set(
            article.category.name,
            article.unitPrice * article.amount,
          );
          categories.set(article.category.name, article.category);
          return;
        }
        categoryTotals.set(
          article.category.name,
          categoryTotal + article.unitPrice * article.amount,
        );
      });
    });

    const perCategoryNameReport = Array.from(categoryTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const perCategoryReport = perCategoryNameReport.map((categoryData) => {
      return {
        category: categories.get(categoryData[0]),
        total: categoryData[1],
      };
    });

    return {
      total,
      currency,
      perCategory: perCategoryReport,
    };
  }
}
