export async function fetchDiscounts(foodWasteStoreId: string) {
    const response = await fetch(`https://discount-app-zl07.onrender.com/api/discounts/${foodWasteStoreId}`);
    return response.json();
}
