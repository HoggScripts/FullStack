using System.Text.Json.Serialization;

namespace Project.Models;

public class BookGenre
{
    public int BookGenreId { get; set; }
    public int BookId { get; set; }
    [JsonIgnore]
    public Book? Book { get; set; }
    public int GenreId { get; set; }
    [JsonIgnore]
    public Genre? Genre { get; set; }
}