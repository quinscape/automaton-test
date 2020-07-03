package de.quinscape.automatontest;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.springframework.test.context.junit.jupiter.EnabledIf;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

/**
 * Example of a selenium integration-test with gecko-driver
 */
@EnabledIf(expression ="#{ systemProperties['spring.profiles.active'] === 'integration-test' && systemProperties['webdriver.gecko.driver'] !== '' }")
public class SeleniumTest
{
    private static FirefoxDriver driver;

    @BeforeClass
    public static void initDriver()
    {
        final FirefoxOptions options = new FirefoxOptions();
        options.setCapability("marionette", true);
        driver = new FirefoxDriver(options);
    }

    @AfterClass
    public static void deinitDriver()
    {
        driver.close();
    }

    @Test
    public void testSelenium()
    {

        driver.navigate().to("http://localhost:8080/shipping/fk-test");


        login(driver, "admin");

        final WebElement titleElem = driver.findElementByXPath("//h1[text()=\"[CRUD List]\"]");
        assertThat(titleElem, is(notNullValue()));
    }


    private void login(FirefoxDriver driver, String name)
    {
        final WebElement usernameField = driver.findElementByName("username");
        usernameField.sendKeys(name);
        final WebElement passwordField = driver.findElementByName("password");
        passwordField.sendKeys(name);

        driver.findElementByXPath("//button[text()=\"Submit\"]").click();
    }
}
