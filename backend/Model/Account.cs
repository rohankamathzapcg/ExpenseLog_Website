using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Account
    {
        [Key] 
        public string AccountNo { get; set; }
        public int Balance { get; set; }
        public string UserId {  get; set; }
        public User User { get; set; }
    }
}


