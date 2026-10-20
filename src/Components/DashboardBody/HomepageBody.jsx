import { useMemo, useState } from "react";
import "./HomepageBody.css";

const CATEGORIES = [
  { id: "notebooks", name: "Notebooks", icon: "laptop" },
  { id: "smartphones", name: "Smartphones", icon: "phone" },
  { id: "audio", name: "Áudio", icon: "headphones" },
  { id: "monitores", name: "Monitores", icon: "monitor" },
  { id: "perifericos", name: "Periféricos", icon: "mouse" },
  { id: "wearables", name: "Wearables", icon: "watch" },
];

const PRODUCTS = [
  { id: 1, name: "Notebook Pro 14\"", category: "notebooks", price: 5499.9, oldPrice: 6299.9, rating: 4.8, reviews: 214, image: "" },
  { id: 2, name: "Smartphone X12 128GB", category: "smartphones", price: 2899.0, oldPrice: 3299.0, rating: 4.6, reviews: 531, image: "" },
  { id: 3, name: "Fone Bluetooth Air", category: "audio", price: 349.9, oldPrice: null, rating: 4.4, reviews: 892, image: "" },
  { id: 4, name: "Monitor Gamer 27\" 144Hz", category: "monitores", price: 1599.0, oldPrice: 1899.0, rating: 4.7, reviews: 173, image: "" },
  { id: 5, name: "Teclado Mecânico RGB", category: "perifericos", price: 389.9, oldPrice: null, rating: 4.5, reviews: 340, image: "" },
  { id: 6, name: "Smartwatch Fit 2", category: "wearables", price: 799.0, oldPrice: 999.0, rating: 4.3, reviews: 128, image: "" },
  { id: 7, name: "Mouse Sem Fio Ergo", category: "perifericos", price: 159.9, oldPrice: null, rating: 4.6, reviews: 457, image: "" },
  { id: 8, name: "Caixa de Som Portátil", category: "audio", price: 279.0, oldPrice: 349.0, rating: 4.5, reviews: 266, image: "" },
];

const BENEFITS = [
  { title: "Frete grátis", text: "Em compras acima de R$ 299 para todo o Brasil." },
  { title: "Pague em até 12x", text: "Parcele no cartão ou pague no Pix com desconto." },
  { title: "Compra segura", text: "Seus dados protegidos em todas as etapas." },
  { title: "Troca facilitada", text: "7 dias para trocar ou devolver sem burocracia." },
];

