using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Expense
    {

        [Key] public int ExpenseId { get; set; }
        public DateTime ExpenseDate {  get; set; }
        public string Remarks {  get; set; }
        public int Amount {  get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
    }
}
