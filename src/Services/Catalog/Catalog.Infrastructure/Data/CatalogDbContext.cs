using Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Catalog.Infrastructure.Data;

public class CatalogDbContext : DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresExtension("vector");

        modelBuilder.Entity<Category>(builder =>
        {
            builder.ToTable("categories");

            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).HasColumnName("id").UseIdentityAlwaysColumn();
            
            builder.Property(c => c.ParentId).HasColumnName("parent_id");
            builder.Property(c => c.Name).HasColumnName("name").IsRequired();
            builder.Property(c => c.Level).HasColumnName("level").IsRequired();
            builder.Property(c => c.FullPath).HasColumnName("full_path").IsRequired();
            builder.Property(c => c.TrendyolCatId).HasColumnName("trendyol_cat_id");
            builder.Property(c => c.IsLeaf).HasColumnName("is_leaf").HasDefaultValue(false);
            builder.Property(c => c.Embedding)
                   .HasColumnName("embedding")
                   .HasColumnType("vector")
                   .HasConversion(
                       v => v == null ? null : new Pgvector.Vector(v),
                       v => v == null ? null : v.ToArray());
        });

        modelBuilder.Entity<Product>(builder =>
        {
            builder.ToTable("products");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).HasColumnName("id").UseIdentityAlwaysColumn();
            
            builder.Property(p => p.TrendyolId).HasColumnName("trendyol_id");
            builder.Property(p => p.CategoryId).HasColumnName("category_id");
            builder.Property(p => p.Name).HasColumnName("name").IsRequired();
            builder.Property(p => p.Brand).HasColumnName("brand");
            builder.Property(p => p.Gender).HasColumnName("gender");
            builder.Property(p => p.Color).HasColumnName("color");
            
            builder.OwnsOne(p => p.Price, pb =>
            {
                pb.Property(m => m.Amount).HasColumnName("price");
                pb.Property(m => m.Currency).HasColumnName("currency");
            });

            builder.Property(p => p.Rating).HasColumnName("rating");
            builder.Property(p => p.RatingCount).HasColumnName("rating_count");
            builder.Property(p => p.ReviewCount).HasColumnName("review_count");
            
            builder.Property(p => p.Images)
                   .HasColumnName("images")
                   .HasColumnType("jsonb")
                   .HasConversion(
                       v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                       v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null)!);
                       
            builder.Property(p => p.Attributes)
                   .HasColumnName("attributes")
                   .HasColumnType("jsonb")
                   .HasConversion(
                       v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                       v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, (JsonSerializerOptions?)null)!);
                       
            builder.Property(p => p.ProductUrl).HasColumnName("product_url");
        });
    }
}
