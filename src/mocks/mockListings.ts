import { ListingItem, SearchParams, SearchResponse } from "../services/searchApi";

export const MOCK_LISTINGS: ListingItem[] = [
  // ELETRÔNICOS
  {
    platform: "MERCADO_LIVRE",
    externalId: "ml-001",
    title: "iPhone 13 Apple 128GB Meia-Noite Tela 6,1\" 12MP Câmera Dupla",
    price: 3499.00,
    currency: "BRL",
    url: "https://www.mercadolivre.com.br",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80",
    rating: 4.8,
    reviewsCount: 1420,
    sellerName: "Apple Official Store",
    sellerReputation: "LOJA_OFICIAL",
    location: "São Paulo, SP",
    condition: "Novo",
  },
  {
    platform: "AMAZON",
    externalId: "amz-002",
    title: "Apple iPhone 13 128GB Estelar",
    price: 3390.00,
    currency: "BRL",
    url: "https://www.amazon.com.br",
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80",
    rating: 4.9,
    reviewsCount: 890,
    sellerName: "Amazon.com.br",
    sellerReputation: "VENDEDOR_VERIFICADO",
    location: "Barueri, SP",
    condition: "Novo",
  },
  {
    platform: "OLX",
    externalId: "olx-003",
    title: "iPhone 13 128GB Bateria 89% Com Caixa e Carregador Original",
    price: 2750.00,
    currency: "BRL",
    url: "https://www.olx.com.br",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80",
    rating: 4.6,
    reviewsCount: 28,
    sellerName: "Carlos Eduardo",
    sellerReputation: "BOM",
    location: "Campinas, SP",
    condition: "Usado",
  },

  // RELÓGIOS / SMARTWATCHES
  {
    platform: "AMAZON",
    externalId: "amz-010",
    title: "Relógio Smartwatch Amazfit Bip 5 Tela 1.91\" GPS Integrado Bluetooth",
    price: 389.90,
    currency: "BRL",
    url: "https://www.amazon.com.br",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.7,
    reviewsCount: 650,
    sellerName: "Amazfit Official",
    sellerReputation: "LOJA_OFICIAL",
    location: "São Paulo, SP",
    condition: "Novo",
  },
  {
    platform: "MERCADO_LIVRE",
    externalId: "ml-011",
    title: "Relógio Digital Casio Vintage Prata A158WA Resiste à Água",
    price: 189.00,
    currency: "BRL",
    url: "https://www.mercadolivre.com.br",
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
    rating: 4.9,
    reviewsCount: 2100,
    sellerName: "Relógios Brasil",
    sellerReputation: "LOJA_OFICIAL",
    location: "São Paulo, SP",
    condition: "Novo",
  },
  {
    platform: "OLX",
    externalId: "olx-012",
    title: "Relógio Apple Watch Series 8 45mm GPS Alumínio Meia-Noite Na Caixa",
    price: 2190.00,
    currency: "BRL",
    url: "https://www.olx.com.br",
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    rating: 4.8,
    reviewsCount: 34,
    sellerName: "Matheus Tech",
    sellerReputation: "BOM",
    location: "Belo Horizonte, MG",
    condition: "Seminovo",
  },

  // ROBLOX / GAMES
  {
    platform: "GGMAX",
    externalId: "gg-301",
    title: "Conta Roblox com Korblox + Headless + 15.000 Robux + Dominus Fake",
    price: 499.00,
    currency: "BRL",
    url: "https://ggmax.com.br",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    rating: 5.0,
    reviewsCount: 230,
    sellerName: "RobloxKing",
    sellerReputation: "100%_AVALIACOES_POSITIVAS",
    location: "Online",
    condition: "Conta Digital",
  },
  {
    platform: "GGMAX",
    externalId: "gg-302",
    title: "Gift Card Roblox 4.500 Robux - Envio Imediato Automático 24h",
    price: 199.90,
    currency: "BRL",
    url: "https://ggmax.com.br",
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80",
    rating: 4.9,
    reviewsCount: 1450,
    sellerName: "DigitalCards24h",
    sellerReputation: "VENDEDOR_VERIFICADO",
    location: "Online",
    condition: "Código Digital",
  },
  {
    platform: "MERCADO_LIVRE",
    externalId: "ml-303",
    title: "Cartão de Presente Roblox 10.000 Robux Código Digital",
    price: 439.00,
    currency: "BRL",
    url: "https://www.mercadolivre.com.br",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
    rating: 4.8,
    reviewsCount: 310,
    sellerName: "Games Express",
    sellerReputation: "LOJA_OFICIAL",
    location: "São Paulo, SP",
    condition: "Novo",
  },

  // JOGOS / CONTAS OUTROS
  {
    platform: "GGMAX",
    externalId: "gg-101",
    title: "Conta Valorant Vandal Prime + Karambit Saqueadora + Rank Imortal 1",
    price: 350.00,
    currency: "BRL",
    url: "https://ggmax.com.br",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
    rating: 5.0,
    reviewsCount: 142,
    sellerName: "ProGamerStore",
    sellerReputation: "100%_AVALIACOES_POSITIVAS",
    location: "Online",
    condition: "Conta Digital",
  },
  {
    platform: "GGMAX",
    externalId: "gg-102",
    title: "Conta League of Legends 240+ Skins + Todos os Campeões + MMR Diamante",
    price: 280.00,
    currency: "BRL",
    url: "https://ggmax.com.br",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",
    rating: 4.9,
    reviewsCount: 88,
    sellerName: "MythicAccounts",
    sellerReputation: "VERIFICADO",
    location: "Online",
    condition: "Conta Digital",
  },

  // VEÍCULOS
  {
    platform: "OLX",
    externalId: "olx-201",
    title: "Honda Civic 2.0 EXL Flex 4P Automático 2020/2021 Baixa Quilometragem",
    price: 108900.00,
    currency: "BRL",
    url: "https://www.olx.com.br",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&q=80",
    rating: 4.9,
    reviewsCount: 15,
    sellerName: "AutoMotors SP",
    sellerReputation: "LOJA_VERIFICADA",
    location: "São Paulo, SP",
    condition: "Usado",
  },
];

