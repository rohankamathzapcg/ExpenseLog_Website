using System.ComponentModel.DataAnnotations;

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
        public string? Photo {  get; set; } = null;
        public int Balance { get; set; } = 0;

    }
    
}
