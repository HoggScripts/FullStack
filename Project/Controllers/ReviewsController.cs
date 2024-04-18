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
    public class ReviewsController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly ILogger<ReviewsController> _logger;

        public ReviewsController(StoreContext context, ILogger<ReviewsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            _logger.LogInformation("Getting all reviews");
            return await _context.Reviews.ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            _logger.LogInformation($"Getting review with id {id}");
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                _logger.LogWarning($"Review with id {id} not found");
                return NotFound();
            }

            return review;
        }
        
        // GET: api/Reviews/ByBook/5
        [HttpGet("ByBook/{bookId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByBookId(int bookId)
        {
            _logger.LogInformation($"Getting reviews for book with id {bookId}");
            var reviews = await _context.Reviews.Where(r => r.BookId == bookId).ToListAsync();

            if (reviews == null || !reviews.Any())
            {
                _logger.LogWarning($"No reviews found for book with id {bookId}");
                return NotFound();
            }

            return reviews;
        }

        // PUT: api/Reviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.ReviewId)
            {
                _logger.LogWarning($"Mismatched review id in PUT request. Expected {id}, but got {review.ReviewId}");
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                _logger.LogInformation($"Updating review with id {id}");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
                {
                    _logger.LogError($"Concurrency exception on updating review with id {id}, but review does not exist");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency exception on updating review with id {id}");
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reviews
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            _logger.LogInformation($"Creating new review");
            _context.Reviews.Add(review);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReviewExists(review.ReviewId))
                {
                    _logger.LogWarning($"Attempted to create a review, but a review with id {review.ReviewId} already exists");
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetReview", new { id = review.ReviewId }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            _logger.LogInformation($"Deleting review with id {id}");
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                _logger.LogWarning($"Review with id {id} not found");
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewId == id);
        }
    }
}