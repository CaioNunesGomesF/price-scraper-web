import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 35000,
  headers: { "Content-Type": "application/json" },
});

export interface ListingItem {
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

export const searchApi = {
  search: (params: SearchParams) =>
    api.get<SearchResponse>("/search", { params }).then((r) => r.data),

  getTopSearches: (limit = 10) =>
    api.get<TopSearchesResponse>("/search/analytics/top", { params: { limit } }).then((r) => r.data),

  getCategories: () =>
    api.get<CategoriesResponse>("/search/analytics/categories").then((r) => r.data),
};
