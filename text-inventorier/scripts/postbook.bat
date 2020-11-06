@echo off

set arg1=%1

REM curl -X POST -d @postdata.json "http://localhost:5000/api/logs/new" --header "Content-Type:application/json"


set url=https://corpus-inventory.herokuapp.com/
if '%arg1%'=='local' (set url=http://localhost:5050)

curl -X POST -d @postbook.json "%url%/api/corpusinventory" --header "Content-Type:application/json"