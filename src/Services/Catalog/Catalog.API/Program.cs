using Catalog.API.Endpoints;
using Catalog.Application;
using Catalog.Infrastructure;
using Catalog.Infrastructure.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

// .env dosyasındaki ortam değişkenlerini (ConnectionStrings vb.) yükler
Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

// ServiceDefaults: OpenTelemetry, HealthChecks, ServiceDiscovery
builder.AddServiceDefaults();

// Add DbContext via Aspire with vector support
builder.AddNpgsqlDbContext<CatalogDbContext>("catalog-db", configureDbContextOptions: options =>
{
    options.UseNpgsql(npgsqlOptions =>
    {
        npgsqlOptions.UseVector();
    });
});

// Clean Architecture: Application & Infrastructure Katmanları
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();

// CORS Politikası (UI ve Gateway erişimleri için)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

// Health check endpoint'leri: /health ve /alive
app.MapDefaultEndpoints();

// Kök Endpoint
app.MapGet("/", () => Results.Ok(new { service = "Catalog API", status = "running", version = "1.0.0" }));

// Kategori Minimal API Endpoint'leri
app.MapCategoryEndpoints();

app.Run();
