# Builds and runs docker image on local PC
docker build -f Dockerfile.dev -t geolink-client:dev .
docker run -d -it -p 8001:80/tcp --name geolink-client geolink-client:dev
