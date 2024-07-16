using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Expense
    {

        [Key] public int ExpenseId { get; set; }
        public DateTime ExpenseDate {  get; set; }
        public int CategoryId { get; set; } 
        public string EmailId {  get; set; }
        public string Remarks {  get; set; }
        public float Amount {  get; set; }
        public float NewBalance { get; set; }
        public string AccountNO {  get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
        public Account Account { get; set; }
    }
}
