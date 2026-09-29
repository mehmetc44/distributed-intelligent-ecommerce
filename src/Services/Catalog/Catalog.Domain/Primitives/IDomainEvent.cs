namespace Catalog.Domain.Primitives;

/// <summary>
/// Tüm Domain Event'lerin uygulaması gereken marker interface.
/// MediatR bu interface üzerinden event'leri yakalar.
/// </summary>
public interface IDomainEvent;
