using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Income
    {
        [Key]
        public int IncomeId { get; set; }
        public DateTime IncomeDate { get; set; }
        public int amount { get; set; }
        public string remarks {  get; set; }
        public string EmailId { get; set; }
        public User User { get; set; }
        public string AccountNo { get; set; }
        public Account Account { get; set; }

    }
}
