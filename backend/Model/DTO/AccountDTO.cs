using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model.DTO
{
    public class AccountDTO
    { 
        public string AccountNo { get; set; }
        public int Balance { get; set; }
        public string EmailID { get; set; }
     }
}
