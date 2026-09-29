var builder = DistributedApplication.CreateBuilder(args);

var catalogApi = builder.AddProject("catalog-api", "../../Services/Catalog.API/Catalog.API.csproj");
var stockApi = builder.AddProject("stock-api", "../../Services/Stock.API/Stock.API.csproj");
var paymentApi = builder.AddProject("payment-api", "../../Services/Payment.API/Payment.API.csproj");

// Angular uygulamasını (npm run start) Aspire içine bir executable olarak ekliyoruz
var webApp = builder.AddExecutable("webapp", "npm", "../../Clients/WebApp", "run", "start")
                    .WithReference(catalogApi)
                    .WithReference(stockApi)
                    .WithReference(paymentApi)
                    .WithHttpEndpoint(targetPort: 4200) // Sadece targetPort veriyoruz, Aspire kendi proxy portunu rastgele atayacak
                    .WithExternalHttpEndpoints();

var apiGateway = builder.AddProject("api-gateway", "../../ApiGateway/ApiGateway.csproj");
apiGateway.WithReference(catalogApi);
apiGateway.WithReference(stockApi);
apiGateway.WithReference(paymentApi);
apiGateway.WithHttpEndpoint(targetPort: 8080) // Gateway'in dinleyeceği port
          .WithExternalHttpEndpoints();

builder.Build().Run();
