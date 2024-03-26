#!/bin/bash

URL="" # backend api url base

./attacks/ssh/bruteforce/ssh_bruteforce.sh

# wait until URL is accessible
echo "Checking accessibility of $URL ..."
while ! curl -Is "$URL" > /dev/null 2>&1; do
    echo "URL $URL is not yet online..."
    sleep 5
done

echo "URL $URL is online. Proceeding with the script..."
sleep 15 

python ./attacks/ssh/bruteforce/send_ssh_bruteforce_report.py

rm ./tmp.txt
