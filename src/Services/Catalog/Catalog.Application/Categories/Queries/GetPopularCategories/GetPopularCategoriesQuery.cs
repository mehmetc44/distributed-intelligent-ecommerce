namespace Catalog.Application.Categories.Queries.GetPopularCategories;

using Catalog.Application.Common.DTOs;
using Catalog.Application.Common.Helpers;
using Catalog.Domain.Interfaces;
using MediatR;

public record GetPopularCategoriesQuery(int Limit = 8) : IRequest<List<CategoryDto>>;

public class GetPopularCategoriesQueryHandler : IRequestHandler<GetPopularCategoriesQuery, List<CategoryDto>>
{
    private readonly ICategoryRepository _categoryRepository;

    // UI'daki popüler hikayeler için öncelikli gösterilecek ana kategori isimleri
    private static readonly string[] PriorityCategories = 
    {
        "Elektronik",
        "Giyim",
        "Spor&Outdoor",
        "Kozmetik & Kişisel Bakım",
        "Kitap",
        "Anne & Bebek & Çocuk",
        "Süpermarket",
        "Ev ve Mobilya",
        "Ayakkabı",
        "Aksesuar"
    };

    public GetPopularCategoriesQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> Handle(GetPopularCategoriesQuery request, CancellationToken cancellationToken)
    {
        var roots = await _categoryRepository.GetRootCategoriesAsync(cancellationToken);

        var popularList = new List<CategoryDto>();

        // 1. Öncelikli kategorileri sırayla bulup ekle
        foreach (var name in PriorityCategories)
        {
            var matched = roots.FirstOrDefault(r => r.Name.Equals(name, StringComparison.OrdinalIgnoreCase) ||
                                                    r.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
            if (matched is not null && popularList.All(p => p.Id != matched.Id))
            {
                popularList.Add(new CategoryDto(
                    matched.Id,
                    matched.Name,
                    matched.ParentId,
                    matched.Level,
                    matched.FullPath,
                    matched.IsLeaf,
                    matched.ImageUrl ?? CategoryImageMapper.GetImageUrl(matched.Name),
                    matched.IconUrl,
                    matched.IconSvg
                ));
            }

            if (popularList.Count >= request.Limit)
            {
                break;
            }
        }

        // 2. Eğer limit dolmadıysa kalan kök kategorilerden tamamla
        if (popularList.Count < request.Limit)
        {
            foreach (var root in roots)
            {
                if (popularList.All(p => p.Id != root.Id))
                {
                    popularList.Add(new CategoryDto(
                        root.Id,
                        root.Name,
                        root.ParentId,
                        root.Level,
                        root.FullPath,
                        root.IsLeaf,
                        root.ImageUrl ?? CategoryImageMapper.GetImageUrl(root.Name),
                        root.IconUrl,
                        root.IconSvg
                    ));
                }

                if (popularList.Count >= request.Limit)
                {
                    break;
                }
            }
        }

        return popularList;
    }
}
