# 🛒 AgenticCommerce (Distributed Intelligent E-Commerce)

Bu proje, mikroservis mimarisi ve yapay zeka (RAG & Semantik Arama) destekli modüller ile geliştirilmiş dağıtık ve akıllı bir e-ticaret platformudur. Sistem, yüksek ölçeklenebilirlik, dinamik öneri mekanizmaları ve güvenli işlem yönetimi sunarak modern e-ticaret ihtiyaçlarını karşılamayı hedeflemektedir.

## 🏗️ Mimari & Teknoloji Yığını

*   **Orkestrasyon:** `.NET Aspire` (Servis keşfi, telemetri, ortam değişkenleri yönetimi)
*   **Backend (.NET):** `.NET 10`, C#
*   **Backend (AI / Python):** `Python 3.12`, `FastAPI`, `PyTorch (CUDA)`, `SentenceTransformers`
*   **Embedding Modeli:** `Trendyol/TY-ecomm-embed-multilingual-base-v1.2.0` (768-dim e-ticaret optimize model)
*   **API Tasarımı:** `Minimal APIs`, RESTful, TEI (Text Embeddings Inference) uyumlu sözleşme
*   **Mimari Desen:** `Microservices`, `CQRS`, `MediatR`, `Domain-Driven Design (DDD)`
*   **Veritabanı:** `PostgreSQL` (EF Core Code-First)
*   **Yapay Zeka & Vektör Arama:** `PgVector` (Kosinüs ve Dot Product benzerliği ile Semantik Arama)
*   **API Gateway:** `YARP` (Yet Another Reverse Proxy)
*   **Client (Ön Yüz):** `Angular`

## ⚙️ Proje Yapısı

*   `src/Aspire/eShop.AppHost`: Aspire AppHost projesidir. Tüm sistemi tek merkezden ayağa kaldırır.
*   `src/ApiGateway`: YARP kullanan, istemci isteklerini ilgili mikroservislere yönlendiren geçit.
*   `src/Services/Catalog/Catalog.API`: Ürün ve Kategori yönetiminden sorumlu ana mikroservis (Clean Architecture: API, Application, Domain, Infrastructure).
*   `src/Services/Embedding.API`: Metinleri semantik vektörlere dönüştüren Python tabanlı servis (HuggingFace TEI uyumlu `POST /embed` sözleşmesi).
*   `src/Services/Stock.API` & `Payment.API`: Stok ve ödeme servisleri.
*   `src/Clients/WebApp`: Angular tabanlı modern kullanıcı arayüzü.

## 🚀 Başlangıç (Local Development)

Proje Aspire ile tasarlandığı için yerel geliştirme ortamında ayağa kaldırmak son derece kolaydır.

### 1. Veritabanı Kurulumu
Proje yerel PostgreSQL sunucunuzu kullanır. `Aspire/eShop.AppHost` dizini altında bir `.env` dosyası oluşturup şu formata göre kendi şifrenizi ekleyin:
```env
ConnectionStrings__catalog-db="Host=localhost;Port=5432;Database=catalogdb;Username=postgres;Password=SIFRENIZ"
```

### 2. Migration
Entity Framework tablolarını oluşturmak için `Catalog.API` dizininde şu komutu çalıştırın:
```bash
dotnet ef database update --project ../Catalog.Infrastructure --startup-project . --connection "Host=localhost;Port=5432;Database=catalogdb;Username=postgres;Password=SIFRENIZ"
```

### 3. Çalıştırma
Gereksinimler: .NET SDK `10.0.302` (bkz. `global.json`) ve [Aspire CLI](https://aspire.dev).

Tüm sistemi Aspire CLI ile projenin kök dizininden başlatın:
```bash
aspire run
```
Alternatif olarak: `dotnet run --project src/Aspire/eShop.AppHost`
Aspire Dashboard açılacak ve Gateway, Catalog.API, WebApp loglarını tek bir ekrandan yönetebileceksiniz.

### 4. Embedding.API (Opsiyonel / Bağımsız Çalıştırma)
Python embedding servisini bağımsız olarak çalıştırmak veya test etmek için:
```bash
cd src/Services/Embedding.API
uv sync
uv run uvicorn app.main:app --port 8000
```
* **Swagger Arayüzü:** `http://localhost:8000/docs`
* **Otomatik Duman Testi:** `uv run python scripts/smoke_test.py`

