using Backend.Models;

public interface IKorisnikService
{
    Task<List<Korisnik>> GetAllKorisniciAsync();
    Task<Korisnik> GetKorisnikByIdAsync(int id);
    Task<int> CreateKorisnikAsync(RecDto.KorisnikDto korisnikDto);
    Task<bool> UpdateKorisnikAsync(int id, RecDto.KorisnikDto korisnikDto);
    Task<bool> DeleteKorisnikAsync(int id);
}
