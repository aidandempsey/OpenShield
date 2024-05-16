import requests
import sys
import pyrebase
import tkinter as tk
from tkinter import messagebox
import subprocess

config = {
  "apiKey": "AIzaSyBNSrC-2ZECAZ1WC19U9EGbPEkw16Nt9rQ",
  "authDomain": "openshield-ac772.firebaseapp.com",
  "databaseURL": "https://google.com",
  "storageBucket": "openshield-ac772.appspot.com"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

def login():
    global user
    email = email_entry.get()
    password = password_entry.get()
    user = auth.sign_in_with_email_and_password(email, password)
    clear_content()
    logged_in_content()
   
def logged_in_content():
    # Create content
    DISPLAY_NAME_LABEL = tk.Label(root, text=f"Welcome, {user['displayName']}", font=("Lato", 36), bg="#1E2123", fg="#19c37d")
    DISPLAY_NAME_LABEL.pack(pady=(100, 10), anchor="center")

    # Create penetration test button
    penetration_test_label = tk.Label(root, text="Perform an SSH brute force penetration test", font=("Lato", 24), bg="#1E2123", fg="#ececf1")
    penetration_test_label.pack(anchor="center")
    penetration_test_button = tk.Button(root, text="Penetration Test", command=penetration_test, font=("Lato", 24), bg="#19c37d", fg="#1E2123")
    penetration_test_button.pack(pady=10, anchor="center")

    # Create send report button
    send_report_label = tk.Label(root, text="Submit penetration test report to OpenShield", font=("Lato", 24), bg="#1E2123", fg="#ececf1")
    send_report_label.pack(anchor="center")
    send_report_button = tk.Button(root, text="Send Report", command=send_report, font=("Lato", 24), bg="#19c37d", fg="#1E2123")
    send_report_button.pack(pady=10, anchor="center")
    
# Function to clear existing content
def clear_content():
    for widget in root.winfo_children():
        widget.destroy()
        
def penetration_test():
    # Start the sshBruteForce.sh script and capture its output
    subprocess.call(['sh', './sshBruteForce.sh'])
        
def send_report():
    with open("./ssh_report.txt", "r") as file:
        lines = file.readlines()

    endpoint = sys.argv[1] + "/api/secure/incidents/createIncidentFromTemplate?template=sshBruteForce"  
    headers = {
        "Authorization": f"Bearer {user['idToken']}",
        "Content-Type": "application/json"
    }
    PORT_NUMBER=22
    IP_ADDRESS="192.168.99.1"
    device ="Raspberry Pi 3 Model B+"
    
    body = {
            "portNumber": PORT_NUMBER,
            "ipAddress": IP_ADDRESS,
            "compromisedUsername": lines[0].strip(),
            "compromisedPassword": lines[1].strip(),
            "device": device,
            "sshVersion": lines[2].strip(),
        }

    try:
        response = requests.post(endpoint, json=body, headers=headers)
        response.raise_for_status()
        print("Request sent successfully:", response.json())
    except requests.exceptions.HTTPError as err:
        print("HTTP error occurred:", err)
    except Exception as e:
        print("Error occurred:", e)

# Create main window
root = tk.Tk()
root.title("OpenShield")
root.geometry("800x800")  # Set window size
root.configure(background="#1E2123")  # Set background color

# Create title label
title_label = tk.Label(root, text="OpenShield", font=("Lato", 36),  bg="#1E2123", fg="#19c37d")
title_label.pack(pady=(100, 10), anchor="center")

# Create email label and entry
email_label = tk.Label(root, text="Email:", font=("Lato", 28),  bg="#1E2123", fg="#ececf1")
email_label.pack(pady=(100, 10), anchor="center")
email_entry = tk.Entry(root, font=("Lato", 28),  fg="#1E2123", bg="#ececf1")
email_entry.pack(pady=10, anchor="center")

# Create password label and entry
password_label = tk.Label(root, text="Password:", font=("Lato", 28), bg="#1E2123", fg="#ececf1")
password_label.pack(pady=10, anchor="center")
password_entry = tk.Entry(root, show="*", font=("Lato", 28),  fg="#1E2123", bg="#ececf1")
password_entry.pack(pady=10, anchor="center")

# Create login button
login_button = tk.Button(root, text="Login", command=login, font=("Lato", 28), bg="#19c37d", fg="#1E2123")
login_button.pack(pady=10, anchor="center")

# Run the main event loop
root.mainloop()