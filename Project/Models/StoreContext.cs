using Microsoft.EntityFrameworkCore;

namespace Project.Models;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions<StoreContext> options) : base(options) { }

    public DbSet<Author> Authors { get; set; } = default!;
    public DbSet<Book> Books { get; set; } = default!;
    public DbSet<BookAuthor> BookAuthors { get; set; } = default!;
    public DbSet<BookGenre> BookGenres { get; set; } = default!;
    public DbSet<Genre> Genres { get; set; } = default!;
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<BookOrder> BookOrders { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;
    public DbSet<Review> Reviews { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookAuthor>()
            .HasKey(ba => new { ba.BookId, ba.AuthorId });
        modelBuilder.Entity<BookGenre>()
            .HasKey(bg => new { bg.BookId, bg.GenreId });
        modelBuilder.Entity<BookOrder>()
            .HasKey(bo => new { bo.BookId, bo.OrderId });
        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany() // Replace with the navigation property from User to Review if it exists.
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade); // Adjust as necessary
    }
}