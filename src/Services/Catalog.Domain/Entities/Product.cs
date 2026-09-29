namespace Catalog.Domain.Entities;

using Catalog.Domain.Primitives;
using Catalog.Domain.ValueObjects;
using Catalog.Domain.Events;

public class Product : Entity
{
    private readonly List<string> _images = [];

    private Product() { } // EF Core

    private Product(Guid id, string name, string description, Money price, Guid categoryId, bool isNew) 
        : base(id)
    {
        Name = name;
        Description = description;
        Price = price;
        CategoryId = categoryId;
        IsNew = isNew;
    }

    public string Name { get; private set; }
    public string Description { get; private set; }
    public Money Price { get; private set; }
    public Guid CategoryId { get; private set; }
    public bool IsNew { get; private set; }
    
    // Yalnızca okuma amaçlı liste, dışarıdan doğrudan Add() yapılamaz
    public IReadOnlyCollection<string> Images => _images.AsReadOnly();

    // Factory method (Nesne oluşturmanın tek yolu)
    public static Product Create(string name, string description, Money price, Guid categoryId, bool isNew = true)
    {
        var product = new Product(Guid.NewGuid(), name, description, price, categoryId, isNew);
        
        // Ürün oluştuğu an Domain Event fırlatıyoruz!
        product.RaiseDomainEvent(new ProductCreatedDomainEvent(product.Id));
        
        return product;
    }

    // İş mantığı (Business Logic) metodları
    public void UpdatePrice(Money newPrice)
    {
        Price = newPrice;
        // Burada ileride ProductPriceChangedDomainEvent fırlatılabilir
    }

    public void AddImage(string imageUrl)
    {
        if (string.IsNullOrWhiteSpace(imageUrl))
            throw new ArgumentException("Image URL cannot be empty");
            
        _images.Add(imageUrl);
    }
}
