using System.ComponentModel.DataAnnotations;

namespace Mission11.API.Data;

public class Books
{
    [Key]
    public int BookId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Publisher { get; set; }
    public string ISBN { get; set; }
    public string Classification { get; set; }
    public string Category { get; set; }
    public int PageCount { get; set; }
    public float Price { get; set; }
    
}