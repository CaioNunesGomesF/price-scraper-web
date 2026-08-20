import React, { useState, useEffect, useRef } from "react";
import {
  searchApi,
  type ListingItem,
  type Category,
  type Platform,
  type SortBy,
} from "./services/searchApi";
import {
  Search,
  Layers,
  ShoppingBag,
  Info,
  X,
  CheckCircle2,
} from "lucide-react";
import { WelcomeHero } from "./features/search/components/WelcomeHero.js";
import { ListingGrid } from "./features/search/components/ListingGrid.js";
import { FilterStrip } from "./features/search/components/FilterStrip.js";

interface ChatMessage {
  id: string;
  sender: "user" | "system";
  text: string;
  timestamp: Date;
  isSearching?: boolean;
  results?: ListingItem[];
  meta?: {
    fromCache: boolean;
    total: number;
    category: string;
    query: string;
  };
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "system",
      text: "",
      timestamp: new Date(),
    },
  ]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("OUTROS");
  const [platform, setPlatform] = useState<Platform>("ALL");
  const [sortBy, setSortBy] = useState<SortBy>("price_asc");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 220); // matching CSS fade-out animation length
  };

  const handleNewSearch = () => {
    setMessages([
      {
        id: "welcome",
        sender: "system",
        text: "",
        timestamp: new Date(),
      },
    ]);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query.trim();
    const userMsgId = Math.random().toString();
    const systemMsgId = Math.random().toString();

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: "user",
        text: currentQuery,
        timestamp: new Date(),
      },
      {
        id: systemMsgId,
        sender: "system",
        text: `Consultando as fontes e processando dados para "${currentQuery}"...`,
        timestamp: new Date(),
        isSearching: true,
      },
    ]);

    setQuery("");

    try {
      const res = await searchApi.search({
        q: currentQuery,
        category,
        platform,
        sortBy,
        minPrice: minPrice === "" ? undefined : minPrice,
        maxPrice: maxPrice === "" ? undefined : maxPrice,
      });

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === systemMsgId) {
            return {
              ...msg,
              isSearching: false,
              text: `Busca finalizada! Encontrei ${res.total} anúncios. Veja abaixo a listagem de ofertas:`,
              results: res.results || [],
              meta: {
                fromCache: res.fromCache,
                total: res.total,
                category: res.category,
                query: currentQuery,
              },
            };
          }
          return msg;
        })
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === systemMsgId) {
            return {
              ...msg,
              isSearching: false,
              text: `Não foi possível obter os dados. Certifique-se de que o backend está ativo na porta 3000. Detalhes: ${err.message}`,
            };
          }
          return msg;
        })
      );
    }
  };

  const isWelcomeState = messages.length === 1;

  const renderSearchForm = () => (
    <form onSubmit={handleSearch} style={styles.searchForm}>
      <FilterStrip
        category={category}
        setCategory={setCategory}
        platform={platform}
        setPlatform={setPlatform}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Pesquise produtos em tempo real (ex: iPhone 13, notebook, conta valorant...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.mainInput}
        />
        <button type="submit" style={styles.sendBtn}>
          <Search size={18} color="#fff" />
        </button>
      </div>
    </form>
  );

  return (
    <div style={styles.appContainer}>
      {/* Global Background Pastel Blobs */}
      <div className="global-blob blob-1" />
      <div className="global-blob blob-2" />
      <div className="global-blob blob-3" />
      <div className="global-grid-bg" />

      <div style={styles.chatArea}>
        {/* Topbar */}
        <div style={styles.topbar} className="topbar-glow">
          <div style={styles.brand}>
            <h1 style={styles.brandTitle}>
              PriceScraper
              <span style={styles.brandBadge}>Real-Time Agent</span>
            </h1>
          </div>
          {!isWelcomeState && (
            <button
              onClick={handleNewSearch}
              style={styles.newSearchBtn}
              className="new-search-btn-premium"
            >
              <Search size={13} style={{ marginRight: "6px" }} />
              Nova Busca
            </button>
          )}
        </div>

        {/* Mensagens e Fluxo de Conversa */}
        <div style={{
          ...styles.messagesContainer,
          ...(isWelcomeState ? { display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "12vh" } : {})
        }}>
          <div style={{
            ...styles.messagesInner,
            ...(isWelcomeState ? { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", flex: 1, gap: "32px" } : {})
          }}>
            {isWelcomeState ? (
              <>
                <WelcomeHero />
                <div className="hero-cta-input-wrapper" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "660px", filter: "drop-shadow(0 0 24px rgba(108,92,231,0.15))" }}>
                  {renderSearchForm()}
                </div>
                
                {/* Circular overlapping stacked logos + "+" indicator */}
                <div style={{ ...styles.platformLogoWrapper, marginTop: "64px" }} onClick={() => setIsModalOpen(true)}>
                  <span style={styles.platformLogoText}>Buscando em:</span>
                  <div style={styles.platformLogoStack}>
                    <span className="platform-stack-item-wrapper">
                      <img src="/platforms/mercadoLivre.png" alt="Mercado Livre" className="platform-stack-item" style={{ ...styles.platformCircle, backgroundColor: "#ffd800", zIndex: 3 }} title="Mercado Livre" />
                    </span>
                    <span className="platform-stack-item-wrapper">
                      <img src="/platforms/olx.png" alt="OLX" className="platform-stack-item" style={{ ...styles.platformCircle, backgroundColor: "#8c52ff", zIndex: 2 }} title="OLX" />
                    </span>
                    <span className="platform-stack-item-wrapper">
                      <img src="/platforms/amazon.png" alt="Amazon" className="platform-stack-item" style={{ ...styles.platformCircle, backgroundColor: "#ff9900", zIndex: 1 }} title="Amazon" />
                    </span>
                    <span className="platform-stack-item-wrapper">
                      <div className="platform-stack-item" style={{ ...styles.platformCircle, backgroundColor: "#141424", border: "1px solid var(--border)", color: "#00cec9" }} title="GGMax e outros">+</div>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              messages.slice(1).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.messageWrapper,
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.sender === "system" && (
                    <div style={styles.avatar}>
                      <Search size={14} color="var(--accent-light)" />
                    </div>
                  )}

                  <div style={{
                    ...styles.messageBubbleContainer,
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}>
                    <div
                      style={{
                        ...styles.messageBubble,
                        background: msg.sender === "user" ? "var(--bg-bubble-user)" : "var(--bg-bubble-ai)",
                        border: msg.sender === "user" ? "none" : "1px solid var(--border)",
                        color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                        borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "var(--radius-lg)",
                      }}
                    >
                      <div style={styles.messageText}>{msg.text}</div>

                      {msg.isSearching && (
                        <div style={styles.loadingDots}>
                          <span style={styles.dot}></span>
                          <span style={{ ...styles.dot, animationDelay: "0.2s" }}></span>
                          <span style={{ ...styles.dot, animationDelay: "0.4s" }}></span>
                        </div>
                      )}

                      {msg.meta && (
                        <div style={styles.searchMetaCard}>
                          <div style={styles.metaBadge}>
                            <Layers size={11} />
                            <span>Cat: {msg.meta.category}</span>
                          </div>
                          <div style={styles.metaBadge}>
                            <Info size={11} />
                            <span>{msg.meta.fromCache ? "Cache (30m)" : "Busca Direta"}</span>
                          </div>
                          <div style={styles.metaBadge}>
                            <ShoppingBag size={11} />
                            <span>{msg.meta.total} itens</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Grid de Ofertas Modular */}
                    {msg.results && msg.results.length > 0 && (
                      <ListingGrid results={msg.results} />
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

      </div>

      {/* Modal - Sites integrados */}
      {isModalOpen && (
        <div style={styles.modalOverlay} className={isClosing ? "modal-overlay-fadeout" : "modal-overlay-fade"} onClick={handleCloseModal}>
          <div style={styles.modalContent} className={isClosing ? "modal-content-popout" : "modal-content-pop"} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Fontes de Busca Integradas</h3>
              </div>
              <button style={styles.closeBtn} onClick={handleCloseModal}>
                <X size={16} color="var(--text-secondary)" />
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                PriceScraper realiza consultas paralelas simultâneas e diretas nestas plataformas em tempo real:
              </p>
              
              <div style={styles.sourceList}>
                {/* Mercado Livre */}
                <div style={styles.sourceItem}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/platforms/mercadoLivre.png" alt="Mercado Livre" style={styles.sourceLogo} />
                    <div>
                      <h4 style={styles.sourceName}>Mercado Livre</h4>
                      <a href="https://www.mercadolivre.com.br" target="_blank" rel="noopener noreferrer" style={{ ...styles.sourceUrl, textDecoration: "underline" }}>
                        mercadolivre.com.br
                      </a>
                    </div>
                  </div>
                  <span style={styles.statusPill}>
                    <CheckCircle2 size={11} color="var(--success)" />
                    Ativo
                  </span>
                </div>

                {/* OLX */}
                <div style={styles.sourceItem}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/platforms/olx.png" alt="OLX" style={styles.sourceLogo} />
                    <div>
                      <h4 style={styles.sourceName}>OLX Brasil</h4>
                      <a href="https://www.olx.com.br" target="_blank" rel="noopener noreferrer" style={{ ...styles.sourceUrl, textDecoration: "underline" }}>
                        olx.com.br
                      </a>
                    </div>
                  </div>
                  <span style={styles.statusPill}>
                    <CheckCircle2 size={11} color="var(--success)" />
                    Ativo
                  </span>
                </div>

                {/* GGMax */}
                <div style={styles.sourceItem}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/platforms/ggmax.png" alt="GGMax" style={{ ...styles.sourceLogo, padding: "2px", backgroundColor: "#0a0a10" }} />
                    <div>
                      <h4 style={styles.sourceName}>GGMax</h4>
                      <a href="https://ggmax.com.br" target="_blank" rel="noopener noreferrer" style={{ ...styles.sourceUrl, textDecoration: "underline" }}>
                        ggmax.com.br
                      </a>
                    </div>
                  </div>
                  <span style={styles.statusPill}>
                    <CheckCircle2 size={11} color="var(--success)" />
                    Ativo
                  </span>
                </div>

                {/* Amazon */}
                <div style={styles.sourceItem}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/platforms/amazon.png" alt="Amazon" style={styles.sourceLogo} />
                    <div>
                      <h4 style={styles.sourceName}>Amazon Brasil</h4>
                      <a href="https://www.amazon.com.br" target="_blank" rel="noopener noreferrer" style={{ ...styles.sourceUrl, textDecoration: "underline" }}>
                        amazon.com.br
                      </a>
                    </div>
                  </div>
                  <span style={styles.statusPill}>
                    <CheckCircle2 size={11} color="var(--success)" />
                    Ativo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "var(--bg-primary)",
    position: "relative",
  },
  chatArea: { flex: 1, display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden" },
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
  brand: { display: "flex", alignItems: "center", gap: "10px" },
  brandTitle: { fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" },
  brandBadge: { fontSize: "10px", fontWeight: 600, backgroundColor: "rgba(90,122,106,0.15)", color: "var(--accent)", padding: "2px 8px", borderRadius: "20px" },
  newSearchBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--btn-gray)",
    color: "#ffffff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "var(--transition)",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "28px 20px",
    display: "flex",
    justifyContent: "center",
  },
  messagesInner: {
    width: "100%",
    maxWidth: "820px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  messageWrapper: { display: "flex", gap: "14px", width: "100%", animation: "fadeInUp 0.3s ease-out" },
  avatar: { width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "rgba(108,92,231,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", flexShrink: 0, marginTop: "2px" },
  messageBubbleContainer: { display: "flex", flexDirection: "column" as const, gap: "14px", flex: 1, minWidth: 0 },
  messageBubble: { padding: "14px 18px", borderRadius: "var(--radius-lg)", fontSize: "14px", lineHeight: "1.6", color: "var(--text-primary)", maxWidth: "100%" },
  messageText: { whiteSpace: "pre-wrap" as const },
  loadingDots: { display: "flex", gap: "5px", marginTop: "8px" },
  dot: { width: "6px", height: "6px", backgroundColor: "var(--accent-light)", borderRadius: "50%", animation: "typingBounce 1.4s infinite ease-in-out", display: "inline-block" },
  searchMetaCard: { marginTop: "10px", display: "flex", flexWrap: "wrap" as const, gap: "6px", paddingTop: "10px", borderTop: "1px solid var(--border)" },
  metaBadge: { display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", backgroundColor: "var(--bg-primary)", padding: "3px 9px", borderRadius: "20px", color: "var(--text-secondary)", border: "1px solid var(--border)" },
  controlsArea: {
    padding: "14px 20px 20px",
    borderTop: "1px solid var(--border)",
    backgroundColor: "var(--bg-secondary)",
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
  },
  searchForm: { width: "100%", maxWidth: "820px", display: "flex", flexDirection: "column" as const, gap: "10px", alignSelf: "stretch" },
  inputContainer: { display: "flex", width: "100%", backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "4px 6px 4px 18px", alignItems: "center", outline: "none" },
  mainInput: { flex: 1, backgroundColor: "transparent", border: "none", outline: "none", boxShadow: "none", color: "var(--text-primary)", fontSize: "14px", height: "44px" },
  sendBtn: { width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--btn-gray)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--transition)" },
  platformLogoWrapper: { display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", animation: "fadeInUp 0.6s ease-out", cursor: "pointer" },
  platformLogoText: { fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 },
  platformLogoStack: { display: "flex", alignItems: "center" },
  platformCircle: { width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, marginLeft: "-8px", border: "2.5px solid var(--bg-primary)", userSelect: "none" },
  
  // Modal styles
  modalOverlay: { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modalContent: { backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "420px", padding: "20px", display: "flex", flexDirection: "column" as const, gap: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  closeBtn: { background: "none", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px", borderRadius: "50%", border: "1px solid transparent", transition: "var(--transition)" },
  modalBody: { display: "flex", flexDirection: "column" as const },
  sourceList: { display: "flex", flexDirection: "column" as const, gap: "12px" },
  sourceItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" },
  sourceLogo: { width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" as const },
  sourceLogoPlaceholder: { width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 800 },
  sourceName: { fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" },
  sourceUrl: { fontSize: "11px", color: "var(--text-secondary)" },
  statusPill: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--success)", backgroundColor: "rgba(0,184,148,0.1)", padding: "2px 8px", borderRadius: "100px", fontWeight: 600 },
};
