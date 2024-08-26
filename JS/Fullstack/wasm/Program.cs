using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using wasm;
using Blazorise;
using Blazorise.Tailwind;
using Blazorise.Icons.FontAwesome;


var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services
    .AddBlazorise()
    .AddTailwindProviders()
    .AddFontAwesomeIcons();
await builder.Build().RunAsync();
