export type SallingDiscounts = {
    offer: {
        currency: string;
        discount: number;
        ean: string;
        endTime: string;
        lastUpdate: string;
        newPrice: number;
        originalPrice: number;
        percentDiscount: number;
        startTime: string;
        stock: number;
        stockUnit: string;
    };
    product: {
        categories: {
            da: string;
            en: string;
        };
        description: string;
        ean: string;
        image: string;
    };
};