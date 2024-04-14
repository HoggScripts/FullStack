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
    public class BookGenresController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<BookGenresController> _logger;

        public BookGenresController(StoreContext context, ILogger<BookGenresController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/BookGenres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookGenre>>> GetBookGenres()
        {
            _logger.LogInformation("Getting all book genres");
            return await _context.BookGenres.ToListAsync();
        }

        // GET: api/BookGenres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookGenre>> GetBookGenre(int id)
        {
            _logger.LogInformation($"Getting book genre with id {id}");
            var bookGenre = await _context.BookGenres.FindAsync(id);

            if (bookGenre == null)
            {
                _logger.LogWarning($"Book genre with id {id} not found");
                return NotFound();
            }

            return bookGenre;
        }

        // PUT: api/BookGenres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookGenre(int id, BookGenre bookGenre)
        {
            if (id != bookGenre.BookId)
            {
                _logger.LogWarning($"Mismatched book genre id in PUT request. Expected {id}, but got {bookGenre.BookId}");
                return BadRequest();
            }

            _context.Entry(bookGenre).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating book genre with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookGenreExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating book genre with id {id}, but book genre does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating book genre with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookGenres
        [HttpPost]
        public async Task<ActionResult<BookGenre>> PostBookGenre(BookGenre bookGenre)
        {
            _logger.LogInformation($"Creating new book genre");
            _context.BookGenres.Add(bookGenre);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookGenreExists(bookGenre.BookId))
                {
                    _logger.LogWarning($"Attempted to create a book genre, but a book genre with id {bookGenre.BookId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookGenre", new { id = bookGenre.BookId }, bookGenre);
        }
        
        // POST: api/BookGenres/Multiple
        [HttpPost("Multiple")]
        public async Task<ActionResult<IEnumerable<BookGenre>>> PostMultipleBookGenres(IEnumerable<BookGenre> bookGenres)
        {
            _logger.LogInformation($"Creating new book genres");
            _context.BookGenres.AddRange(bookGenres);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (bookGenres.Any(bookGenre => BookGenreExists(bookGenre.GenreId)))
                {
                    _logger.LogWarning($"Attempted to create book genres, but one or more book genres with the same id already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookGenres", bookGenres.Select(bookGenre => new { id = bookGenre.GenreId }).ToList(), bookGenres);
        }

        // DELETE: api/BookGenres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookGenre(int id)
        {
            _logger.LogInformation($"Deleting book genre with id {id}");
            var bookGenre = await _context.BookGenres.FindAsync(id);
            if (bookGenre == null)
            {
                _logger.LogWarning($"Book genre with id {id} not found");
                return NotFound();
            }

            _context.BookGenres.Remove(bookGenre);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookGenreExists(int id)
        {
            return _context.BookGenres.Any(e => e.BookId == id);
        }
    }
}