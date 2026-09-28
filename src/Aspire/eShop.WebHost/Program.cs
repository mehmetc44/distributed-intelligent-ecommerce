var builder = DistributedApplication.CreateBuilder(args);

var catalogApi = builder.AddProject("catalog-api", "../../Services/Catalog.API/Catalog.API.csproj");
var stockApi = builder.AddProject("stock-api", "../../Services/Stock.API/Stock.API.csproj");
var paymentApi = builder.AddProject("payment-api", "../../Services/Payment.API/Payment.API.csproj");

builder.Build().Run();
