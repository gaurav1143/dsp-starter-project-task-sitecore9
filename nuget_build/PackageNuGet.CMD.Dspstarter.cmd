@ECHO off
SET scriptRoot=%~dp0

powershell.exe -ExecutionPolicy Unrestricted -NoExit .\PackageNuGet.Dspstarter.ps1 %scriptRoot%