using API.Entities;

namespace API;

public interface ITokenService{

    string CreateToken(AnmolUser user);
}