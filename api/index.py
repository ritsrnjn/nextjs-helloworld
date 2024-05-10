from flask_cors import CORS
from flask import Flask, render_template, request, redirect, url_for, jsonify
from multiprocessing import Process
from selenium.webdriver.common.by import By
import time
import hashlib
from selenium import webdriver
import send_email

app = Flask(__name__)
# enable cors
CORS(app)

@app.route("/api/python")
def hello_world():
    print("Request received!")
    # return json response
    return jsonify({"message": "Hello Ritesh!"})


# Dictionaries to store URLs and their corresponding processes
urls = {}
processes = {}

def get_driver():
    return webdriver.Chrome()

def get_content_hash(driver, url, css_selector):
    """Use Selenium to get the content hash of the element specified by the css_selector."""
    driver.maximize_window()
    driver.get(url)
    print("ankita1")
    time.sleep(10)  # Wait for JavaScript to load the content
    print("ankita2")
    element = driver.find_element(By.CSS_SELECTOR, css_selector)
    print("ankita3")
    content = element.text
    print("ankita4")
    return hashlib.md5(content.encode()).hexdigest()


def monitor(url):
    driver = get_driver()
    url['current_hash'] = get_content_hash(driver, url['url'], url['css_selector'])
    print("ankita")
    try:
        while True:
            time.sleep(url['interval'])
            new_hash = get_content_hash(driver, url['url'], url['css_selector'])
            if new_hash != url['current_hash']:
                url['current_hash'] = new_hash
                url['status'] = 'Change detected'
                send_email.send_email("Change Detected", f"Change detected at {url['url']}")
                print('Change detected in', url['url'])
            else:
                url['status'] = 'No change detected'
                send_email.send_email("No Change Detected", f"No change detected at {url['url']}")
                print('No change detected in', url['url'])
    finally:
        driver.quit()


@app.route("/api/tracker", methods=['GET', 'POST'])
def tracker():
    if request.method == 'POST':
        print("Request received! for tracker")
        url = {
            'url': request.json['url'],
            'css_selector': ".border-primary",
            'interval': 10,
            'current_hash': None,
            'status': 'Not started'
        }
        urls[url['url']] = url
        p = Process(target=monitor, args=(url,))
        p.start()
        processes[url['url']] = p
    return "Tracker started"


# def tracker_list():
#     return render_template('tracker-list.html', urls=urls.values())


# def stop(url):
#     if url in processes:
#         processes[url].terminate()
#         del processes[url]
#         urls[url]['status'] = 'Stopped'
#     return redirect(url_for('/tracker/list'))





if __name__ == "__main__":
    app.run(debug=True)
