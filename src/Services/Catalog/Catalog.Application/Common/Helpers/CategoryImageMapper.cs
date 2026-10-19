namespace Catalog.Application.Common.Helpers;

public static class CategoryImageMapper
{
    private static readonly Dictionary<string, string> CategoryImages = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Elektronik"] = "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&auto=format&fit=crop",
        ["Giyim"] = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=300&auto=format&fit=crop",
        ["Spor&Outdoor"] = "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=300&auto=format&fit=crop",
        ["Kozmetik & Kişisel Bakım"] = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop",
        ["Kitap"] = "https://images.unsplash.com/photo-1495640388908-05fd9218f705?q=80&w=300&auto=format&fit=crop",
        ["Anne & Bebek & Çocuk"] = "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=300&auto=format&fit=crop",
        ["Süpermarket"] = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop",
        ["Ev ve Mobilya"] = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop",
        ["Ayakkabı"] = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop",
        ["Kadın"] = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop",
        ["Erkek"] = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop",
        ["Aksesuar"] = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=300&auto=format&fit=crop",
        ["Otomobil & Motosiklet"] = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&auto=format&fit=crop",
        ["Bahçe & Yapı Market"] = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=300&auto=format&fit=crop",
        ["Hobi"] = "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=300&auto=format&fit=crop",
        ["Çocuk"] = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=300&auto=format&fit=crop",
        ["Kırtasiye & Ofis Malzemeleri"] = "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=300&auto=format&fit=crop"
    };

    public static string? GetImageUrl(string categoryName)
    {
        if (CategoryImages.TryGetValue(categoryName, out var url))
        {
            return url;
        }

        // Kısmi eşleşme kontrolü (örn. "Spor" aranırsa "Spor&Outdoor" bulsun)
        foreach (var (key, value) in CategoryImages)
        {
            if (categoryName.Contains(key, StringComparison.OrdinalIgnoreCase) ||
                key.Contains(categoryName, StringComparison.OrdinalIgnoreCase))
            {
                return value;
            }
        }

        return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=300&auto=format&fit=crop"; // Varsayılan alışveriş görseli
    }
}
