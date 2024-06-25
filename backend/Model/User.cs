using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTracker.Model
{
    public class User
    {
        [Key]
        public string EmailID { get; set; }
        public string? FullName { get; set; } = null;
        public string? Password {  get; set; }
        public string? Occupation {  get; set; } = null;
        public int MonthlyIncome { get; set; } = 0;

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        public string ImageName { get; set; }
        public int Balance { get; set; } = 0;


    }
    
}
