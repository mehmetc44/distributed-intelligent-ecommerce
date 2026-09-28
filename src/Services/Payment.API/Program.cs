var builder = WebApplication.CreateBuilder(args);

// ServiceDefaults: OpenTelemetry, HealthChecks, ServiceDiscovery
builder.AddServiceDefaults();

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

app.MapGet("/", () => Results.Ok(new { service = "Payment API", status = "running", version = "1.0.0" }));

app.Run();
