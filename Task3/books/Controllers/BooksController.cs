using Books.Models;
using Books.Services;
using Microsoft.AspNetCore.Mvc;

namespace books.Controllers
{
    public class BooksController : Controller
    {
        private readonly BookService _bookService;
        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("GetBooks")]
        public ActionResult<List<Book>> Get() => _bookService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = _bookService.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        [HttpPost("{id}")]
        public ActionResult<Book> Post(Book book)
        {
            _bookService.Add(book);
            return CreatedAtAction(nameof(Get), new { book.id },book);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Book book)
        {
            if (id != book.id)
            {
                return BadRequest();
            }
            var existingBook = _bookService.GetById(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            _bookService.Update(book);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _bookService.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            _bookService.Delete(id);
            return NoContent();
        }

    }
}
