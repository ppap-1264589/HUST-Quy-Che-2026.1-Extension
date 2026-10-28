# HUST Auto Fill - Quy chế 2026.1

Tiện ích Chrome/Edge Manifest V3, có icon checklist riêng và hộp nhắc kiểm tra sau khi chạy, dùng ngân hàng đáp án lấy từ các lựa chọn được in đậm trong tài liệu Word đáp án Quy chế 2026.1. Tiện ích đọc tiêu đề câu hỏi đang hiển thị trên Microsoft Forms, tìm câu tương ứng trong `data/answer-key.js`, rồi chọn phương án đã lưu.

## Cài đặt từ ZIP

1. Tải ZIP từ GitHub và giải nén vào một thư mục.
2. Mở `chrome://extensions` (Chrome) hoặc `edge://extensions` (Edge).
3. Bật **Developer mode / Chế độ dành cho nhà phát triển**.
4. Chọn **Load unpacked / Tải tiện ích đã giải nén** và chọn thư mục chứa `manifest.json`.
5. Mở bài kiểm tra Quy chế kỳ 2026.1 trên Microsoft Forms, tải lại trang nếu trang đã mở trước khi cài tiện ích.
6. Bấm biểu tượng extension, sau đó chọn **Điền đáp án**.

Trình duyệt không cài tiện ích trực tiếp từ file ZIP ở chế độ nhà phát triển; cần giải nén trước và chọn thư mục có `manifest.json`.

## Lưu ý

- Tiện ích chỉ điền các câu hỏi đang hiển thị trên trang hiện tại; nếu biểu mẫu chia thành nhiều trang, chuyển trang rồi chạy lại.
- Tiện ích không tự nộp bài. Hãy rà soát các câu đã chọn trước khi gửi biểu mẫu.
- Ngân hàng đáp án được đóng gói trong source; không có dịch vụ bên ngoài hay máy chủ.
- Các câu không khớp văn bản sẽ được bỏ qua và tính vào mục chưa có đáp án khớp.
