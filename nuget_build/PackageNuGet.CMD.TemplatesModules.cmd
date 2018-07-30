@ECHO off
SET scriptRoot=%~dp0

powershell.exe -ExecutionPolicy Unrestricted -NoExit .\PackageNuGet.TemplatesModules.ps1 %scriptRoot%