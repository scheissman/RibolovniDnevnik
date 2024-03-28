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
// Svi se od svuda na sve moguæe naèine mogu spojitina naš API
// Èitati https://code-maze.com/aspnetcore-webapi-best-practices/
builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});

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
app.UseCors("CorsPolicy");


// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
// zavrsio za potrebe produkcije

app.Run();