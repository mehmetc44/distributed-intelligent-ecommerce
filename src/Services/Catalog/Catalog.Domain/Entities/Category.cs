namespace Catalog.Domain.Entities;

using Catalog.Domain.Primitives;

public class Category : Entity
{
    private Category() { } // EF Core

    public Category(Guid id, string name, Guid? parentId = null) : base(id)
    {
        Name = name;
        ParentId = parentId;
    }

    public string Name { get; private set; }
    public Guid? ParentId { get; private set; } // Hiyerarşi (Taxonomy) için
}
