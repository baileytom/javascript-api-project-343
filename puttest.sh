#usr/bin/bash

curl --header "Content-Type: application/json" --request PUT --data @brad.json http://localhost:$1/$2
