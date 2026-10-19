namespace Catalog.API.Endpoints;

using Catalog.Application.Categories.Queries.GetCategories;
using Catalog.Application.Categories.Queries.GetCategoryById;
using Catalog.Application.Categories.Queries.GetPopularCategories;
using Catalog.Application.Categories.Queries.GetSubCategories;
using MediatR;

public static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        // Hem /categories hem /api/categories isteklerini karşılamak için rotalar
        var group = app.MapGroup("/categories")
            .WithTags("Categories");

        // 1. Kök kategorileri (ve opsiyonel olarak alt kategorilerini) getir
        group.MapGet("/", async (ISender sender, bool? includeSub = true, CancellationToken ct = default) =>
        {
            var result = await sender.Send(new GetCategoriesQuery(includeSub ?? true), ct);
            return Results.Ok(result);
        })
        .WithName("GetCategories")
        .WithSummary("Tüm ana kategorileri ve hiyerarşik alt kategorilerini listeler.");

        // 2. Ana sayfa hikayeler (stories) ve popüler kategori vitrini
        group.MapGet("/popular", async (ISender sender, int? limit = 8, CancellationToken ct = default) =>
        {
            var result = await sender.Send(new GetPopularCategoriesQuery(limit ?? 8), ct);
            return Results.Ok(result);
        })
        .WithName("GetPopularCategories")
        .WithSummary("Ana sayfa hikayeleri için popüler kategorileri görseliyle listeler.");

        // 3. Tekil kategori detayı
        group.MapGet("/{id:int}", async (int id, ISender sender, CancellationToken ct = default) =>
        {
            var result = await sender.Send(new GetCategoryByIdQuery(id), ct);
            return result is not null ? Results.Ok(result) : Results.NotFound(new { message = $"Category with ID {id} not found." });
        })
        .WithName("GetCategoryById")
        .WithSummary("ID'ye göre kategori ve varsa alt kategorilerini getirir.");

        // 4. Belirli bir kategorinin alt kategorileri
        group.MapGet("/{id:int}/subcategories", async (int id, ISender sender, CancellationToken ct = default) =>
        {
            var result = await sender.Send(new GetSubCategoriesQuery(id), ct);
            return Results.Ok(result);
        })
        .WithName("GetSubCategories")
        .WithSummary("Belirtilen kategorinin bir alt seviyesindeki kategorileri listeler.");

        return app;
    }
}
