import axios from "axios";
import { getMockSearchResults } from "../mocks/mockListings";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000, // Short timeout for auto-fallback to mock
  headers: { "Content-Type": "application/json" },
});

export interface ListingItem {
  id?: string;
  platform: "MERCADO_LIVRE" | "OLX" | "GGMAX" | "AMAZON" | "OUTROS";
  externalId?: string;
  title: string;
  price: number;
  currency: string;
  url: string;
  imageUrl?: string;
  rating?: number;
  reviewsCount?: number;
  sellerName?: string;
  sellerReputation?: string;
  location?: string;
  condition?: string;
}

export interface SearchResponse {
  status: string;
  query: string;
  category: string;
  fromCache: boolean;
  expiresAt: string;
  total: number;
  results: ListingItem[];
}

export interface TopSearch {
  query: string;
  category: string;
  searchCount: number;
  lastClientIp?: string;
  lastOrigin?: string;
  lastSearchedAt: string;
}

export interface TopSearchesResponse {
  status: string;
  total: number;
  data: TopSearch[];
}

export interface CategoriesResponse {
  status: string;
  data: Record<string, number>;
}

export type Category = "IMOVEIS" | "VEICULOS" | "JOGOS" | "ELETRONICOS" | "OUTROS";
export type Platform = "MERCADO_LIVRE" | "OLX" | "GGMAX" | "AMAZON" | "ALL";
export type SortBy = "price_asc" | "price_desc" | "rating_desc" | "recent";

export interface SearchParams {
  q: string;
  category?: Category;
  platform?: Platform;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: SortBy;
  limit?: number;
}

// Configuração para ativar ou desativar o modo Mock explicitamente se desejado
export const MOCK_MODE = true;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchApi = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    if (MOCK_MODE) {
      await delay(700); // Simular latência de busca em tempo real
      return getMockSearchResults(params);
    }

    try {
      const response = await api.get<SearchResponse>("/search", { params });
      return response.data;
    } catch (error) {
      console.warn("Backend offline or unreachable, falling back to mock data.", error);
      await delay(600);
      return getMockSearchResults(params);
    }
  },

  getTopSearches: async (limit = 10): Promise<TopSearchesResponse> => {
    if (MOCK_MODE) {
      await delay(400);
      return {
        status: "success",
        total: 3,
        data: [
          { query: "iPhone 13", category: "ELETRONICOS", searchCount: 142, lastSearchedAt: new Date().toISOString() },
          { query: "Conta Valorant", category: "JOGOS", searchCount: 98, lastSearchedAt: new Date().toISOString() },
          { query: "Honda Civic", category: "VEICULOS", searchCount: 65, lastSearchedAt: new Date().toISOString() },
        ],
      };
    }

    try {
      const res = await api.get<TopSearchesResponse>("/search/analytics/top", { params: { limit } });
      return res.data;
    } catch {
      return {
        status: "success",
        total: 3,
        data: [
          { query: "iPhone 13", category: "ELETRONICOS", searchCount: 142, lastSearchedAt: new Date().toISOString() },
          { query: "Conta Valorant", category: "JOGOS", searchCount: 98, lastSearchedAt: new Date().toISOString() },
        ],
      };
    }
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    if (MOCK_MODE) {
      await delay(300);
      return {
        status: "success",
        data: { ELETRONICOS: 45, JOGOS: 30, VEICULOS: 15, IMOVEIS: 10, OUTROS: 20 },
      };
    }

    try {
      const res = await api.get<CategoriesResponse>("/search/analytics/categories");
      return res.data;
    } catch {
      return {
        status: "success",
        data: { ELETRONICOS: 45, JOGOS: 30, VEICULOS: 15, IMOVEIS: 10, OUTROS: 20 },
      };
    }
  },
};
