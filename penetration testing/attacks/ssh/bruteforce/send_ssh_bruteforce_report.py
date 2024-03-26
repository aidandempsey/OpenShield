import requests
import socket

token = "" # firebase user auth JWT

ngrok_link = "" # backend api url base

# Open the file for reading
with open("./attacks/ssh/ssh_report.txt", "r") as file:
    # Read all lines from the file and store them in a list
    lines = file.readlines()
    
incident_id = 0
endpoint = ngrok_link
headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
# Function to send the JSON payload to the endpoint with Bearer token
def create_incident():
    global incident_id
    global endpoint 
    global headers
    endpoint = ngrok_link + "/api/secure/incidents/createIncident" 
        
    incidentName = "SSH Brute Force Attack Detected"
    incidentDescription = f"During a penetration test, it was found that your Raspberry Pi device is vulnerable to an SSH brute force attack.\nUsername: {lines[0]}\nPassword: {lines[1]}\nOpenSSH Version: {lines[2]}\nDuration of Attack: {lines[3]} seconds"
    
    data = {
        "incidentName": incidentName,
        "incidentDescription": incidentDescription,
        "incidentSeverity": "medium",
    }

    try:
        response = requests.post(endpoint, json=data, headers=headers)
        response.raise_for_status()
        response_data = response.json()
        incident_id = response_data['incidentId']
        print("Request sent successfully:", response.json())
    except requests.exceptions.HTTPError as err:
        print("HTTP error occurred:", err)
    except Exception as e:
        print("Error occurred:", e)
        
def create_tasks():
    global incident_id
    global endpoint 
    global headers 
    endpoint = ngrok_link + "/api/secure/tasks/createTask"
    task_names = [
    "Task 1: Change SSH Port",
    "Task 2: Generate SSH Key",
    "Task 3: Copy SSH Key to Another Device",
    "Task 4: Add Public Key to Pi's Authorized Keys",
    "Task 5: Disable Password Logins",
    "Task 6: Verify Connection"]

    task_descriptions = [
    "Modify the SSH port to enhance security. Open the SSH configuration file using \"sudo nano /etc/ssh/sshd_config\", change the port from Port 22 to Port 8123, save the file, and restart the SSH service with \"sudo service ssh restart\".",
    "Generate a 5120-bit SSH key for secure authentication. Run \"ssh-keygen -b 5120\" and save the key to /home/pi/mypi.pem.",
    "Transfer the SSH key to the Raspberry Pi device for authentication. Copy the key with \"scp -P 8123 /home/pi/mypi.pem pi@192.168.99.1:/home/pi/.ssh\" (password: pwnme!) and change key permissions with \"chmod 400 /home/pi/.ssh/mypi.pem\".",
    "Add the generated public key to the Pi's list of authorized keys with \"ssh-copy-id -i /home/pi/.ssh/mypi.pem.pub -p 8123 pi@192.168.99.1\" (password: pwnme!).",
    "Disable password logins for SSH access. Open the SSH configuration file with \"sudo nano /etc/ssh/sshd_config\", set ChallengeResponseAuthentication, PasswordAuthentication, and UsePAM to no, save the file, and restart the SSH service with \"sudo service ssh restart\".",
    "Ensure successful SSH login using the configured settings. Use SSH to log in with \"ssh -i /home/pi/mypi.pem -p 8123 pi@192.168.99.1\" (password: pwnme!)."]
    
    for i in range(6):
        data = {
            "taskName": task_names[i],
            "taskDescription": task_descriptions[i],
            "incidentId": incident_id,
            "assignedUserId": "LYt1ohqu4Ef4TNypIykYNkDUeDR2"
        }

        try:
            response = requests.post(endpoint, json=data, headers=headers)
            response.raise_for_status()
            response_data = response.json()
            incident_id = response_data['incidentId']
            print("Request sent successfully:", response.json())
        except requests.exceptions.HTTPError as err:
            print("HTTP error occurred:", err)
        except Exception as e:
            print("Error occurred:", e)
	

# Send the request
create_incident()
create_tasks()
