#usr/bin/bash

curl --header "Content-Type: application/json" --request POST --data @jason.json http://localhost:$1/
