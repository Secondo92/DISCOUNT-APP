import { type SallingStore } from "../types/SallingStore";

export async function fetchStores(): Promise<SallingStore[]> {
    const response = await fetch(`https://discount-app-zl07.onrender.com/api/stores`);
    const data = await response.json();
    return data as SallingStore[];
}