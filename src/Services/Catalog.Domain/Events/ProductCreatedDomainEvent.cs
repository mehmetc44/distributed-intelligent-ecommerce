namespace Catalog.Domain.Events;

using Catalog.Domain.Primitives;

public record ProductCreatedDomainEvent(Guid ProductId) : IDomainEvent;
