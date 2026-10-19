namespace Catalog.Application.Categories.Queries.GetCategories;

using Catalog.Application.Common.DTOs;
using Catalog.Application.Common.Helpers;
using Catalog.Domain.Interfaces;
using MediatR;

public record GetCategoriesQuery(bool IncludeSubCategories = true) : IRequest<List<CategoryDto>>;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, List<CategoryDto>>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetCategoriesQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        // 1. Tüm kategorileri çekip Level <= 3 olanları hafızada ağaca dönüştür
        var all = await _categoryRepository.GetAllCategoriesAsync(cancellationToken);
        var relevant = all.Where(c => c.Level <= 3).ToList();

        var lookupByParent = relevant
            .Where(c => c.ParentId.HasValue)
            .GroupBy(c => c.ParentId!.Value)
            .ToDictionary(g => g.Key, g => g.ToList());

        var roots = relevant.Where(c => c.Level == 1).OrderBy(c => c.Id).ToList();
        var result = new List<CategoryDto>();

        foreach (var root in roots)
        {
            List<CategoryDto>? level2Dtos = null;

            if (request.IncludeSubCategories && lookupByParent.TryGetValue(root.Id, out var level2List))
            {
                level2Dtos = new List<CategoryDto>();

                foreach (var l2 in level2List.OrderBy(c => c.Name))
                {
                    List<CategoryDto>? level3Dtos = null;

                    if (lookupByParent.TryGetValue(l2.Id, out var level3List))
                    {
                        level3Dtos = level3List
                            .OrderBy(c => c.Name)
                            .Select(l3 => new CategoryDto(
                                l3.Id,
                                l3.Name,
                                l3.ParentId,
                                l3.Level,
                                l3.FullPath,
                                l3.IsLeaf,
                                l3.ImageUrl ?? CategoryImageMapper.GetImageUrl(l3.Name),
                                l3.IconUrl,
                                l3.IconSvg
                            ))
                            .ToList();
                    }

                    level2Dtos.Add(new CategoryDto(
                        l2.Id,
                        l2.Name,
                        l2.ParentId,
                        l2.Level,
                        l2.FullPath,
                        l2.IsLeaf,
                        l2.ImageUrl ?? CategoryImageMapper.GetImageUrl(l2.Name),
                        l2.IconUrl,
                        l2.IconSvg,
                        level3Dtos
                    ));
                }
            }

            result.Add(new CategoryDto(
                root.Id,
                root.Name,
                root.ParentId,
                root.Level,
                root.FullPath,
                root.IsLeaf,
                root.ImageUrl ?? CategoryImageMapper.GetImageUrl(root.Name),
                root.IconUrl,
                root.IconSvg,
                level2Dtos
            ));
        }

        return result;
    }
}
