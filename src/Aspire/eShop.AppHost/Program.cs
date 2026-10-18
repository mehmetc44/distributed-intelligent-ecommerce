using DotNetEnv;

// .env, csproj tarafından çıktı klasörüne kopyalanır (aspire run'ın çalışma dizininden bağımsız)
Env.Load(Path.Combine(AppContext.BaseDirectory, ".env"));

var builder = DistributedApplication.CreateBuilder(args);

var catalogDb = builder.AddConnectionString("catalog-db");

var catalogApi = builder.AddProject("catalog-api", "../../Services/Catalog/Catalog.API/Catalog.API.csproj")
                        .WithReference(catalogDb);
var stockApi = builder.AddProject("stock-api", "../../Services/Stock.API/Stock.API.csproj");
var paymentApi = builder.AddProject("payment-api", "../../Services/Payment.API/Payment.API.csproj");

var apiGateway = builder.AddProject("api-gateway", "../../ApiGateway/ApiGateway.csproj");
apiGateway.WithReference(catalogApi);
apiGateway.WithReference(stockApi);
apiGateway.WithReference(paymentApi);
apiGateway.WithHttpEndpoint(targetPort: 8080) // Gateway'in dinleyeceği port
          .WithExternalHttpEndpoints();

// Angular uygulamasını (npm run start) Aspire içine bir executable olarak ekliyoruz
var webApp = builder.AddExecutable("webapp", "npm", "../../Clients/WebApp", "run", "start")
                    .WithReference(apiGateway)
                    .WithHttpEndpoint(targetPort: 4200) // Sadece targetPort veriyoruz, Aspire kendi proxy portunu rastgele atayacak
                    .WithExternalHttpEndpoints();

// Python Embedding Servisi (uv ile çalıştırılır)
var embeddingDir = Path.GetFullPath(Path.Combine(builder.AppHostDirectory, "../../Services/Embedding.API"));

var embeddingApi = builder.AddExecutable(
        "embedding-api",
        "uv",
        embeddingDir,
        "run", "--directory", embeddingDir, "python", "-m", "uvicorn", "app.main:app", "--port", "8000"
    )
    .WithHttpEndpoint(targetPort: 8000, name: "http")
    .WithExternalHttpEndpoints();

catalogApi.WithReference(embeddingApi.GetEndpoint("http"));


builder.Build().Run();
