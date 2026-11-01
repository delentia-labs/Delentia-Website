# Code Citations

## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-
```


## License: unknown
https://github.com/mburakerman/mburakerman.github.io/blob/164c576c3a6c36a8178441cd40f1c2402d80794a/blog/web-rendering-patterns.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```
```


## License: unknown
https://github.com/tbille/blog.bille.dev/blob/e99aefab79cbf2e02b85b1f6afeb2ea52dc63195/_layouts/default.html

```
---

## ผลลัพธ์การพัฒนาและปรับปรุง — Before / After ทั้งหมด

### Build & Smoke Test Results ✅
- **Build:** 156 pages, 0 TypeScript errors ✅
- **Smoke:** 6/6 PASS (`/`, `/th`, `/blog`, `/th/blog`, 2× blog articles) ✅

---

### ไฟล์ที่แก้ไข

---

#### 1. [app/layout.tsx](app/layout.tsx) — เพิ่ม `preconnect` สำหรับ GTM/GA

**Before:**
```html
<!-- มีเฉพาะ CloudFront preconnect -->
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
```

**After:**
```html
<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" .../>
<link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />

<!-- ใหม่ → warm DNS+TCP+TLS ไว้รอ ก่อนที่ DeferredAnalytics จะโหลด GTM -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```
```

