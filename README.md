# corpus-word-inventory
Project used to build an inventory of words in a corpus while keeping track of most frequent and longest words

## Setup Tests
```
https://blog.mwpreston.net/2018/09/24/how-to-run-c-sharp-in-visual-studio-code/
https://www.hanselman.com/blog/CommandLineUsingDotnetWatchTestForContinuousTestingWithNETCore10AndXUnitnet.aspx
https://docs.microsoft.com/en-us/dotnet/core/testing/selective-unit-tests
https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test
```

```
dotnet new sln -o unit-testing-using-dotnet-test
cd unit-testing-using-dotnet-test
dotnet new classlib -o PrimeService
ren .\PrimeService\Class1.cs PrimeService.cs
dotnet sln add ./PrimeService/PrimeService.csproj
dotnet new xunit -o PrimeService.Tests
dotnet add ./PrimeService.Tests/PrimeService.Tests.csproj reference ./PrimeService/PrimeService.csproj
dotnet sln add ./PrimeService.Tests/PrimeService.Tests.csproj

```


```
dotnet restore

dotnet build

dotnet test
dotnet watch test
dotnet test --filter Name~IsPrime
dotnet watch test --filter Name~IsPrime
```


## Potential Optimisations
https://www.codeproject.com/Articles/345105/Memory-Stream-Multiplexer-write-and-read-from-many
https://en.wikipedia.org/wiki/Heap_(data_structure)
https://www.studytonight.com/data-structures/bubble-sort