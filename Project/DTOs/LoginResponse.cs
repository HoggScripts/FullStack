namespace Project.DTOs;

public class LoginResponse
{
    public string Token { get; set; }
    public string RefreshToken { get; set; } 
    public string Email { get; set; }
    public string UserName { get; set; }
    public IList<string> Roles { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}