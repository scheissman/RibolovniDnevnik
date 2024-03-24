using Backend.Models;

public interface IKorisnikService
{
    Task<List<Korisnik>> GetAllKorisniciAsync();
    Task<Korisnik> GetKorisnikByIdAsync(int id);
    Task<int> CreateKorisnikAsync(DtoRec.KorisnikDto korisnikDto);
    Task<bool> UpdateKorisnikAsync(int id, DtoRec.KorisnikDto korisnikDto);
    Task<bool> DeleteKorisnikAsync(int id);
}
