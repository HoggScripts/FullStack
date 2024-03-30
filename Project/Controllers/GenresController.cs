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
    public class GenresController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<GenresController> _logger;

        public GenresController(StoreContext context, ILogger<GenresController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Genres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {
            _logger.LogInformation("Getting all genres");
            return await _context.Genres.ToListAsync();
        }

        // GET: api/Genres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenre(int id)
        {
            _logger.LogInformation($"Getting genre with id {id}");
            var genre = await _context.Genres.FindAsync(id);

            if (genre == null)
            {
                _logger.LogWarning($"Genre with id {id} not found");
                return NotFound();
            }

            return genre;
        }

        // PUT: api/Genres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenre(int id, Genre genre)
        {
            if (id != genre.GenreId)
            {
                _logger.LogWarning($"Mismatched genre id in PUT request. Expected {id}, but got {genre.GenreId}");
                return BadRequest();
            }

            _context.Entry(genre).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating genre with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenreExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating genre with id {id}, but genre does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating genre with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Genres
        [HttpPost]
        public async Task<ActionResult<Genre>> PostGenre(Genre genre)
        {
            _logger.LogInformation($"Creating new genre");
            _context.Genres.Add(genre);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GenreExists(genre.GenreId))
                {
                    _logger.LogWarning($"Attempted to create a genre, but a genre with id {genre.GenreId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGenre", new { id = genre.GenreId }, genre);
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            _logger.LogInformation($"Deleting genre with id {id}");
            var genre = await _context.Genres.FindAsync(id);
            if (genre == null)
            {
                _logger.LogWarning($"Genre with id {id} not found");
                return NotFound();
            }

            _context.Genres.Remove(genre);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GenreExists(int id)
        {
            return _context.Genres.Any(e => e.GenreId == id);
        }
    }
}