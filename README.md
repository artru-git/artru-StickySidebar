🚀 Artru Sticky Sidebar

Giải pháp JavaScript hiện đại cho Sticky Sidebar trượt 2 chiều. Được tối ưu hóa cho AdSense, Lazy-load và hiệu suất tối đa cho website năm 2026.

✨ Tính năng nổi bật

Hybrid Observation: Kết hợp ResizeObserver và MutationObserver để theo dõi thay đổi kích thước DOM (quảng cáo AdSense, hình ảnh) theo thời gian thực.

Siêu nhẹ: Chỉ khoảng 2KB, không phụ thuộc vào thư viện bên ngoài (Zero Dependencies).

Mượt mà: Sử dụng requestAnimationFrame giúp đạt 60fps khi cuộn trang.

Core Web Vitals: Tối ưu để tránh gây hiện tượng Layout Shift (CLS).

📦 Cài đặt qua CDN

Chèn dòng này vào trước thẻ đóng </body> trong HTML của bạn:

<script src="[https://cdn.jsdelivr.net/gh/artru-git/artru-lib@1.0.0/artru-stickysidebar.min.js](https://cdn.jsdelivr.net/gh/artru-git/artru-lib@1.0.0/artru-stickysidebar.min.js)"></script>


🛠 Cách sử dụng

1. Cấu trúc HTML

Thêm thuộc tính data-sticky-sidebar vào thẻ bạn muốn làm sticky (thường là thẻ <aside> hoặc <div> của sidebar).

<aside data-sticky-sidebar 
       data-top-gap="20" 
       data-bottom-gap="20" 
       data-mobile-width="992">
    <!-- Nội dung sidebar hoặc mã AdSense -->
</aside>


2. Các tham số cấu hình (Data Attributes)

Thuộc tính

Mặc định

Mô tả

data-sticky-sidebar

(Bắt buộc)

Kích hoạt tính năng cho phần tử.

data-top-gap

0

Khoảng cách từ đỉnh sidebar đến mép trên màn hình (px). Nhập auto để tự lấy vị trí hiện tại.

data-bottom-gap

0

Khoảng cách từ đáy sidebar đến mép dưới màn hình (px).

data-mobile-width

0

Chiều rộng màn hình (px) mà dưới mức đó tính năng sticky sẽ tự động tắt.

💡 Tại sao chọn ARTRU Lib?

Hầu hết các thư viện cũ thường bị lỗi tính toán sai vị trí khi Google AdSense tải quảng cáo muộn. Artru Sticky Sidebar giải quyết vấn đề này bằng cách:

Lắng nghe Resize: Khi AdSense "nhảy" vào làm sidebar dài ra, thư viện tự động đo lại ngay lập tức.

Cập nhật thông minh: Tự động đồng bộ hóa layout sau 200ms khi trang load xong hoàn toàn.

📄 Giấy phép

Mã nguồn phát hành dưới giấy phép MIT.

Phát triển bởi ARTRU
