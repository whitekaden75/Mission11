using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("api/Books")]
[ApiController]
public class BookController : ControllerBase
{
    private booksDBcontext _context;
    public BookController(booksDBcontext config)
    {
        _context = config;
    }

    [HttpGet]
    public ActionResult<object> Get(int bookhowmany = 5, int pageNum = 1, string sortDirection = "asc", [FromQuery] List<string>? bookTypes = null)
    {
        // Start the query with books as the base
        var query = _context.Books.AsQueryable();

        // Apply category filter if bookTypes is provided
        if (bookTypes != null && bookTypes.Any())
        {
            query = query.Where(b => bookTypes.Contains(b.Category)); // Assuming 'Category' is the property name
        }

        // Apply sorting
        query = sortDirection.ToLower() == "asc"
            ? query.OrderBy(b => b.Title)
            : query.OrderByDescending(b => b.Title);

        // Calculate total books and total pages after filtering
        var totalBooks = query.Count();
        var totalPages = (int)Math.Ceiling((double)totalBooks / bookhowmany);

        // Fetch the books with pagination
        var books = query
            .Skip((pageNum - 1) * bookhowmany)
            .Take(bookhowmany)
            .ToList();

        // Return paginated, filtered, and sorted results
        return new
        {
            books = books,
            totalPages = totalPages,
            currentPage = pageNum,
            pageSize = bookhowmany,
            totalItems = totalBooks,
            sortDirection = sortDirection
        };
    }


    [HttpGet("GetBookTypes")]
    public ActionResult GetBookTypes()
    {
        var BookTypes = _context.Books.Select(p=>p.Category).Distinct().ToList();
        return Ok(BookTypes);
    }
    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Books book)
    {
        if (book == null)
        {
            return BadRequest("Book cannot be null");
        }

        _context.Books.Add(book);
        _context.SaveChanges();

        return Ok(book);
    }
    [HttpPut("UpdateBook/{BookId}")]
    public IActionResult UpdateBook(int BookId, [FromBody] Books book)
    {
        if (book == null || BookId != book.BookId)
        {
            return BadRequest("Book cannot be null and ID must match");
        }

        var existingBook = _context.Books.Find(BookId);
        if (existingBook == null)
        {
            return NotFound("Book not found");
        }

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Category = book.Category;
        existingBook.Price = book.Price;
        existingBook.Classification = book.Classification;
        existingBook.PageCount = book.PageCount;
        existingBook.Publisher = book.Publisher;
        existingBook.ISBN = book.ISBN;
        existingBook.PageCount = book.PageCount;

        _context.Books.Update(existingBook);

        _context.SaveChanges();

        return Ok(existingBook);
    }
    [HttpDelete("DeleteBook/{BookId}")]
    public IActionResult DeleteBook(int BookId)
    {
        var book = _context.Books.Find(BookId);
        if (book == null)
        {
            return NotFound("Book not found");
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
}