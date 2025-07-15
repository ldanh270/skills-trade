# API ENDPOINT NOTES

## 🔐 AUTH - Đăng ký, Đăng nhập, Reset mật khẩu

| Method | Endpoint          | Mô tả                                      |
| ------ | ----------------- | ------------------------------------------ |
| `POST` | `/register`       | Đăng ký tài khoản mới (username, password) |
| `POST` | `/login`          | Đăng nhập với username và password         |
| `POST` | `/reset-password` | Reset mật khẩu mới cho user                |

---

## 👤 USER PROFILE

| Method | Endpoint          | Mô tả                                             |
| ------ | ----------------- | ------------------------------------------------- |
| `GET`  | `/get-profile`    | Lấy thông tin profile (email, phone, dob, avatar) |
| `POST` | `/update-profile` | Cập nhật thông tin profile                        |
| `GET`  | `/user`           | Trả về full thông tin người dùng theo schema mẫu  |

---

## 🖼️ AVATAR

| Method | Endpoint         | Mô tả                               |
| ------ | ---------------- | ----------------------------------- |
| `POST` | `/upload-avatar` | Upload ảnh đại diện (định dạng PNG) |
| `GET`  | `/avatars/:file` | Truy cập ảnh đại diện tĩnh          |

---

## 🤝 FRIENDS - Kết bạn

| Method | Endpoint                  | Mô tả                                          |
| ------ | ------------------------- | ---------------------------------------------- |
| `POST` | `/friend-request`         | Gửi yêu cầu kết bạn                            |
| `GET`  | `/friend-requests`        | Lấy danh sách các yêu cầu kết bạn gửi đến user |
| `POST` | `/friend-request/respond` | Đồng ý / Từ chối yêu cầu kết bạn               |
| `GET`  | `/friends`                | Lấy danh sách bạn bè đã accepted               |
| `POST` | `/remove-friend`          | Xóa bạn bè                                     |

---

## 🔔 NOTIFICATIONS

| Method | Endpoint         | Mô tả                                   |
| ------ | ---------------- | --------------------------------------- |
| `GET`  | `/notifications` | Lấy danh sách notification gửi đến user |

---

## 💬 MESSAGES - Tin nhắn

| Method | Endpoint             | Mô tả                                      |
| ------ | -------------------- | ------------------------------------------ |
| `GET`  | `/messages`          | Lấy lịch sử tin nhắn giữa 2 user           |
| `POST` | `/messages`          | Gửi tin nhắn giữa 2 user (text hoặc image) |
| `POST` | `/upload-chat-image` | Upload ảnh gửi trong tin nhắn              |
| `GET`  | `/chat_images/:file` | Truy cập ảnh chat tĩnh                     |

---

## 📝 POSTS - Bài đăng kỹ năng

| Method   | Endpoint             | Mô tả                      |
| -------- | -------------------- | -------------------------- |
| `GET`    | `/posts`             | Lấy danh sách bài đăng     |
| `POST`   | `/posts`             | Tạo bài đăng mới           |
| `DELETE` | `/posts/:id`         | Xóa bài đăng               |
| `POST`   | `/upload-post-image` | Upload ảnh trong bài đăng  |
| `GET`    | `/post_images/:file` | Truy cập ảnh bài post tĩnh |

---

## 🌐 KHÁC

| Method | Endpoint | Mô tả                         |
| ------ | -------- | ----------------------------- |
| `GET`  | `/`      | Trang giới thiệu API đơn giản |

---

## 📦 WebSocket Events (socket.io)

| Event         | Payload                              | Mô tả                                   |
| ------------- | ------------------------------------ | --------------------------------------- |
| `register`    | username                             | Đăng ký socket của user khi online      |
| `disconnect`  | —                                    | Gỡ bỏ user khỏi danh sách socket        |
| `new_message` | `{from, to, text, image, createdAt}` | Phát tin nhắn mới đến người nhận và gửi |

---

Nếu bạn muốn **biểu đồ cấu trúc API** hoặc **OpenAPI/Swagger file**, mình có thể tạo giúp!
