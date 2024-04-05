namespace Project.Models;

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public double AverageRating { get; set; } 
    public int ReviewCount { get; set; } 
    public string CoverImageUrl { get; set; } 
    public ICollection<BookAuthor>? BookAuthors { get; set; }
    public ICollection<BookGenre>? BookGenres { get; set; }
    public ICollection<BookOrder>? BookOrders { get; set; }
    public ICollection<Review>? BookReviews { get; set; }
}
