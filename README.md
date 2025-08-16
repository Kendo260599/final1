# final1

## Interactive Compass Example

An example script is provided at `examples/compass.py` that displays an interactive compass. Use the slider below the dial to rotate the needle to any angle.

### Requirements
- Python 3
- `matplotlib`
- `numpy`

Install dependencies with:
```bash
pip install matplotlib numpy
```

Run the compass:
```bash
python examples/compass.py
```

## Database Migration

The `birth_info` table now includes a new `birth_time` column. For a fresh setup,
initialize the database with:

```bash
sqlite3 birth_info.db < schema.sql
```

For an existing database, add the column manually:

```sql
ALTER TABLE birth_info ADD COLUMN birth_time TEXT;
```

Alternatively, running any script that instantiates `BirthInfoRepository`
will apply the migration automatically.

## Khởi động server
Ứng dụng dùng polyfill `node-fetch` để cung cấp hàm `fetch` trên Node.js < 18.
Nếu không dùng polyfill này, hãy đảm bảo môi trường Node.js >= 18.

1. (Tuỳ chọn) Tạo file `.env` nếu cần các biến môi trường khác. (AI đã bị gỡ bỏ hoàn toàn; không còn biến AI_API_KEY.)

2. (Tuỳ chọn) Chỉ định đường dẫn database bằng biến môi trường `BIRTH_DB` (mặc định `birth_info.db`):

   ```bash
   export BIRTH_DB="my_birth.db"
   sqlite3 "$BIRTH_DB" < schema.sql
   ```

3. (Tuỳ chọn) Chỉ định trình thông dịch Python bằng biến môi trường `PYTHON` (mặc định `python3`):

   ```bash
   export PYTHON="/path/to/python"
   ```

4. Cài đặt phụ thuộc và chạy server (Node >=18 khuyến nghị):

   ```bash
   npm install
   npm start
   ```

5. (Tuỳ chọn) Chạy test:

   ```bash
   npm test
   ```

## Trạng thái AI

Các tính năng AI (phân tích nâng cao, horoscope dựa trên AI) đã bị loại bỏ hoàn toàn; không còn endpoint hoặc biến môi trường liên quan.

## Lưu ý phát triển giao diện

- Khi chỉnh sửa giao diện trong `index.html`, hãy giữ lại phần tử `<div id="issues-container">`.
- Các script phía client phụ thuộc vào phần tử này để hiển thị danh sách lỗi phong thủy.
- Nếu phần tử bị xoá, ứng dụng vẫn nạp `script.js` nhưng sẽ ghi cảnh báo trong console.
