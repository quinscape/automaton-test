#!/bin/bash

cat $(dirname $0)/reset-corge.sql | psql -X -d automatontest

# Make sure to set automatontest.crsf.dev to true
curl -X POST http://localhost:8080/_dev/merge-service-flush
