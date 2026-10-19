using ApiGateway.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddConfigFilter<CustomProxyConfigFilter>();

var app = builder.Build();

app.MapDefaultEndpoints();
app.MapReverseProxy();
app.Run();
