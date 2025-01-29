
ER Diagram
```markdown
![image](https://github.com/user-attachments/assets/79855433-e66a-4f6b-b80c-3f10e3efd358)


```markdown
# Crypto Exchange Backend

ระบบแลกเปลี่ยน Cryptocurrency ที่สามารถนำเงิน Fiat (THB, USD) มาซื้อเหรียญจาก User คนอื่นๆในระบบ

สิ่งที่ต้องมีในเครื่อง:
- Node.js เวอร์ชัน 20.11.0
- PostgreSQL เวอร์ชัน 15
- pgAdmin 4 (ไม่จำเป็นแต่แนะนำให้ติดตั้ง)

ขั้นตอนการติดตั้ง:

ดาวน์โหลดโค้ดจาก GitHub โดยใช้คำสั่ง
```
git clone https://github.com/tonnotton/crypto-exchange-backend.git
cd crypto-exchange-backend
```

ติดตั้ง dependencies
```
npm install
```

แก้ไขไฟล์ .env และใส่ข้อมูลดังนี้
```
DB_USERNAME=postgres           # Username PostgreSQL
DB_PASSWORD=your_password      # Password PostgreSQL
DB_DATABASE=crypto_exchange    # ชื่อฐานข้อมูล
DB_HOST=localhost
DB_PORT=5432
```

สร้างฐานข้อมูลและตาราง
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

เพิ่มข้อมูลทดสอบ
```
npx sequelize-cli db:seed:all
```

รันโปรแกรม
```
npm run dev
```

ข้อมูลทดสอบในระบบ:

สกุลเงิน:
- Bitcoin (BTC)
- Ethereum (ETH)
- Ripple (XRP)
- Dogecoin (DOGE)
- Thai Baht (THB)
- US Dollar (USD)

ผู้ใช้ทดสอบ:
- ชื่อผู้ใช้: testuser1
  - อีเมล: test1@example.com
  - รหัสผ่าน: password123
  - สถานะ KYC: ผ่านการยืนยัน
- ชื่อผู้ใช้: testuser2
  - อีเมล: test2@example.com
  - รหัสผ่าน: password123
  - สถานะ KYC: ยังไม่ยืนยัน

API ที่ใช้งานได้:

ส่วนผู้ใช้
- สร้างผู้ใช้ใหม่: `POST /api/users`
- ดูข้อมูลผู้ใช้: `GET /api/users/:userId`

ส่วนกระเป๋าเงิน
- สร้างกระเป๋าเงิน: `POST /api/wallets`
- โอนเงิน: `POST /api/wallets/transfer`
- ดูยอดเงิน: `GET /api/wallets/:walletId/balance`

ส่วนคำสั่งซื้อขาย
- สร้างคำสั่ง: `POST /api/orders`
- ดูคำสั่งที่รอดำเนินการ: `GET /api/orders/pending`
- จับคู่คำสั่ง: `POST /api/orders/match`

ตัวอย่างการส่ง JSON สำหรับแต่ละ API:

Users API:
```json
// POST /api/users - สร้างผู้ใช้ใหม่
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

// GET /api/users/:userId - ไม่ต้องส่ง body
```

Wallets API:
```json
// POST /api/wallets - สร้างกระเป๋าเงิน
{
  "user_id": 1,
  "currency_id": 1
}

// POST /api/wallets/transfer - โอนเงิน
{
  "from_wallet_id": 1,
  "to_wallet_id": 2,
  "amount": 100.50
}

// GET /api/wallets/:walletId/balance - ไม่ต้องส่ง body
```

Orders API:
```json
// POST /api/orders - สร้างคำสั่งซื้อ-ขาย
{
  "user_id": 1,
  "currency_id": 1,        // สกุลเงินที่ต้องการซื้อ/ขาย
  "payment_currency_id": 5, // สกุลเงินที่ใช้ชำระ
  "type": "BUY",          // "BUY" หรือ "SELL"
  "amount": 1.5,          // จำนวนที่ต้องการซื้อ/ขาย
  "price": 50000          // ราคาต่อหน่วย
}

// GET /api/orders/pending - ไม่ต้องส่ง body

// POST /api/orders/match - จับคู่คำสั่งซื้อ-ขาย
{
  "order_id": 1,
  "matching_order_id": 2
}
```

การลบข้อมูลทดสอบ:
```
ลบข้อมูล seed: npx sequelize-cli db:seed:undo:all
ลบตารางทั้งหมด: npx sequelize-cli db:migrate:undo:all
```

การเพิ่มข้อมูลทดสอบใหม่:
```
เพิ่มทั้งหมด: npx sequelize-cli db:seed:all
เพิ่มเฉพาะสกุลเงิน: npx sequelize-cli db:seed --seed 20250128-currencies.js
เพิ่มเฉพาะผู้ใช้: npx sequelize-cli db:seed --seed 20250128-users.js
```

หมายเหตุ:
เซิร์ฟเวอร์จะทำงานที่ [http://localhost:3000](http://localhost:3000)
```
