using System.Text.Json.Serialization;

namespace Project.Models;

public class Order
{
    public int OrderId { get; set; }
    public double OrderTotal { get; set; }
    public string UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
    [JsonIgnore]
    public ICollection<BookOrder>? BookOrders { get; set; }
}
