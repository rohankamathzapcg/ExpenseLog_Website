using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Transaction
    {
        [Key] 
        public int TransId { get; set; }
        public DateTime TransDate {  get; set; }
        public bool IncomeExpense {  get; set; }
        public string Remarks {  get; set; }
        public int Amount {  get; set; }
        public User User { get; set; }
    }
}
