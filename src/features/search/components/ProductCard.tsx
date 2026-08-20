import React from "react";
import { type ListingItem } from "../../../services/searchApi";
import { Star, MapPin, ExternalLink } from "lucide-react";

interface ProductCardProps {
  item: ListingItem;
}

const getPlatformStyle = (p: string) => {
  switch (p) {
    case "MERCADO_LIVRE":
      return { color: "var(--ml-color)", name: "Mercado Livre", bg: "rgba(255, 216, 0, 0.12)" };
    case "OLX":
      return { color: "var(--olx-color)", name: "OLX", bg: "rgba(140, 82, 255, 0.12)" };
    case "AMAZON":
      return { color: "var(--amazon-color)", name: "Amazon", bg: "rgba(255, 153, 0, 0.12)" };
    case "GGMAX":
      return { color: "var(--ggmax-color)", name: "GGMax", bg: "rgba(0, 206, 201, 0.12)" };
    default:
      return { color: "var(--text-secondary)", name: "Outro", bg: "var(--bg-input)" };
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const si = getPlatformStyle(item.platform);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.productCard}
      className="product-card-hover"
    >
      <div style={styles.imageWrapper}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} style={styles.productImage} loading="lazy" />
        ) : (
          <div style={styles.noImage}>Sem Foto</div>
        )}
        <div style={{ ...styles.platformTag, backgroundColor: si.bg, color: si.color }}>
          {item.platform === "MERCADO_LIVRE" && (
            <img src="/platforms/mercadoLivre.png" alt="Mercado Livre Logo" style={{ width: "12px", height: "12px", borderRadius: "2px" }} />
          )}
          {item.platform === "OLX" && (
            <img src="/platforms/olx.png" alt="OLX Logo" style={{ width: "12px", height: "12px", borderRadius: "2px" }} />
          )}
          {item.platform === "AMAZON" && (
            <img src="/platforms/amazon.png" alt="Amazon Logo" style={{ width: "12px", height: "12px", borderRadius: "2px" }} />
          )}
          {item.platform === "GGMAX" && (
            <img src="/platforms/ggmax.png" alt="GGMax Logo" style={{ width: "12px", height: "12px", borderRadius: "2px" }} />
          )}
          <span>{si.name}</span>
        </div>
        {item.condition && (
          <div style={styles.conditionTag}>
            {item.condition}
          </div>
        )}
      </div>

      <div style={styles.productInfo}>
        <h3 style={styles.productTitle} title={item.title}>
          {item.title}
        </h3>

        <div style={styles.priceRow}>
          <span style={styles.currencySymbol}>R$</span>
          <span style={styles.priceValue}>
            {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {item.rating !== undefined && (
          <div style={styles.ratingRow}>
            <Star size={13} fill="var(--warning)" color="var(--warning)" />
            <span style={styles.ratingVal}>{item.rating.toFixed(1)}</span>
            {item.reviewsCount && (
              <span style={styles.reviewsCount}>({item.reviewsCount})</span>
            )}
          </div>
        )}

        {item.sellerName && (
          <div style={styles.sellerName} title={item.sellerName}>
            {item.sellerName}
          </div>
        )}

        {item.location && (
          <div style={styles.locationRow}>
            <MapPin size={11} />
            <span style={styles.locationText}>{item.location}</span>
          </div>
        )}

        <div style={styles.goBtn}>
          <span>Ver Oferta</span>
          <ExternalLink size={13} />
        </div>
      </div>
    </a>
  );
};

const styles: Record<string, React.CSSProperties> = {
  productCard: {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    transition: "var(--transition)",
    height: "100%",
  },
  imageWrapper: { position: "relative" as const, width: "100%", paddingBottom: "90%", backgroundColor: "#08080f" },
  productImage: { position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" as const, padding: "8px" },
  noImage: { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "var(--text-muted)", fontSize: "11px" },
  platformTag: { position: "absolute" as const, top: "8px", left: "8px", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "4px" },
  conditionTag: { position: "absolute" as const, bottom: "8px", right: "8px", backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px", padding: "1px 6px", borderRadius: "4px" },
  productInfo: { padding: "12px", display: "flex", flexDirection: "column" as const, flex: 1, gap: "4px" },
  productTitle: { fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, marginBottom: "4px", lineHeight: "1.4" },
  priceRow: { display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "2px" },
  currencySymbol: { fontSize: "11px", color: "var(--accent-light)", fontWeight: 700 },
  priceValue: { fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" },
  ratingRow: { display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" },
  ratingVal: { fontSize: "12px", fontWeight: 700, color: "var(--warning)" },
  reviewsCount: { fontSize: "11px", color: "var(--text-secondary)" },
  sellerName: { fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const },
  locationRow: { display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)", fontSize: "11px" },
  locationText: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const },
  goBtn: { marginTop: "auto", backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)", padding: "6px 12px", borderRadius: "var(--radius-sm)", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", transition: "var(--transition)" },
};
export default ProductCard;
