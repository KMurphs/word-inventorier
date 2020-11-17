@echo off


@REM cd ..

@REM Usage push-ui-to-backend.bat
@REM Usage push-ui-to-backend.bat build
set arg1=%1
if '%arg1%'=='build' (
  echo Build Ui Project
  npm run build
  echo Done
  goto :Copy
)

@REM echo Build Ui Project
@REM cd ..\ui && npm run build



@REM Copy ui build files to webapp public folder
:Copy
echo Copying Files Over
robocopy ..\ui\build ..\text-inventorier\WebApp\wwwroot /MIR
robocopy ..\text-inventorier ..\text-inventorier\WebApp\bin\Release\netcoreapp3.1\publish "DockerFile"


@REM Build and pblish web app project
cd ..\text-inventorier\WebApp
dotnet build -c Release
dotnet publish -c Release


@REM Push Applciation in docker container, then push container to heroku
REM Docker must be up
REM Dockerfile must be in publish directory
REM heroku container:login
REM heroku apps:create corpus-inventory
REM docker build -t corpus-inventory C:\\PersonalProjects\\corpus-word-inventory\\web-app\\WebApp\\bin\\Release\\netcoreapp3.1\\publish
REM docker tag corpus-inventory registry.heroku.com/corpus-inventory/web
REM docker push registry.heroku.com/corpus-inventory/web
REM heroku container:release web --app corpus-inventory
REM heroku apps:open -a corpus-inventory

REM https://devhints.io/heroku
REM While Testing
docker build -t corpus-inventory "bin\\Release\\netcoreapp3.1\\publish" --force-rm
docker tag corpus-inventory registry.heroku.com/corpus-inventory/web
docker push registry.heroku.com/corpus-inventory/web
heroku container:release web --app corpus-inventory
heroku apps:open -a corpus-inventory


heroku ps -a corpus-inventory
heroku ps:exec -a corpus-inventory