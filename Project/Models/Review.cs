using System.Text.Json.Serialization;

namespace Project.Models;

public class Review
{
    public int ReviewId { get; set; }
    public string Headline { get; set; }
    public string ReviewText { get; set; }
    public int Rating { get; set; }
    public int BookId { get; set; }
    [JsonIgnore]
    public Book? Book { get; set; }
    public string UserId { get; set; } // Changed from int to string
    [JsonIgnore]
    public User? User { get; set; }
}