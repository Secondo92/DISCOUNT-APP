import { type SallingStore } from "../types/SallingStore";

export async function fetchStores(): Promise<SallingStore[]> {
    const response = await fetch(`http://localhost:3001/api/stores`);
    const data = await response.json();
    return data as SallingStore[];
}