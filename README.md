# 🛒 AgenticCommerce (Distributed Intelligent E-Commerce)

Bu proje, mikroservis mimarisi ve yapay zeka (RAG & Semantik Arama) destekli modüller ile geliştirilmiş dağıtık ve akıllı bir e-ticaret platformudur. Sistem, yüksek ölçeklenebilirlik, dinamik öneri mekanizmaları ve güvenli işlem yönetimi sunarak modern e-ticaret ihtiyaçlarını karşılamayı hedeflemektedir.

## 🏗️ Mimari & Teknoloji Yığını

*   **Orkestrasyon:** `.NET Aspire` (Servis keşfi, ortam değişkenleri yönetimi)
*   **Backend:** `.NET 10`, C#
*   **API Tasarımı:** `Minimal APIs`
*   **Mimari Desen:** `Microservices`, `CQRS` (Command Query Responsibility Segregation), `MediatR`, `Domain-Driven Design (DDD)`
*   **Veritabanı:** `PostgreSQL` (EF Core Code-First)
*   **Yapay Zeka Uzantıları:** `PgVector` (Kosinüs benzerliği ve Semantik Arama için)
*   **API Gateway:** `YARP` (Yet to Another Reverse Proxy)
*   **Client (Ön Yüz):** `Angular`

## ⚙️ Proje Yapısı

*   `Aspire/eShop.WebHost`: Aspire AppHost projesidir. Tüm sistemi tek tıkla ayağa kaldırmak için kullanılır.
*   `ApiGateway`: YARP kullanan, client isteklerini ilgili mikroservislere yönlendiren kapıdır.
*   `Services/Catalog/Catalog.API`: Ürün ve Kategori yönetiminden sorumlu ana mikroservistir. (Clean Architecture kullanılarak API, Application, Domain, Infrastructure katmanlarına bölünmüştür).
*   `Clients/WebApp`: Angular tabanlı kullanıcı arayüzü.

## 🚀 Başlangıç (Local Development)

Proje Aspire ile tasarlandığı için yerel geliştirme ortamında ayağa kaldırmak son derece kolaydır.

### 1. Veritabanı Kurulumu
Proje yerel PostgreSQL sunucunuzu kullanır. `Aspire/eShop.WebHost` dizini altında bir `.env` dosyası oluşturup şu formata göre kendi şifrenizi ekleyin:
```env
ConnectionStrings__catalog-db="Host=localhost;Port=5432;Database=catalogdb;Username=postgres;Password=SIFRENIZ"
```

### 2. Migration
Entity Framework tablolarını oluşturmak için `Catalog.API` dizininde şu komutu çalıştırın:
```bash
dotnet ef database update --project ../Catalog.Infrastructure --startup-project . --connection "Host=localhost;Port=5432;Database=catalogdb;Username=postgres;Password=SIFRENIZ"
```

### 3. Çalıştırma
Tüm sistemi Aspire üzerinden başlatmak için projenin kök dizininde veya Visual Studio'da `eShop.WebHost` projesini çalıştırın:
```bash
cd src/Aspire/eShop.WebHost
dotnet run
```
Aspire Dashboard açılacak ve Gateway, Catalog.API, WebApp loglarını tek bir ekrandan yönetebileceksiniz.