const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const ICONS = {
  laptop: <path d="M5 6h14v9H5zM3 18h18" />,
  phone: <path d="M8 3h8v18H8zM11 18h2" />,
  headphones: <path d="M4 15v-3a8 8 0 0116 0v3M4 15h3v5H4zM17 15h3v5h-3z" />,
  monitor: <path d="M3 5h18v11H3zM9 20h6M12 16v4" />,
  mouse: <path d="M12 3a5 5 0 015 5v8a5 5 0 01-10 0V8a5 5 0 015-5zM12 3v6" />,
  watch: <path d="M8 6h8v12H8zM9 6l1-3h4l1 3M9 18l1 3h4l1-3M12 10v3l2 1" />,
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.5 11h10L20 7H6.5M9 20h.01M17 20h.01" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
      <path fill="currentColor" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

function ImagePlaceholder() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
      <rect x="8" y="14" width="48" height="36" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="22" cy="27" r="4" fill="currentColor" />
      <path d="M10 46l14-13 10 9 8-7 14 11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function ProductCard({ product, onAdd }) {
  const { name, price, oldPrice, rating, reviews, image } = product;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <article className="home-card">
      <div className="home-card-media">
        {image ? <img src={image} alt={name} loading="lazy" /> : <ImagePlaceholder />}
        {discount > 0 && <span className="home-badge">-{discount}%</span>}
      </div>
      <div className="home-card-body">
        <h3>{name}</h3>
        <div className="home-card-rating">
          <StarIcon />
          <strong>{rating.toFixed(1)}</strong>
          <span>({reviews})</span>
        </div>
        <div className="home-card-price">
          {oldPrice && <span className="old">{brl(oldPrice)}</span>}
          <span className="current">{brl(price)}</span>
          <span className="installments">ou 10x de {brl(price / 10)}</span>
        </div>
        <button type="button" className="home-btn" onClick={() => onAdd(product)}>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

export default function HomepageBody() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (!activeCategory || p.category === activeCategory) &&
        p.name.toLowerCase().includes(term)
    );
  }, [search, activeCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="home-page">
      <div className="home-panel">
        {/* Cabeçalho */}
        <header className="home-header">
          <a href="/" className="home-logo" aria-label="TechStore, página inicial">
            Tech<span>Store</span>
          </a>

          <div className="home-search">
            <label htmlFor="home-search" className="sr-only">Buscar produtos</label>
            <input
              id="home-search"
              type="search"
              placeholder="Busque por notebooks, fones, monitores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <nav className="home-nav" aria-label="Principal">
            <a href="/login">Entrar</a>
            <a href="/cadastro">Criar conta</a>
            <a href="/carrinho" className="home-cart" aria-label={`Carrinho com ${cartCount} itens`}>
              <CartIcon />
              {cartCount > 0 && <span className="home-cart-count">{cartCount}</span>}
            </a>
          </nav>
        </header>

        {/* Banner */}
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="home-hero-text">
            <h1 id="hero-title">Eletrônicos com os melhores preços</h1>
            <p>Notebooks, smartphones e acessórios com frete grátis e parcelamento em até 12x.</p>
            <a href="#produtos" className="home-btn home-btn-inline">Ver ofertas</a>
          </div>
          <div className="home-hero-art" aria-hidden="true">
            <div className="art-block art-a" />
            <div className="art-block art-b" />
            <div className="art-block art-c" />
          </div>
        </section>

        {/* Categorias */}
        <section aria-labelledby="sec-categorias">
          <div className="home-section-title">
            <h2 id="sec-categorias">Categorias</h2>
            <span className="line" />
          </div>
          <div className="home-categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`home-category ${activeCategory === c.id ? "is-active" : ""}`}
                aria-pressed={activeCategory === c.id}
                onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
              >
                <Icon name={c.icon} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Produtos */}
        <section id="produtos" aria-labelledby="sec-produtos">
          <div className="home-section-title">
            <h2 id="sec-produtos">Ofertas em destaque</h2>
            <span className="line" />
          </div>

          {visibleProducts.length > 0 ? (
            <div className="home-grid">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => setCartCount((n) => n + 1)} />
              ))}
            </div>
          ) : (
            <div className="home-empty">
              <p>Nenhum produto encontrado.</p>
              <button
                type="button"
                className="home-btn home-btn-inline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory(null);
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        {/* Benefícios */}
        <section aria-labelledby="sec-beneficios">
          <div className="home-section-title">
            <h2 id="sec-beneficios">Por que comprar aqui</h2>
            <span className="line" />
          </div>
          <div className="home-benefits">
            {BENEFITS.map((b) => (
              <div className="home-benefit" key={b.title}>
                <strong>{b.title}</strong>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="home-newsletter" aria-labelledby="news-title">
          <div>
            <h2 id="news-title">Receba ofertas por e-mail</h2>
            <p>Avisamos quando os produtos que você procura entrarem em promoção.</p>
          </div>
          {subscribed ? (
            <p className="home-success" role="status">E-mail cadastrado. Fique de olho na sua caixa de entrada.</p>
          ) : (
            <form className="home-news-form" onSubmit={handleSubscribe}>
              <label htmlFor="news-email" className="sr-only">Seu e-mail</label>
              <input
                id="news-email"
                type="email"
                placeholder="seuemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="home-btn">Quero receber</button>
            </form>
          )}
        </section>

        {/* Rodapé */}
        <footer className="home-footer">
          <a href="/" className="home-logo">Tech<span>Store</span></a>
          <nav aria-label="Rodapé">
            <a href="/minha-conta">Minha conta</a>
            <a href="/pedidos">Meus pedidos</a>
            <a href="/favoritos">Favoritos</a>
            <a href="/ajuda">Ajuda</a>
          </nav>
          <p>© {new Date().getFullYear()} TechStore. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}