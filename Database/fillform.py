from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random

# Path to the chromedriver executable
service = Service("D:/chrome_driver/chromedriver-win64/chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_experimental_option('detach', True)

# URL of the Google Form
form_url = "https://forms.office.com/pages/responsepage.aspx?id=gnzLDoQbNkut7yCBtcESW3M9doAEb99OhMfF7ToRUJlUQ0FaSkdSNTFIVFIyQzJGWFZIRllYQ1lLRS4u&route=shorturl"  # Replace with your actual form URL
# Initialize the WebDriver
driver = webdriver.Chrome(service=service, options=options)
driver.get(form_url)


try:
    wait = WebDriverWait(driver, 5)

    for i in range(5):

        # Wait for the form to load and find all question sections
        questionsElements = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "css-50")))
        questionsElements_table = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "-oF-95")))


        for individual_element in questionsElements[:-1]:
            radio_buttons = individual_element.find_elements(By.CLASS_NAME, '-a-73')
            question = individual_element.find_element(By.CLASS_NAME,'-P-54')
            twoChoices = False

            if "มากกว่า" in question.text:
                twoChoices = True

            # Example: Select a random radio button in the section
            if twoChoices:
                two_buttons = random.sample(radio_buttons[:-1], 2)  # Randomly select 2 unique buttons
                for button in two_buttons:
                    button.click()
            elif question.text == "อายุของท่าน":
                random_button = random.choice(radio_buttons[2:-1])
                random_button.click()
                
            else:
                random_button = random.choice(radio_buttons[:-1])
                random_button.click()

        
        for individual_table_element in questionsElements_table:
            radio_buttons = individual_table_element.find_elements(By.CLASS_NAME, '-a-73')
            random_button = random.choice(radio_buttons[:-2])
            random_button.click()
        
        submit_button = driver.find_element(By.XPATH , '//*[@id="form-main-content1"]/div/div/div[2]/div[3]/div/button')
        # submit_button.click()
        submit_button.click()

        print("Successfully sent form")

        wait.until(EC.presence_of_all_elements_located((By.XPATH, '//*[@id="form-main-content1"]/div/div/div[2]/div[1]/div[2]/div[4]/span')))
        add_more_form = driver.find_element(By.XPATH , '//*[@id="form-main-content1"]/div/div/div[2]/div[1]/div[2]/div[4]/span')
        add_more_form.click()

    
finally:
    print('Successfully interacted with the form.')
    # Optionally, you can close the browser or keep it open
    # driver.quit()  # Uncomment this if you want to close the browser at the end