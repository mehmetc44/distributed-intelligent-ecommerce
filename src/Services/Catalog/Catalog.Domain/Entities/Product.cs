namespace Catalog.Domain.Entities;

using Catalog.Domain.Primitives;
using Catalog.Domain.ValueObjects;
using Catalog.Domain.Events;

public class Product : Entity<int>
{
    private readonly List<string> _images = [];

    private Product() { } // EF Core

    private Product(
        int id, 
        string name, 
        int? categoryId, 
        string? trendyolId, 
        string? brand, 
        string? gender, 
        string? color, 
        Money? price, 
        decimal? rating, 
        int? ratingCount, 
        int? reviewCount, 
        Dictionary<string, string>? attributes, 
        string? productUrl,
        IEnumerable<string>? images) 
        : base(id)
    {
        Name = name;
        CategoryId = categoryId;
        TrendyolId = trendyolId;
        Brand = brand;
        Gender = gender;
        Color = color;
        Price = price;
        Rating = rating;
        RatingCount = ratingCount;
        ReviewCount = reviewCount;
        Attributes = attributes ?? [];
        ProductUrl = productUrl;
        
        if (images != null)
        {
            _images.AddRange(images);
        }
    }

    public string? TrendyolId { get; private set; }
    public int? CategoryId { get; private set; }
    public string Name { get; private set; }
    public string? Brand { get; private set; }
    public string? Gender { get; private set; }
    public string? Color { get; private set; }
    public Money? Price { get; private set; }
    public decimal? Rating { get; private set; }
    public int? RatingCount { get; private set; }
    public int? ReviewCount { get; private set; }
    public Dictionary<string, string>? Attributes { get; private set; }
    public string? ProductUrl { get; private set; }
    
    // Yalnızca okuma amaçlı liste, dışarıdan doğrudan Add() yapılamaz
    public IReadOnlyCollection<string> Images => _images.AsReadOnly();

    // Factory method
    public static Product Create(
        string name, 
        int? categoryId = null, 
        string? trendyolId = null, 
        string? brand = null, 
        string? gender = null, 
        string? color = null, 
        Money? price = null, 
        decimal? rating = null, 
        int? ratingCount = null, 
        int? reviewCount = null, 
        Dictionary<string, string>? attributes = null, 
        string? productUrl = null,
        IEnumerable<string>? images = null)
    {
        // Not: ID PostgreSQL tarafında serial/identity ile atanacağı için burada 0 verebiliriz (EF Core yönetecek)
        var product = new Product(0, name, categoryId, trendyolId, brand, gender, color, price, rating, ratingCount, reviewCount, attributes, productUrl, images);
        
        // Ürün oluştuğu an Domain Event fırlatıyoruz!
        // Not: ID henüz 0. Gerçek ID DB'ye kaydettikten sonra belli olacak, ancak CQRS pattern'de ID generasyonu client-side (Guid) değilse,
        // event fırlatma işlemi SaveChanges sonrası dispatch edilebilir.
        product.RaiseDomainEvent(new ProductCreatedDomainEvent(product.Id));
        
        return product;
    }

    public void UpdatePrice(Money newPrice)
    {
        Price = newPrice;
    }

    public void AddImage(string imageUrl)
    {
        if (string.IsNullOrWhiteSpace(imageUrl))
            throw new ArgumentException("Image URL cannot be empty");
            
        _images.Add(imageUrl);
    }
}
