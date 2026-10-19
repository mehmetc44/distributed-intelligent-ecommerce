namespace Catalog.Domain.Entities;

using Catalog.Domain.Primitives;

public class Category : Entity<int>
{
    private Category() { } // EF Core

    public Category(
        int id, 
        string name, 
        short level, 
        string fullPath, 
        int? parentId = null, 
        string? trendyolCatId = null, 
        bool? isLeaf = false,
        string? imageUrl = null,
        string? iconUrl = null,
        string? iconSvg = null) : base(id)
    {
        Name = name;
        ParentId = parentId;
        Level = level;
        FullPath = fullPath;
        TrendyolCatId = trendyolCatId;
        IsLeaf = isLeaf;
        ImageUrl = imageUrl;
        IconUrl = iconUrl;
        IconSvg = iconSvg;
    }

    public string Name { get; private set; }
    public int? ParentId { get; private set; } // Hiyerarşi (Taxonomy) için
    public short Level { get; private set; }
    public string FullPath { get; private set; }
    public string? TrendyolCatId { get; private set; }
    public bool? IsLeaf { get; private set; }
    public string? ImageUrl { get; private set; }
    public string? IconUrl { get; private set; }
    public string? IconSvg { get; private set; }
    public float[]? Embedding { get; private set; } // pgvector için float array
}
