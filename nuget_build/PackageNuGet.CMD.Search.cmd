@ECHO off
SET scriptRoot=%~dp0

powershell.exe -ExecutionPolicy Unrestricted -NoExit .\PackageNuGet.Search.ps1 %scriptRoot%