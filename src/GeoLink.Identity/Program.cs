using GeoLink.Identity.Authorization;
using GeoLink.Identity.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddGeoLinkAuthorization(builder.Configuration);

builder.Services.AddDbContext<GeoLinkDbContext>(options =>
{
    // 'Add-migration <name> -OutputDir Database\Migrations' - https://medium.com/oracledevs/using-oracle-database-with-asp-net-core-identity-3216fab69eb
    options.UseOracle(builder.Configuration.GetConnectionString("Identity"), 
        x => x.MigrationsHistoryTable("__EFMigrationsHistory", "IDENTITY"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();