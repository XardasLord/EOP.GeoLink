# Builds and pushes docker image to production environment
$version = Get-Content -Path .\src\app\version.ts | Select-String -Pattern "export const APP_VERSION" | ForEach-Object { $_ -replace "export const APP_VERSION = '|';", '' }

docker build -f Dockerfile.prod -t geolink-client:$version .
