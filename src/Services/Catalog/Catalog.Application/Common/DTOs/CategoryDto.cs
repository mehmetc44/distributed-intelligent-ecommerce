namespace Catalog.Application.Common.DTOs;

public record CategoryDto(
    int Id,
    string Name,
    int? ParentId,
    short Level,
    string FullPath,
    bool? IsLeaf,
    string? ImageUrl = null,
    string? IconUrl = null,
    string? IconSvg = null,
    List<CategoryDto>? SubCategories = null
);
