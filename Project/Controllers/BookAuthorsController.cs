using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookAuthorsController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<BookAuthorsController> _logger;

        public BookAuthorsController(StoreContext context, ILogger<BookAuthorsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/BookAuthors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookAuthor>>> GetBookAuthors()
        {
            _logger.LogInformation("Getting all book authors");
            return await _context.BookAuthors.ToListAsync();
        }

        // GET: api/BookAuthors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookAuthor>> GetBookAuthor(int id)
        {
            _logger.LogInformation($"Getting book author with id {id}");
            var bookAuthor = await _context.BookAuthors.FindAsync(id);

            if (bookAuthor == null)
            {
                _logger.LogWarning($"Book author with id {id} not found");
                return NotFound();
            }

            return bookAuthor;
        }

        // PUT: api/BookAuthors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookAuthor(int id, BookAuthor bookAuthor)
        {
            if (id != bookAuthor.BookId)
            {
                _logger.LogWarning($"Mismatched book author id in PUT request. Expected {id}, but got {bookAuthor.BookId}");
                return BadRequest();
            }

            _context.Entry(bookAuthor).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating book author with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookAuthorExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating book author with id {id}, but book author does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating book author with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookAuthors
        [HttpPost]
        public async Task<ActionResult<BookAuthor>> PostBookAuthor(BookAuthor bookAuthor)
        {
            _logger.LogInformation($"Creating new book author");
            _context.BookAuthors.Add(bookAuthor);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookAuthorExists(bookAuthor.BookId))
                {
                    _logger.LogWarning($"Attempted to create a book author, but a book author with id {bookAuthor.BookId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookAuthor", new { id = bookAuthor.BookId }, bookAuthor);
        }
        
        // POST: api/BookAuthors/Multiple
        [HttpPost("Multiple")]
        public async Task<ActionResult<IEnumerable<BookAuthor>>> PostMultipleBookAuthors(IEnumerable<BookAuthor> bookAuthors)
        {
            _logger.LogInformation($"Creating new book authors");
            _context.BookAuthors.AddRange(bookAuthors);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (bookAuthors.Any(bookAuthor => BookAuthorExists(bookAuthor.BookId)))
                {
                    _logger.LogWarning($"Attempted to create book authors, but one or more book authors with the same id already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookAuthors", bookAuthors.Select(bookAuthor => new { id = bookAuthor.BookId }).ToList(), bookAuthors);
        }
        
        // DELETE: api/BookAuthors/5/3
        [HttpDelete("{bookId}/{authorId}")]
        public async Task<IActionResult> DeleteBookAuthor(int bookId, int authorId)
        {
            _logger.LogInformation($"Deleting book author with bookId {bookId} and authorId {authorId}");
            var bookAuthor = await _context.BookAuthors.FindAsync(bookId, authorId);
            if (bookAuthor == null)
            {
                _logger.LogWarning($"Book author with bookId {bookId} and authorId {authorId} not found");
                return NotFound();
            }

            _context.BookAuthors.Remove(bookAuthor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/BookAuthors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookAuthor(int id)
        {
            _logger.LogInformation($"Deleting book author with id {id}");
            var bookAuthor = await _context.BookAuthors.FindAsync(id);
            if (bookAuthor == null)
            {
                _logger.LogWarning($"Book author with id {id} not found");
                return NotFound();
            }

            _context.BookAuthors.Remove(bookAuthor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookAuthorExists(int id)
        {
            return _context.BookAuthors.Any(e => e.BookId == id);
        }
    }
}