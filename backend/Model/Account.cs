using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Account
    {
        [Key] 
        public string AccountNo { get; set; }
        public string BankName { get; set; }
        public string BranchName {  get; set; }
        public float Balance { get; set; }
        public string UserId {  get; set; }
        public User User { get; set; }

        
    }
}


