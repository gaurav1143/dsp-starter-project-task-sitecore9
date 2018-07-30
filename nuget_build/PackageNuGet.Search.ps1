param($scriptRoot)

$ErrorActionPreference = "Stop"

$programFilesx86 = ${Env:ProgramFiles(x86)}
$msBuild = "$programFilesx86\MSBuild\14.0\bin\msbuild.exe"
$nuGet = "$scriptRoot\NuGet.exe"
$solution = "$scriptRoot\..\src\dspstarter.sln"

& $nuGet restore $solution
& $msBuild $solution /p:Configuration=Release /t:Rebuild /m

$FoundationAssembly = Get-Item "$scriptRoot\..\src\Features\Search\code\DSP.Feature.Search\bin\DSP.Feature.Search.dll" | Select-Object -ExpandProperty VersionInfo
$targetAssemblyVersion = $FoundationAssembly.ProductVersion

$serializationConfigFile = [xml](Get-Content "$scriptRoot\..\src\Features\Search\code\DSP.Feature.Search\App_Config\Include\Feature\DSP.Search.Serialization.config") 

$serializationConfigFile.configuration.sitecore.unicorn.configurations.configuration.targetDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Feature.Search.$targetAssemblyVersion\serialization"

$serializationConfigFile.Save("$scriptRoot\..\src\Features\Search\code\DSP.Feature.Search\App_Config\Include\Feature\DSP.Search.Serialization.NuGet.config")

& $nuGet pack "$scriptRoot\DSP.Feature.Search.nuspec" -version $targetAssemblyVersion

Remove-Item "$scriptRoot\..\src\Features\Search\code\DSP.Feature.Search\App_Config\Include\Feature\DSP.Search.Serialization.NuGet.config"