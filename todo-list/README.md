# ✅ React Todo List App


![image](https://github.com/user-attachments/assets/f80d02d8-1c5d-4c05-b25f-8dc5eaf58ecb)


Bu proje, **React + TypeScript + Vite** ile geliştirilmiş bir yapılacaklar listesi (Todo List) uygulamasıdır. Stil yönetiminde **styled-components**, kullanıcı bildirimlerinde **sweetalert2**, sayfa yönlendirmelerinde ise **React Router** kullanılmıştır. Veriler **localStorage** kullanılarak kalıcı hale getirilmiştir.

## 🚀 Özellikler

- React + TypeScript ile yazılmıştır
- styled-components ile modern, component-tabanlı stil yapısı
- React Router ile sayfalar arası geçiş
- sweetalert2 ile şık bildirimler
- localStorage ile veri kaybı olmadan kullanım
- Görev ekleme, silme, düzenleme ve tamamlama
- Görev filtreleme: tümü, tamamlananlar, aktif görevler

## Proje Yapısı

- `src/`
  - `components/`       # Bileşenler (AddTodo, TodoList vs.)
  - `pages/`            # Sayfalar (Home, About)
  - `types/`            # Type tanımlamaları (Todo tipi)
  - `utils/`            # Yardımcı fonksiyonlar (localStorage işlemleri)
  - `styles/`           # Global stil dosyaları
  - `App.tsx`           # Uygulama rotaları
  - `main.tsx`          # Giriş noktası


## 📦 Kurulum

Aşağıdaki adımları takip ederek projeyi kendi bilgisayarınızda çalıştırabilirsiniz:

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/emirsezginn/react-vite-typescript-todo-list-web-uygulamasi.git
cd react-vite-typescript-todo-list-web-uygulamasi

# 2. Gerekli bağımlılıkları yükleyin
npm install

# 3. Ek bağımlılıkları yükleyin
npm install styled-components react-router-dom sweetalert2
npm install -D @types/styled-components @types/react-router-dom

# 4. Geliştirme sunucusunu başlatın
npm run dev
