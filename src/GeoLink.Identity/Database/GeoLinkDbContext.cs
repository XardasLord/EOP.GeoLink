using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GeoLink.Identity.Database;

public class GeoLinkDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    private const string IdentitySchema = "IDENTITY";

    public GeoLinkDbContext(DbContextOptions<GeoLinkDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasDefaultSchema(IdentitySchema);
    }
}