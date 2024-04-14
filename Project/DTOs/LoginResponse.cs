namespace Project.DTOs;

public class LoginResponse
{
    public string Token { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public IList<string> Roles { get; set; }
    // Include any other user details you want to return
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // You can add more fields as needed
}
