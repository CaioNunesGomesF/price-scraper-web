import React, { useState } from "react";
import { Sparkles, BarChart3, Heart, Store, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { UserProfile } from "../../auth/components/AuthModal";

interface HeaderProps {
  activeTab: "search" | "analytics" | "favorites" | "sources";
  favoritesCount: number;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onTabChange: (tab: "search" | "analytics" | "favorites" | "sources") => void;
  onNewSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  favoritesCount,
  user,
  onOpenAuth,
  onLogout,
  onTabChange,
  onNewSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={styles.topbar} className="topbar-glow">
      <div style={styles.brand} onClick={onNewSearch} title="Voltar para a tela inicial">
        <h1 style={styles.brandTitle}>
          PriceScraper
          <span style={styles.brandBadge}>
            <Sparkles size={10} style={{ marginRight: "4px" }} />
            Agregador de Ofertas
          </span>
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Sources Tab Button */}
        <button
          onClick={() => onTabChange("sources")}
          style={{
            ...styles.navTabBtn,
            backgroundColor: activeTab === "sources" ? "rgba(90, 122, 106, 0.15)" : "var(--bg-primary)",
            color: activeTab === "sources" ? "var(--accent)" : "var(--text-primary)",
            border: activeTab === "sources" ? "1px solid rgba(90, 122, 106, 0.4)" : "1px solid var(--border)",
          }}
          title="Ver lojas e plataformas integradas"
        >
          <Store size={13} />
          <span>Fontes</span>
        </button>

        {/* Favorites Tab Button */}
        <button
          onClick={() => onTabChange("favorites")}
          style={{
            ...styles.navTabBtn,
            backgroundColor: activeTab === "favorites" ? "rgba(231, 76, 60, 0.15)" : "var(--bg-primary)",
            color: activeTab === "favorites" ? "#e74c3c" : "var(--text-primary)",
            border: activeTab === "favorites" ? "1px solid rgba(231, 76, 60, 0.4)" : "1px solid var(--border)",
          }}
          title="Ver produtos favoritos salvos"
        >
          <Heart
            size={13}
            color={activeTab === "favorites" ? "#e74c3c" : "var(--text-secondary)"}
            fill={activeTab === "favorites" ? "#e74c3c" : "none"}
          />
          <span>Favoritos</span>
          {favoritesCount > 0 && (
            <span style={styles.countBadge}>{favoritesCount}</span>
          )}
        </button>

        {/* Analytics Tab Button */}
        <button
          onClick={() => onTabChange(activeTab === "analytics" ? "search" : "analytics")}
          style={{
            ...styles.navTabBtn,
            backgroundColor: activeTab === "analytics" ? "var(--accent)" : "var(--bg-primary)",
            color: activeTab === "analytics" ? "#ffffff" : "var(--text-primary)",
            border: activeTab === "analytics" ? "1px solid var(--accent)" : "1px solid var(--border)",
          }}
          title={activeTab === "analytics" ? "Voltar para a Busca" : "Abrir Dashboard Analytics"}
        >
          <BarChart3 size={13} />
          <span>{activeTab === "analytics" ? "Voltar para Busca" : "Analytics"}</span>
        </button>

        {/* User Account / Login Button */}
        {user ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.userPillBtn}
              title={`Conectado como ${user.name}`}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} style={styles.userAvatar} />
              ) : (
                <div style={styles.userAvatarFallback}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={styles.userName}>{user.name.split(" ")[0]}</span>
              <ChevronDown size={12} color="var(--text-secondary)" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div style={styles.dropdownMenu} className="modal-content-pop">
                <div style={styles.userMenuHeader}>
                  <strong style={{ fontSize: "12px", color: "var(--text-primary)" }}>{user.name}</strong>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{user.email}</span>
                </div>
                <div style={styles.menuDivider} />
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onTabChange("favorites");
                  }}
                  style={styles.menuItem}
                >
                  <Heart size={13} color="#e74c3c" />
                  <span>Meus Favoritos ({favoritesCount})</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onTabChange("sources");
                  }}
                  style={styles.menuItem}
                >
                  <Store size={13} color="var(--accent)" />
                  <span>Fontes Indexadas</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout();
                  }}
                  style={{ ...styles.menuItem, color: "#e74c3c" }}
                >
                  <LogOut size={13} />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            style={styles.loginBtn}
            className="new-search-btn-premium"
            title="Entrar ou criar conta"
          >
            <UserIcon size={13} />
            <span>Entrar</span>
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  topbar: {
    height: "62px",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    backgroundColor: "var(--bg-secondary)",
    flexShrink: 0,
    position: "relative",
    zIndex: 10,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
  brandTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  brandBadge: {
    fontSize: "10px",
    fontWeight: 600,
    backgroundColor: "rgba(90, 122, 106, 0.15)",
    color: "var(--accent)",
    padding: "2px 8px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
  },
  navTabBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "20px",
    padding: "7px 14px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "var(--transition)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
  },
  countBadge: {
    backgroundColor: "#e74c3c",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: 800,
    padding: "1px 6px",
    borderRadius: "10px",
    marginLeft: "2px",
  },
  loginBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "var(--accent)",
    color: "#ffffff",
    border: "none",
    borderRadius: "20px",
    padding: "7px 16px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "var(--transition)",
  },
  userPillBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    padding: "4px 10px 4px 5px",
    fontSize: "12px",
    fontWeight: 700,
    color: "var(--text-primary)",
    cursor: "pointer",
  },
  userAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    objectFit: "cover" as const,
  },
  userAvatarFallback: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "var(--accent)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: "12px",
  },
  dropdownMenu: {
    position: "absolute" as const,
    top: "calc(100% + 8px)",
    right: 0,
    backgroundColor: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "8px",
    minWidth: "180px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
    zIndex: 50,
  },
  userMenuHeader: {
    padding: "6px 10px",
    display: "flex",
    flexDirection: "column" as const,
  },
  menuDivider: {
    height: "1px",
    backgroundColor: "var(--border)",
    margin: "6px 0",
  },
  menuItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 10px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-primary)",
    cursor: "pointer",
    textAlign: "left" as const,
  },
};
