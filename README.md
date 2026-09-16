# Official BY MYK

بایو لینک سه‌بعدی محمد یاسین کرمی + **صندوق پیام با دیتابیس SQL واقعی**.

---

## قابلیت‌ها

- فرم ارسال پیام فعال → پیام‌ها در **PostgreSQL** (Vercel Postgres) ذخیره می‌شوند
- صندوق پیام محافظت‌شده با رمز `1390`
- امکان ریپلای به عنوان **محمد یاسین کرمی**
- همزمان ارسال به تلگرام / ایمیل

---

## راه‌اندازی روی Vercel (SQL واقعی)

### ۱. ساخت پروژه روی Vercel
1. برو به [vercel.com](https://vercel.com) و لاگین کن
2. **Add New Project** → این ریپو را Import کن
3. Framework Preset: **Other**

### ۲. ساخت دیتابیس Postgres
1. داخل پروژهٔ Vercel برو به تب **Storage**
2. **Create Database** → **Postgres** (Neon) را انتخاب کن
3. یک دیتابیس بساز (نام دلخواه، مثلاً `myk-inbox`)
4. بعد از ساخت، Vercel خودش Environment Variables را اضافه می‌کند:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - و بقیه

### ۳. (اختیاری) تغییر رمز صندوق
در Environment Variables پروژه یک متغیر اضافه کن:

```
INBOX_PASSWORD=1390
```

(اگر نگذاری، پیش‌فرض `1390` است)

### ۴. Deploy
دکمه Deploy را بزن. تمام.

جداول `messages` و `replies` به صورت خودکار در اولین درخواست ساخته می‌شوند.

---

## مسیرها

| مسیر | توضیح |
|------|--------|
| `/` | صفحه اصلی بایو لینک |
| `/inbox` یا `/inbox.html` | صندوق پیام (رمز: 1390) |
| `/api/messages` | API دیتابیس |

---

## ساختار دیتابیس

```sql
messages (
  id TEXT PRIMARY KEY,
  name TEXT,
  contact TEXT,
  body TEXT,
  created_at TIMESTAMPTZ,
  is_read BOOLEAN
)

replies (
  id TEXT PRIMARY KEY,
  message_id TEXT → messages(id),
  body TEXT,
  from_name TEXT,          -- همیشه «محمد یاسین کرمی»
  created_at TIMESTAMPTZ
)
```

---

## شبکه‌ها
- YouTube / Telegram / Instagram / X / Facebook / Threads / GitHub / Email
- تماس: `09043387470`
- ربات: https://t.me/mykofficialbot
