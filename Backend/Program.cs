using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moram neki dugacki string uabciti da bi token dobro radio , eo i $ para"))
        };
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Moj API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorizacija koristeci bearer ",
        Name = "Autorizacija",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

// Svi se od svuda na sve moguæe naèine mogu spojitina naš API
// Èitati https://code-maze.com/aspnetcore-webapi-best-practices/
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});

builder.Services.AddAutoMapper(typeof(Program));

// Dodavanje baze podataka
builder.Services.AddDbContext<RibolovniDnevnikContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RibolovniDnevnikContext"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});

app.UseHttpsRedirection();

app.UseRouting();

// Use CORS
app.UseCors("CorsPolicy");

// Use authentication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
// Zavrsio za potrebe produkcije

app.Run();
