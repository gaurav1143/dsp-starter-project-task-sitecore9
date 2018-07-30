@ECHO off
SET scriptRoot=%~dp0

powershell.exe -ExecutionPolicy Unrestricted -NoExit .\PackageNuGet.Foundation.ps1 %scriptRoot%