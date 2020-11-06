curl -o .gitignore https://www.toptal.com/developers/gitignore/api/csharp,vscode

dotnet new sln
@REM dotnet new console -n ReportGenerator -o ReportGenerator
@REM dotnet new classlib -n ReportGenerator -o ReportGenerator
@REM dotnet new nunit -n ReportGenerator.Tests -o ReportGenerator.Tests
dotnet sln add .\Inventorier\TextInventorier.csproj
dotnet sln add .\Inventorier.NUnitTests\TextInventorier.NUnitTests.csproj
dotnet add .\Inventorier.NUnitTests\TextInventorier.NUnitTests.csproj reference .\Inventorier\TextInventorier.csproj


@REM Install Mongo driver
@REM ctrl+shift+p
@REM NuGet Package Manager: Add Package
@REM MongoDB.Driver
@REM 2.11.4


dotnet build
dotnet test 
dotnet restore 


@REM <ItemGroup>
@REM   <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="1.0.0" />
@REM </ItemGroup>
cd .\Inventorier.NUnitTests\
dotnet watch test


dotnet build
dotnet build --configuration Release

dotnet run

dotnet publish --configuration Release
dotnet publish --configuration Release