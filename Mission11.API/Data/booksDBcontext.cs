using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class booksDBcontext:DbContext
{
    public booksDBcontext(DbContextOptions<booksDBcontext> options) : base(options)
    {
    }
    public DbSet<Books> Books { get; set; }
}