namespace Catalog.Application.Categories.Queries.GetCategoryById;

using Catalog.Application.Common.DTOs;
using Catalog.Application.Common.Helpers;
using Catalog.Domain.Interfaces;
using MediatR;

public record GetCategoryByIdQuery(int Id) : IRequest<CategoryDto?>;

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto?>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetCategoryByIdQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDto?> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id, cancellationToken);
        if (category is null)
        {
            return null;
        }

        var subCategories = await _categoryRepository.GetSubCategoriesAsync(category.Id, cancellationToken);

        var subCategoryDtos = subCategories.Select(c => new CategoryDto(
            c.Id,
            c.Name,
            c.ParentId,
            c.Level,
            c.FullPath,
            c.IsLeaf,
            c.ImageUrl ?? CategoryImageMapper.GetImageUrl(c.Name),
            c.IconUrl,
            c.IconSvg
        )).ToList();

        return new CategoryDto(
            category.Id,
            category.Name,
            category.ParentId,
            category.Level,
            category.FullPath,
            category.IsLeaf,
            category.ImageUrl ?? CategoryImageMapper.GetImageUrl(category.Name),
            category.IconUrl,
            category.IconSvg,
            subCategoryDtos
        );
    }
}
