using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model.DTO
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public DateTime Date { get; set; }
        public float Amount { get; set; }
        public float NewBalance { get; set; }
        public string Remarks { get; set; }
        public string AccountNo { get; set; }
        public string EmailId { get; set; }
        public string Type { get; set; } // "Income" or "Expense"
    }

}