function generateDynamicQueryResults(query: string): ListingItem[] {
  const capQuery = query.charAt(0).toUpperCase() + query.slice(1);
  const platforms: Array<ListingItem["platform"]> = ["MERCADO_LIVRE", "AMAZON", "OLX", "GGMAX"];
  const imagePool = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const platform = platforms[i % platforms.length];
    const price = Math.round((Math.random() * 450 + 50) * 100) / 100;
    return {
      platform,
      externalId: `dyn-${i}`,
      title: `${capQuery} ${i % 2 === 0 ? "Edição Especial Premium" : "Original com Garantia"} - Modelo ${2024 - i}`,
      price,
      currency: "BRL",
      url: platform === "MERCADO_LIVRE" ? "https://www.mercadolivre.com.br" :
           platform === "AMAZON" ? "https://www.amazon.com.br" :
           platform === "OLX" ? "https://www.olx.com.br" : "https://ggmax.com.br",
      imageUrl: imagePool[i % imagePool.length],
      rating: +(4.5 + Math.random() * 0.5).toFixed(1),
      reviewsCount: Math.floor(Math.random() * 300) + 15,
      sellerName: `${capQuery} Official Store`,
      sellerReputation: "VENDEDOR_VERIFICADO",
      location: i % 2 === 0 ? "São Paulo, SP" : "Online",
      condition: i % 3 === 0 ? "Novo" : "Usado",
    };
  });
}

export function getMockSearchResults(params: SearchParams): SearchResponse {
  const { q, category, platform, minPrice, maxPrice, minRating, sortBy } = params;
  const searchLower = (q || "").toLowerCase().trim();

  let filtered = MOCK_LISTINGS.filter((item) => {
    // Platform filter
    if (platform && platform !== "ALL" && item.platform !== platform) {
      return false;
    }

    // Min / Max price
    if (minPrice !== undefined && item.price < minPrice) return false;
    if (maxPrice !== undefined && item.price > maxPrice) return false;

    // Min rating
    if (minRating !== undefined && (item.rating || 0) < minRating) return false;

    // Text search filter
    if (searchLower) {
      const matchTitle = item.title.toLowerCase().includes(searchLower);
      const matchSeller = item.sellerName?.toLowerCase().includes(searchLower) || false;
      const matchLocation = item.location?.toLowerCase().includes(searchLower) || false;
      if (!matchTitle && !matchSeller && !matchLocation) return false;
    }

    return true;
  });

  // If no hardcoded item matches the searched term, dynamically generate contextualized results for that query
  if (filtered.length === 0 && searchLower) {
    const generated = generateDynamicQueryResults(searchLower);
    filtered = generated.filter((item) => {
      if (platform && platform !== "ALL" && item.platform !== platform) return false;
      if (minPrice !== undefined && item.price < minPrice) return false;
      if (maxPrice !== undefined && item.price > maxPrice) return false;
      return true;
    });
  }

  // Sort results
  if (sortBy) {
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "recent":
      default:
        break;
    }
  }

  return {
    status: "success",
    query: q || "todas",
    category: category || "OUTROS",
    fromCache: Math.random() > 0.5,
    expiresAt: new Date(Date.now() + 1800000).toISOString(),
    total: filtered.length,
    results: filtered,
  };
}
