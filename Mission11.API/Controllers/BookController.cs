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

    public IEnumerable<Books> Get()
    {
        return _context.Books.ToList();
    }
}