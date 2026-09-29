using Catalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Health check endpoint'leri: /health ve /alive
app.MapDefaultEndpoints();

app.MapGet("/", () => Results.Ok(new { service = "Catalog API", status = "running", version = "1.0.0" }));

app.Run();
