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
    public ActionResult<object> Get(int bookhowmany = 5, int pageNum = 1, string sortDirection = "asc")
    {
        // Apply sorting
        var query = sortDirection.ToLower() == "asc" 
            ? _context.Books.OrderBy(b => b.Title)
            : _context.Books.OrderByDescending(b => b.Title);
            
        var totalBooks = query.Count();
        var totalPages = (int)Math.Ceiling((double)totalBooks / bookhowmany);
        
        var books = query
            .Skip((pageNum - 1) * bookhowmany)
            .Take(bookhowmany)
            .ToList();
            
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
}