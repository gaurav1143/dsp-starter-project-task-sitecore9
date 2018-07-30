param($scriptRoot)

$ErrorActionPreference = "Stop"

$programFilesx86 = ${Env:ProgramFiles(x86)}
$msBuild = "$programFilesx86\MSBuild\14.0\bin\msbuild.exe"
$nuGet = "$scriptRoot\NuGet.exe"
$solution = "$scriptRoot\..\src\dspstarter.sln"

& $nuGet restore $solution
& $msBuild $solution /p:Configuration=Release /t:Rebuild /m

$FoundationAssembly = Get-Item "$scriptRoot\..\src\Features\TM\code\DSP.Feature.TemplatesModules\bin\DSP.Feature.TemplatesModules.dll" | Select-Object -ExpandProperty VersionInfo
$targetAssemblyVersion = $FoundationAssembly.ProductVersion

$serializationConfigFile = [xml](Get-Content "$scriptRoot\..\src\Features\TM\code\DSP.Feature.TemplatesModules\App_Config\Include\Feature\DSP.TemplatesModules.Serialization.config") 

$serializationConfigFile.configuration.sitecore.unicorn.configurations.configuration.targetDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Feature.TemplatesModules.$targetAssemblyVersion\serialization"

$serializationConfigFile.Save("$scriptRoot\..\src\Features\TM\code\DSP.Feature.TemplatesModules\App_Config\Include\Feature\DSP.TemplatesModules.Serialization.NuGet.config")

& $nuGet pack "$scriptRoot\DSP.Feature.TemplatesModules.nuspec" -version $targetAssemblyVersion 

Remove-Item "$scriptRoot\..\src\Features\TM\code\DSP.Feature.TemplatesModules\App_Config\Include\Feature\DSP.TemplatesModules.Serialization.NuGet.config"