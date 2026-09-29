namespace Catalog.Domain.ValueObjects;

using Catalog.Domain.Primitives;

public class Money : ValueObject
{
    public decimal Amount { get; }
    public string Currency { get; }

    // EF Core için private constructor
    private Money() { }

    public Money(decimal amount, string currency)
    {
        if (amount < 0)
            throw new ArgumentException("Amount cannot be negative", nameof(amount));
            
        if (string.IsNullOrWhiteSpace(currency))
            throw new ArgumentException("Currency cannot be empty", nameof(currency));

        Amount = amount;
        Currency = currency;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }

    public override string ToString() => $"{Amount:N2} {Currency}";
}
