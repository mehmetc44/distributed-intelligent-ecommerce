namespace Catalog.Infrastructure;

using Catalog.Domain.Interfaces;
using Catalog.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        return services;
    }
}
