using System.Text.Json.Serialization;

namespace Project.Models;

public class Genre
{
    public int GenreId { get; set; }
    public string Name { get; set; }
    [JsonIgnore]
    public ICollection<BookGenre>? BookGenres { get; set; }
}