using System.Text.Json.Serialization;

namespace Project.Models;

public class BookOrder
{
    public int BookOrderId { get; set; }
    public int BookId { get; set; }
    [JsonIgnore]
    public Book? Book { get; set; }
    public int OrderId { get; set; }
    [JsonIgnore]
    public Order? Order { get; set; }
}