using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebApp.Models;

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            CorpusInventoryModel.initCorpusInventoryModel();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            // Add no cors for localhost react
            app.Use(async (context, nextMiddleware) =>
            {
                context.Response.OnStarting(() =>
                {
                    // Allow reacts tests while in development
                    // context.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    return Task.FromResult(0);
                });
                await nextMiddleware();
            });



            // app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
