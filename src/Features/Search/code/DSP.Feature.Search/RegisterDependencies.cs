using DSP.Foundation.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Feature.Search
{
    public class RegisterDependencies : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddMvcControllersInCurrentAssembly();
        }
    }
}