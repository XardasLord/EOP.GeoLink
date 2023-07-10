# Builds and pushes docker image to test environment
docker build -f Dockerfile.acc -t geolink-client:acc .
docker tag geolink-client:acc host.docker.internal:3000/geolink-client:acc
docker push host.docker.internal:3000/geolink-client:acc

# ssh energa\01Z00644@fudo2.eite.energa.loc:266
