export async function fetchDiscounts(foodWasteStoreId: string) {
    const response = await fetch(`http://localhost:3001/api/discounts/${foodWasteStoreId}`);
    return response.json();
}
