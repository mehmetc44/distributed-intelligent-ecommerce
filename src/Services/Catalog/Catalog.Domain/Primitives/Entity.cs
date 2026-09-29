namespace Catalog.Domain.Primitives;

/// <summary>
/// Tüm entity'lerin türediği temel sınıf.
/// Domain Event'leri toplar ve id yönetimini sağlar.
/// </summary>
public abstract class Entity<TId>
{
    private readonly List<IDomainEvent> _domainEvents = [];

    protected Entity(TId id)
    {
        Id = id;
    }

    // EF Core için parametresiz constructor
    protected Entity() { }

    public TId Id { get; private set; }

    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}

public abstract class Entity : Entity<Guid>
{
    protected Entity(Guid id) : base(id) { }
    protected Entity() { }
}
