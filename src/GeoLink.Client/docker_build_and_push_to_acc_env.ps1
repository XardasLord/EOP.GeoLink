# Builds and pushes docker image to test environment
docker build -f Dockerfile.acc -t geolink-client:test .
docker tag geolink-client:test host.docker.internal:5000/geolink/client:test
docker push host.docker.internal:5000/geolink/client:test

# ssh energa\01Z00644@fudo2.eite.energa.loc:266
