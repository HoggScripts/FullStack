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
    public class BookOrdersController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<BookOrdersController> _logger;

        public BookOrdersController(StoreContext context, ILogger<BookOrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/BookOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookOrder>>> GetBookOrders()
        {
            _logger.LogInformation("Getting all book orders");
            return await _context.BookOrders.ToListAsync();
        }

        // GET: api/BookOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookOrder>> GetBookOrder(int id)
        {
            _logger.LogInformation($"Getting book order with id {id}");
            var bookOrder = await _context.BookOrders.FindAsync(id);

            if (bookOrder == null)
            {
                _logger.LogWarning($"Book order with id {id} not found");
                return NotFound();
            }

            return bookOrder;
        }

        // PUT: api/BookOrders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookOrder(int id, BookOrder bookOrder)
        {
            if (id != bookOrder.BookId)
            {
                _logger.LogWarning($"Mismatched book order id in PUT request. Expected {id}, but got {bookOrder.BookId}");
                return BadRequest();
            }

            _context.Entry(bookOrder).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating book order with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookOrderExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating book order with id {id}, but book order does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating book order with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookOrders
        [HttpPost]
        public async Task<ActionResult<BookOrder>> PostBookOrder(BookOrder bookOrder)
        {
            _logger.LogInformation($"Creating new book order");
            _context.BookOrders.Add(bookOrder);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookOrderExists(bookOrder.BookId))
                {
                    _logger.LogWarning($"Attempted to create a book order, but a book order with id {bookOrder.BookId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookOrder", new { id = bookOrder.BookId }, bookOrder);
        }

        // DELETE: api/BookOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookOrder(int id)
        {
            _logger.LogInformation($"Deleting book order with id {id}");
            var bookOrder = await _context.BookOrders.FindAsync(id);
            if (bookOrder == null)
            {
                _logger.LogWarning($"Book order with id {id} not found");
                return NotFound();
            }

            _context.BookOrders.Remove(bookOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookOrderExists(int id)
        {
            return _context.BookOrders.Any(e => e.BookId == id);
        }
    }
}