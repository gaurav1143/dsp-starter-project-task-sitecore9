using DSP.Foundation.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace DSP.Feature.TemplatesModules.DependencyInjection
{
    public class RegisterDependencies : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddRenderingsInCurrentAssembly();
            serviceCollection.AddMvcControllersInCurrentAssembly();
        }
    }
}