namespace ExpenseTracker.Model
{
    public class CatMapUser
    {
        public int CategoryId { get; set; }
        public string EmailID { get; set; }
        public User User { get; set; }
        public Category category { get; set; }

    }
}
