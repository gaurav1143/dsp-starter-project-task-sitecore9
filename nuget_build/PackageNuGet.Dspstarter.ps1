param($scriptRoot)

$ErrorActionPreference = "Stop"

$programFilesx86 = ${Env:ProgramFiles(x86)}
$msBuild = "$programFilesx86\MSBuild\14.0\bin\msbuild.exe"
$nuGet = "$scriptRoot\NuGet.exe"
$solution = "$scriptRoot\..\src\dspstarter.sln"

& $nuGet restore $solution
& $msBuild $solution /p:Configuration=Release /t:Rebuild /m

$FoundationAssembly = Get-Item "$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\bin\DSP.Site.Dspstarter.dll" | Select-Object -ExpandProperty VersionInfo
$targetAssemblyVersion = $FoundationAssembly.ProductVersion

$serializationConfigFile = [xml](Get-Content "$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.config") 
$serializationConfigFile.configuration.sitecore.unicorn.configurations.configuration.targetDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Site.Dspstarter.$targetAssemblyVersion\serialization"
$serializationConfigFile.Save("$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.NuGet.config")

$serializationContentConfigFile = [xml](Get-Content "$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.Content.config") 
$serializationContentConfigFile.configuration.sitecore.unicorn.configurations.configuration.targetDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Site.Dspstarter.$targetAssemblyVersion\serialization.content"
$serializationContentConfigFile.Save("$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.Content.NuGet.config")

& $nuGet pack "$scriptRoot\DSP.Site.Dspstarter.nuspec" -version $targetAssemblyVersion

Remove-Item "$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.NuGet.config"
Remove-Item "$scriptRoot\..\src\Sites\dspstarter\code\DSP.Site.Dspstarter\App_Config\Include\z_dspstarter\DSP.Site.Dspstarter.Serialization.Content.NuGet.config"