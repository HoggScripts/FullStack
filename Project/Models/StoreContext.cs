using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Project.Models
{
    public class StoreContext : IdentityDbContext<User>
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
        public DbSet<RefreshToken> RefreshTokens { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // This is important!

            modelBuilder.Entity<BookAuthor>()
                .HasKey(ba => new { ba.BookId, ba.AuthorId });
            modelBuilder.Entity<BookGenre>()
                .HasKey(bg => new { bg.BookId, bg.GenreId });
            modelBuilder.Entity<BookOrder>()
                .HasKey(bo => new { bo.BookId, bo.OrderId });
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany() 
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade); 
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(x => new { x.LoginProvider, x.ProviderKey });
        }
    }
}