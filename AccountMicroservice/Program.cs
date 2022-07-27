using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Reflection;


namespace AccountMicroservice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var log4netRepository = log4net.LogManager.GetRepository(Assembly.GetEntryAssembly());
            log4net.Config.XmlConfigurator.Configure(log4netRepository, new FileInfo("log4net.config"));

            CreateHostBuilder(args).Build().Run();



        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()


                   .ConfigureLogging((hostingContext, logging) =>

                   {

                       logging.AddLog4Net();

                       logging.SetMinimumLevel(LogLevel.Error);

                   });

                });


    }
}
