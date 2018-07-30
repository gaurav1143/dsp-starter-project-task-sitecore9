param($scriptRoot)

$ErrorActionPreference = "Stop"

$programFilesx86 = ${Env:ProgramFiles(x86)}
$msBuild = "$programFilesx86\MSBuild\14.0\bin\msbuild.exe"
$nuGet = "$scriptRoot\NuGet.exe"
$solution = "$scriptRoot\..\src\dspstarter.sln"

& $nuGet restore $solution
& $msBuild $solution /p:Configuration=Release /t:Rebuild /m

$FoundationAssembly = Get-Item "$scriptRoot\..\src\Foundation\code\DSP.Foundation\bin\DSP.Foundation.dll" | Select-Object -ExpandProperty VersionInfo
$targetAssemblyVersion = $FoundationAssembly.ProductVersion

$serializationConfigFile = [xml](Get-Content "$scriptRoot\..\src\Foundation\code\DSP.Foundation\App_Config\Include\0_Foundation\DSP.Foundation.Serialization.config") 

$serializationConfigFile.configuration.sitecore.unicorn.configurations.configuration.targetDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Foundation.$targetAssemblyVersion\serialization"
$serializationConfigFile.configuration.sitecore.unicorn.configurations.configuration.roleDataStore.physicalRootPath = "`$(sourceFolder)\packages\DSP.Foundation.$targetAssemblyVersion\serialization\Roles"

$serializationConfigFile.Save("$scriptRoot\..\src\Foundation\code\DSP.Foundation\App_Config\Include\0_Foundation\DSP.Foundation.Serialization.NuGet.config")

& $nuGet pack "$scriptRoot\DSP.Foundation.nuspec" -version $targetAssemblyVersion 

Remove-Item "$scriptRoot\..\src\Foundation\code\DSP.Foundation\App_Config\Include\0_Foundation\DSP.Foundation.Serialization.NuGet.config"