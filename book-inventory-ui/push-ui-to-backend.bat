@echo off

set arg1=%1
if '%arg1%'=='build' (
  echo Build Ui Project
  npm run build
  echo Done
  goto :Copy
)

:Copy
echo Copying Files Over
robocopy build ..\web-app\WebApp\wwwroot /MIR


cd ..\web-app\WebApp
dotnet build -c Release
dotnet publish -c Release

REM Docker must be up
REM Dockerfile must be in publish directory
heroku container:login
heroku apps:create corpus-inventory
docker build -t corpus-inventory C:\\PersonalProjects\\corpus-word-inventory\\web-app\\WebApp\\bin\\Release\\netcoreapp3.1\\publish
docker tag corpus-inventory registry.heroku.com/corpus-inventory/web
docker push registry.heroku.com/corpus-inventory/web
heroku container:release web --app corpus-inventory
heroku apps:open -a corpus-inventory

REM https://devhints.io/heroku
REM While Testing
docker build -t corpus-inventory C:\\PersonalProjects\\corpus-word-inventory\\web-app\\WebApp\\bin\\Release\\netcoreapp3.1\\publish --force-rm
docker tag corpus-inventory registry.heroku.com/corpus-inventory/web
docker push registry.heroku.com/corpus-inventory/web
heroku container:release web --app corpus-inventory
heroku apps:open -a corpus-inventory


heroku ps -a corpus-inventory
heroku ps:exec -a corpus-inventory