# Builds and pushes docker image to test environment
$version = Get-Content -Path .\src\app\version.ts | Select-String -Pattern "export const APP_VERSION" | ForEach-Object { $_ -replace "export const APP_VERSION = '|';", '' }

docker build -f Dockerfile.test -t geolink-client:$version .
docker tag geolink-client:$version 10.0.2.71:5000/geolink-client:$version
docker push 10.0.2.71:5000/geolink-client:$version

# ssh pkowalewicz@10.0.2.71
