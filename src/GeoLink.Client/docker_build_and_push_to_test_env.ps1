# Builds and pushes docker image to test environment
docker build -f Dockerfile.test -t geolink-client:test .
docker tag geolink-client:test 10.0.2.71:5000/geolink/client:test
docker push 10.0.2.71:5000/geolink/client:test

# ssh pkowalewicz@10.0.2.71
