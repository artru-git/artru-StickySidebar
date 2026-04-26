# 🧲 ARTRU Sticky Sidebar

**ARTRU Sticky Sidebar** là một thư viện JavaScript nhẹ, hiện đại, giúp tạo hiệu ứng sidebar sticky mượt mà và ổn định cho các website có nội dung động (Ads, Lazy-load, DOM thay đổi).

---

## 🚀 Cài đặt

### 1. Thêm script

```html
<script src="artru-stickysidebar.js"></script>
```

Link CDN

```html
<script src="https://cdn.jsdelivr.net/gh/artru-git/artru-StickySidebar@v1.0.0/artru-stickysidebar.min.js"></script>
```

---

## ✅ Cách sử dụng cơ bản

```html
<aside data-sticky-sidebar>
    Nội dung sidebar
</aside>
```

Hoặc cách cũ (tương thích):

```html
<aside data-sticky="true">
    Nội dung sidebar
</aside>
```

Script sẽ **tự động khởi chạy**, không cần gọi hàm.

---

## ⚙️ Thuộc tính cấu hình

### `data-top-gap`
Khoảng cách từ đỉnh màn hình.

```html
<aside data-top-gap="80">
```

| Giá trị | Ý nghĩa |
|------|------|
| `0` | Sát top |
| `80` | Cách top 80px |
| `auto` | Lấy vị trí ban đầu |

---

### `data-bottom-gap`
Khoảng cách an toàn phía dưới.

```html
<aside data-bottom-gap="20">
```

---

### `data-mobile-width`
Chiều rộng (px) để tắt sticky trên mobile.

```html
<aside data-mobile-width="991">
```

---

## 🔥 Ví dụ đầy đủ (khuyến nghị)

```html
<aside
  data-sticky-sidebar
  data-top-gap="80"
  data-bottom-gap="20"
  data-mobile-width="1024"
>
    Nội dung sidebar
</aside>
```

---

## 🧠 Cách hoạt động

- Tự động theo dõi resize (ResizeObserver)
- Theo dõi thay đổi data-attribute (MutationObserver)
- Tối ưu scroll với requestAnimationFrame
- Hoạt động tốt với AdSense, lazy-load

---

## 📱 Mobile

Khi width <= `data-mobile-width`:
- Tắt sticky
- Trả layout mặc định

---

## 📄 License

MIT License

---

## 👨‍💻 Tác giả

**ARTRU**  
https://artru.net

