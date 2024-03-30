using System.Text.Json.Serialization;

namespace Project.Models;

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public double AverageRating { get; set; } // Rating aggregation
    public int ReviewCount { get; set; } // Rating aggregation
    [JsonIgnore]
    public ICollection<BookAuthor>? BookAuthors { get; set; }
    [JsonIgnore]
    public ICollection<BookGenre>? BookGenres { get; set; }
    [JsonIgnore]
    public ICollection<BookOrder>? BookOrders { get; set; }
    [JsonIgnore]
    public ICollection<Review>? BookReviews { get; set; }
}
