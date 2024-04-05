using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Project.DTOs;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(StoreContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }
// GET: api/Books
[HttpGet]
public async Task<ActionResult<IEnumerable<BookDetailDTO>>> GetBooks()
{
    _logger.LogInformation("Getting all books");
    var books = await _context.Books
                              .Include(b => b.BookAuthors)
                                .ThenInclude(ba => ba.Author)
                              .Include(b => b.BookGenres)
                                .ThenInclude(bg => bg.Genre)
                              .ToListAsync();

    var bookDetailDTOs = books.Select(book => new BookDetailDTO
    {
        BookId = book.BookId,
        Title = book.Title,
        Description = book.Description,
        Price = book.Price,
        AverageRating = book.AverageRating,
        ReviewCount = book.ReviewCount,
        CoverImageUrl = book.CoverImageUrl,
        Authors = book.BookAuthors.Select(ba => ba.Author.Name).ToList(),
        Genres = book.BookGenres.Select(bg => bg.Genre.Name).ToList()
    }).ToList();

    return bookDetailDTOs;
}

// GET: api/Books/5
[HttpGet("{id}")]
public async Task<ActionResult<BookDetailDTO>> GetBook(int id)
{
    _logger.LogInformation($"Getting book with id {id}");
    var book = await _context.Books
                             .Include(b => b.BookAuthors)
                                .ThenInclude(ba => ba.Author)
                             .Include(b => b.BookGenres)
                                .ThenInclude(bg => bg.Genre)
                             .FirstOrDefaultAsync(b => b.BookId == id);

    if (book == null)
    {
        _logger.LogWarning($"Book with id {id} not found");
        return NotFound();
    }

    var bookDetailDTO = new BookDetailDTO
    {
        BookId = book.BookId,
        Title = book.Title,
        Description = book.Description,
        Price = book.Price,
        AverageRating = book.AverageRating,
        ReviewCount = book.ReviewCount,
        CoverImageUrl = book.CoverImageUrl,
        Authors = book.BookAuthors.Select(ba => ba.Author.Name).ToList(),
        Genres = book.BookGenres.Select(bg => bg.Genre.Name).ToList()
    };

    return bookDetailDTO;
}

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                _logger.LogWarning($"Mismatched book id in PUT request. Expected {id}, but got {book.BookId}");
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating book with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating book with id {id}, but book does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating book with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _logger.LogInformation($"Creating new book");
            _context.Books.Add(book);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.BookId))
                {
                    _logger.LogWarning($"Attempted to create a book, but a book with id {book.BookId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            _logger.LogInformation($"Deleting book with id {id}");
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                _logger.LogWarning($"Book with id {id} not found");
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}