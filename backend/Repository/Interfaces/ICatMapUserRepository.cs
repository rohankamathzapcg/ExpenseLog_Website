using ExpenseTracker.Model;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface ICatMapUserRepository
    {
        Task<List<CatMapUserDTO>> AddAsync(List<CatMapUserDTO> cat);
    }
}
