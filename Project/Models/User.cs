using Microsoft.AspNetCore.Identity;

namespace Project.Models;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
}