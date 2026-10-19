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
        var roots = await _categoryRepository.GetRootCategoriesAsync(cancellationToken);

        var result = new List<CategoryDto>();

        foreach (var root in roots)
        {
            List<CategoryDto>? subCategories = null;

            if (request.IncludeSubCategories)
            {
                var children = await _categoryRepository.GetSubCategoriesAsync(root.Id, cancellationToken);
                subCategories = children.Select(c => new CategoryDto(
                    c.Id,
                    c.Name,
                    c.ParentId,
                    c.Level,
                    c.FullPath,
                    c.IsLeaf,
                    CategoryImageMapper.GetImageUrl(c.Name)
                )).ToList();
            }

            result.Add(new CategoryDto(
                root.Id,
                root.Name,
                root.ParentId,
                root.Level,
                root.FullPath,
                root.IsLeaf,
                CategoryImageMapper.GetImageUrl(root.Name),
                subCategories
            ));
        }

        return result;
    }
}
