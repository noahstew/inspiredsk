# 📘 Database Schema for Blog and Linktree-style App

## 📄 `blog_posts` Table

### SQL Statement

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  content TEXT NOT NULL,
  image_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Field Breakdown

| Column Name    | Type        | Description                            |
| -------------- | ----------- | -------------------------------------- |
| `id`           | `uuid`      | Primary key, auto-generated unique ID  |
| `author_name`  | `text`      | Author of the blog post                |
| `title`        | `text`      | Title of the blog post                 |
| `published_at` | `timestamp` | Date and time the post was published   |
| `content`      | `text`      | Body content (HTML, Markdown, etc.)    |
| `image_urls`   | `text[]`    | Array of image URLs stored in Supabase |
| `created_at`   | `timestamp` | Auto-generated creation timestamp      |

---

## 🔗 `links` Table

### SQL Statement

```sql
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Field Breakdown

| Column Name  | Type        | Description                                   |
| ------------ | ----------- | --------------------------------------------- |
| `id`         | `uuid`      | Primary key, auto-generated unique ID         |
| `title`      | `text`      | Display text for the link                     |
| `url`        | `text`      | Destination URL                               |
| `image_url`  | `text`      | Optional image URL stored in Supabase Storage |
| `sort_order` | `integer`   | Optional ordering index                       |
| `created_at` | `timestamp` | Auto-generated creation timestamp             |

---

## 📦 Image Handling

- **Storage**: Upload images to Supabase Storage buckets.
- **Reference**: Save the resulting public URLs in `image_urls` (array) or `image_url` (string).

---

## 🛡️ Authentication Notes

- For this schema, no foreign key relationships to users are needed if you're managing one admin.
- If needed in future, add `user_id UUID REFERENCES users(id)`.
