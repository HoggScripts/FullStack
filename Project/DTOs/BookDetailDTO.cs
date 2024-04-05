namespace Project.DTOs;

public class BookDetailDTO
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public string CoverImageUrl { get; set; }
    public List<string> Authors { get; set; } = new List<string>();
    public List<string> Genres { get; set; } = new List<string>();
}
