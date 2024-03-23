using Backend.Data;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using AutoMapper;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IKorisnikService, KorisnikService>();
//dodavanje baze podataka
builder.Services.AddDbContext<RibolovniDnevnikContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("RibolovniDnevnikContext"));
});





var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
// zavrsio za potrebe produkcije

app.Run();