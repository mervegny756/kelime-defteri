import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem("kelimeler");
    return saved ? JSON.parse(saved) : [];
  });

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [category, setCategory] = useState("İngilizce");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("kelimeler", JSON.stringify(words));
  }, [words]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!word.trim() || !meaning.trim()) {
      alert("Kelime ve anlam alanlarını doldurmalısın!");
      return;
    }

    if (editingId !== null) {
      setWords(words.map((item) =>
        item.id === editingId
          ? { ...item, word, meaning, example, category }
          : item
      ));
      setEditingId(null);
    } else {
      setWords([...words, {
        id: Date.now(),
        word,
        meaning,
        example,
        category
      }]);
    }

    setWord("");
    setMeaning("");
    setExample("");
    setCategory("İngilizce");
  }
function toggleFavorite(id) {
  setWords(words.map((item) =>
    item.id === id
      ? { ...item, isFavorite: !item.isFavorite }
      : item
  ));
}
  function deleteWord(id) {
    if (window.confirm("Bu kelimeyi silmek istiyor musun?")) {
      setWords(words.filter((item) => item.id !== id));
    }
  }

  function editWord(item) {
    setWord(item.word);
    setMeaning(item.meaning);
    setExample(item.example);
    setCategory(item.category);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase()) ||
    item.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <div>
            <h2>Kelime Defterim</h2>
            <p>Kelimelerini keşfet, öğren ve biriktir.</p>
          </div>
        </div>
        <span className="header-label">Kişisel Kelime Arşivim</span>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <span className="small-title">ÖĞRENME YOLCULUĞUN</span>
            <h1>Merhaba! 👋</h1>
            <p>Bugün yeni bir kelime öğrenmeye ne dersin?</p>
          </div>
          <div className="welcome-icon">✏️</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>📖</span>
            <div>
              <h3>{words.length}</h3>
              <p>Toplam Kelime</p>
            </div>
          </div>

          <div className="stat-card">
            <span>🌍</span>
            <div>
              <h3>{new Set(words.map(w => w.category)).size}</h3>
              <p>Kategori Sayısı</p>
            </div>
          </div>

          <div className="stat-card">
            <span>✨</span>
            <div>
              <h3>{words.filter(w => w.example.trim()).length}</h3>
              <p>Örnek Cümle</p>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="form-card">
            <h2>{editingId !== null ? "✏️ Kelimeyi Düzenle" : "➕ Yeni Kelime Ekle"}</h2>
            <p className="form-description">
              Öğrenmek istediğin kelimeyi defterine kaydet.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Kelime</label>
              <input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Örn: Beautiful"
              />

              <label>Türkçe Anlamı</label>
              <input
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Örn: Güzel"
              />

              <label>Örnek Cümle</label>
              <textarea
                value={example}
                onChange={(e) => setExample(e.target.value)}
                placeholder="Kelimeyi bir cümlede kullan..."
                rows="3"
              />

              <label>Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>İngilizce</option>
                <option>Almanca</option>
                <option>Fransızca</option>
                <option>Türkçe</option>
                <option>Diğer</option>
              </select>

              <button type="submit" className="add-button">
                {editingId !== null ? "Değişiklikleri Kaydet" : "Kelimeyi Kaydet"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setEditingId(null);
                    setWord("");
                    setMeaning("");
                    setExample("");
                    setCategory("İngilizce");
                  }}
                >
                  Vazgeç
                </button>
              )}
            </form>
          </div>

          <div className="words-card">
            <div className="words-heading">
              <div>
                <h2>📚 Kelime Listem</h2>
                <p>Kaydettiğin kelimeler burada.</p>
              </div>
              <span className="word-count">{words.length} kelime</span>
            </div>

            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Kelime veya anlam ara..."
            />

            <div className="word-list">
              {filteredWords.length === 0 ? (
                <div className="empty">
                  <span>📔</span>
                  <h3>{words.length === 0 ? "Henüz kelime eklemedin" : "Kelime bulunamadı"}</h3>
                  <p>{words.length === 0
                    ? "İlk kelimeni ekleyerek defterini oluşturmaya başla."
                    : "Başka bir kelime aramayı dene."}</p>
                </div>
              ) : (
                filteredWords.map((item) => (
                  <div className="word-item" key={item.id}>
                    <div className="word-top">
                      <div>
                        <h3>{item.word}</h3>
                        <p className="meaning">{item.meaning}</p>
                      </div>
                      <span className="category">{item.category}</span>
                    </div>

                    {item.example && (
                      <p className="example">“{item.example}”</p>
                    )}

                    <div className="word-actions">
                      <button onClick={() => editWord(item)}>✏️ Düzenle</button>
                      <button onClick={() => deleteWord(item.id)}>🗑️ Sil</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <footer>
          <p>💜 Kelime Defterim | Öğrenmek hiç bu kadar kolay olmamıştı.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;