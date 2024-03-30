using System.Text.Json.Serialization;

namespace Project.Models;

public class Author
{
    public int AuthorId { get; set; }
    public string Name { get; set; }
    [JsonIgnore]
    public ICollection<BookAuthor>? BookAuthors { get; set; }
}