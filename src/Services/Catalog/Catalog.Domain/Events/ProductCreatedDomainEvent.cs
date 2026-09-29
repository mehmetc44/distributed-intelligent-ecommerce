namespace Catalog.Domain.Events;

using Catalog.Domain.Primitives;

public record ProductCreatedDomainEvent(int ProductId) : IDomainEvent;
