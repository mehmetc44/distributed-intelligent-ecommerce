namespace Catalog.Application.Categories.Queries.GetSubCategories;

using Catalog.Application.Common.DTOs;
using Catalog.Application.Common.Helpers;
using Catalog.Domain.Interfaces;
using MediatR;

public record GetSubCategoriesQuery(int ParentId) : IRequest<List<CategoryDto>>;

public class GetSubCategoriesQueryHandler : IRequestHandler<GetSubCategoriesQuery, List<CategoryDto>>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetSubCategoriesQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> Handle(GetSubCategoriesQuery request, CancellationToken cancellationToken)
    {
        var children = await _categoryRepository.GetSubCategoriesAsync(request.ParentId, cancellationToken);

        return children.Select(c => new CategoryDto(
            c.Id,
            c.Name,
            c.ParentId,
            c.Level,
            c.FullPath,
            c.IsLeaf,
            CategoryImageMapper.GetImageUrl(c.Name)
        )).ToList();
    }
}
