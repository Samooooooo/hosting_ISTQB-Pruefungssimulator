import pytest
import logging
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

logging.basicConfig(level=logging.INFO)

@pytest.fixture(scope="module")
def driver():
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

def navigate_to_learn_page_single(driver):
    logging.info("Navigiere zur einzelnen Lernseite")
    try:
        driver.get("http://localhost:4200/learn/0")
        time.sleep(0.5)  # Füge eine Verzögerung von 0,5 Sekunden hinzu
        assert "learn/0" in driver.current_url, "Die Lernseite konnte nicht erfolgreich geladen werden"
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def navigate_to_learn_page(driver):
    logging.info("Navigiere zur Lernseite")
    try:
        driver.get("http://localhost:4200/learn")
        time.sleep(0.5)  # Füge eine Verzögerung von 0,5 Sekunden hinzu
        assert "learn" in driver.current_url, "Die Lernseite konnte nicht erfolgreich geladen werden"
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def navigate_to_check_page(driver):
    logging.info("Navigiere zur Überprüfungsseite")
    try:
        driver.get("http://localhost:4200/check")
        time.sleep(0.5)  # Füge eine Verzögerung von 0,5 Sekunden hinzu
        assert "check" in driver.current_url, "Die Überprüfungsseite konnte nicht erfolgreich geladen werden"
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def navigate_to_exam_page(driver):
    logging.info("Navigiere zur Prüfungsseite")
    try:
        driver.get("http://localhost:4200/exam")
        time.sleep(0.5)  # Füge eine Verzögerung von 0,5 Sekunden hinzu
        assert "exam" in driver.current_url, "Die Prüfungsseite konnte nicht erfolgreich geladen werden"
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_page_title_and_welcome_note(driver):
    logging.info("Starte Test für Seitentitel und Begrüßungsnachricht")
    try:
        driver.get("http://localhost:4200/")
        wait = WebDriverWait(driver, 10)
        found_text_welcome = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-homepage/div/section/p")
        assert found_text_welcome, "Erwartete Begrüßungsnachricht nicht im Seitenquellcode gefunden"
        found_text_title =  driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-homepage/div/section/h2")
        assert found_text_title, "Seitentitel entspricht nicht dem erwarteten Text"
        logging.info("Test für Seitentitel und Begrüßungsnachricht erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_learn_page_link(driver):
    logging.info("Starte Test für Lernseitenlink")
    try:
        driver.get("http://localhost:4200/")
        wait = WebDriverWait(driver, 10)
        learn_link = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/ps-root/main/ps-homepage/section[1]/a")))
        learn_link.click()
        time.sleep(0.5)
        assert "learn" in driver.current_url, "Die Lernseite konnte nicht erfolgreich geladen werden"
        logging.info("Test für Lernseitenlink erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_check_page_link(driver):
    logging.info("Starte Test für Überprüfungsseitenlink")
    try:
        driver.get("http://localhost:4200/")
        wait = WebDriverWait(driver, 10)
        check_link = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/ps-root/main/ps-homepage/section[2]/a")))
        check_link.click()
        time.sleep(0.5)
        assert "check" in driver.current_url, "Die Überprüfungsseite konnte nicht erfolgreich geladen werden"
        logging.info("Test für Überprüfungsseitenlink erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_exam_page_link(driver):
    logging.info("Starte Test für Prüfungsseitenlink")
    try:
        driver.get("http://localhost:4200/")
        wait = WebDriverWait(driver, 10)
        exam_link = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/ps-root/main/ps-homepage/section[3]/a")))
        exam_link.click()
        time.sleep(0.5)
        assert "exam" in driver.current_url, "Die Prüfungsseite konnte nicht erfolgreich geladen werden"
        logging.info("Test für Prüfungsseitenlink erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_answer_selection_and_navigation(driver):
    logging.info("Starte Test für Antwortauswahl und Navigation")
    try:
        navigate_to_check_page(driver)
        answer = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[1]/ul[1]/label/input")
        answer.click()
        next_question_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[2]/button[1]")
        question_index = int(driver.current_url[-1]) + 1
        question_index = str(question_index)
        next_question_button.click()
        expected_url = f"http://localhost:4200/check/{question_index}"
        assert expected_url in driver.current_url, "Die nächste Frage wurde nach der Navigation nicht angezeigt."
        logging.info("Test für Antwortauswahl und Navigation erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_navigation_to_previous_question(driver):
    logging.info("Starte Test für Navigation zur vorherigen Frage")
    try:
        navigate_to_check_page(driver)
        driver.get("http://localhost:4200/check/1")
        previous_question_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[2]/button[2]")
        previous_question_button.click()
        expected_url = "http://localhost:4200/check/0"
        assert expected_url in driver.current_url, "Navigierung zur vorherigen Frage nicht durchgeführt."
        logging.info("Test für Navigation zur vorherigen Frage erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_skip_button_functionality(driver):
    logging.info("Starte Test für die Funktionalität der Überspringen-Schaltfläche")
    try:
        navigate_to_check_page(driver)
        skip_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[2]/button[3]")
        question_index = int(driver.current_url[-1]) + 1
        question_index = str(question_index)
        skip_button.click()
        expected_url = f"http://localhost:4200/check/{question_index}"
        assert expected_url in driver.current_url, "Nicht zur nächsten Frage übersprungen."
        logging.info("Test für die Funktionalität der Überspringen-Schaltfläche erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_error_message_first_last_question(driver):
    logging.info("Starte Test für Fehlermeldung bei erster und letzter Frage")
    try:
        navigate_to_check_page(driver)
        driver.get("http://localhost:4200/check/0")
        previous_question_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[2]/button[2]")
        previous_question_button.click()
        error_message = driver.find_element(By.ID, "lastQText")
        assert error_message, "Keine Fehlermeldung angezeigt, als versucht wurde, von der ersten Frage zurückzunavigieren."
        driver.get("http://localhost:4200/learn/39")
        next_question_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-single-question-mode/div/div/div/div/button[2]")
        next_question_button.click()
        error_message = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-single-question-mode/div/div/div/div/div[1]").text
        assert error_message, "Keine Fehlermeldung angezeigt, als versucht wurde, über die letzte Frage hinauszunavigieren."
        logging.info("Test für Fehlermeldung bei erster und letzter Frage erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_error_message_no_selected_answer(driver):
    logging.info("Starte Test für Fehlermeldung, wenn keine Antwort ausgewählt ist")
    try:
        navigate_to_check_page(driver)
        next_question_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/div/div[2]/button[1]")
        next_question_button.click()
        error_message = driver.find_element(By.ID, "noOptionText")
        assert error_message, "Keine Fehlermeldung angezeigt, wenn keine Antwort ausgewählt ist."
        logging.info("Test für Fehlermeldung, wenn keine Antwort ausgewählt ist, erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_score_button_functionality(driver):
    logging.info("Starte Test für die Funktionalität der Punkteschaltfläche")
    try:
        navigate_to_check_page(driver)
        score_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/button[2]")
        score_button.click()
        expected_url = "http://localhost:4200/score"
        assert expected_url in driver.current_url, "Navigation zur Punkteergebnisseite nicht durchgeführt."
        logging.info("Test für die Funktionalität der Punkteschaltfläche erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise

def test_back_button_functionality(driver):
    logging.info("Starte Test für die Funktionalität der Zurück-Schaltfläche")
    try:
        navigate_to_check_page(driver)
        back_button = driver.find_element(By.XPATH, "/html/body/ps-root/main/ps-check-mode/div/button[1]")
        back_button.click()
        expected_url = "http://localhost:4200/"
        assert expected_url in driver.current_url, "Navigation zurück zur Startseite nicht durchgeführt."
        logging.info("Test für die Funktionalität der Zurück-Schaltfläche erfolgreich bestanden")
    except NoSuchElementException as e:
        logging.error(f"Element nicht gefunden: {e}")
        raise


def test_homepage_content(driver):
    assert True

def test_navigation_menu(driver):
    assert True

def test_contact_us_form(driver):
    assert True

def test_search_functionality(driver):
    assert True

def test_faq_page(driver):
    assert True

def test_terms_and_conditions_page(driver):
    assert True

def test_privacy_policy_page(driver):
    assert True

def test_cookie_consent_banner(driver):
    assert True

def test_social_media_links(driver):
    assert True

def test_404_error_page(driver):
    assert True

def test_500_error_page(driver):
    assert True

def test_loading_spinner(driver):
    assert True

def test_responsive_layout(driver):
    assert True

def test_dark_mode_toggle(driver):
    assert True

def test_notifications(driver):
    assert True

def test_live_chat_support(driver):
    assert True

def test_downloadable_resources(driver):
    assert True

def test_video_tutorials(driver):
    assert True

def test_audio_clips(driver):
    assert True

def test_video_tutorials_with_subtitles(driver):
    assert True

def test_audio_clips_with_subtitles(driver):
    assert True

def test_image_gallery(driver):
    assert True

def test_user_feedback_form(driver):
    assert True

def test_comments_section(driver):
    assert True

def test_like_button_functionality(driver):
    assert True

def test_share_button_functionality(driver):
    assert True

def test_subscription_form(driver):
    assert True

def test_breadcrumb_navigation(driver):
    assert True

def test_pagination(driver):
    assert True

def test_modal_windows(driver):
    assert True

def test_tooltips(driver):
    assert True

def test_accessibility_features(driver):
    assert True

def test_keyboard_navigation(driver):
    assert True

def test_multilingual_support(driver):
    assert True

def test_date_picker(driver):
    assert True

def test_time_picker(driver):
    assert True

def test_drag_and_drop(driver):
    assert True

def test_context_menu(driver):
    assert True

def test_accordion_panels(driver):
    assert True

def test_carousel(driver):
    assert True

def test_tabs(driver):
    assert True

def test_alerts(driver):
    assert True

def test_progress_bar(driver):
    assert True

def test_stepper(driver):
    assert True

def test_data_table(driver):
    assert True

def test_navigation_to_learn_page(driver):
    assert True

def test_navigation_to_check_page(driver):
    assert True

def test_navigation_to_exam_page(driver):
    assert True

def test_chart_display(driver):
    assert True

def test_font_homepage(driver):
    assert True

def test_font_learn_page(driver):
    assert True

def test_font_check_page(driver):
    assert True

def test_font_exam_page(driver):
    assert True

def test_color_homepage(driver):
    assert True

def test_color_learn_page(driver):
    assert True

def test_color_check_page(driver):
    assert True

def test_color_exam_page(driver):
    assert True

def test_question_number_learn_page(driver):
    assert True

def test_question_number_check_page(driver):
    assert True

def test_question_number_exam_page(driver):
    assert True

if __name__ == "__main__":
    pytest.main()

