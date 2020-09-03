# Testing

We're now using Junit 5 tests with @Tag based groups.

In general we use the following tags:

## @Tag("integration")

Spring-context loading tests that require the integration database. Disabled by default.

## @Tag("selenium")

Tests that require the application to be running to execute Selenium Webdriver tests against it.
They also require the system property `webdriver.gecko.driver` to point to the [installation of 
the external gecko driver](https://github.com/mozilla/geckodriver).

## Running Tests

By default the maven test goal only executes the unit tests without executing tests marked with the groups above.

You can run integration or selenium tests by overriding the `automaton.tests.exclude` property 
(default is `integration,selenium`).

```shell script 
mvn -D automaton.tests.exclude=selenium clean test 
```                                               

Runs unit and integration tests.

```shell script 
mvn -D automaton.tests.exclude= -Dwebdriver.gecko.driver=<path-of-executable> clean test 
```                                               

if you set `<path-of-executable>` to the install location of the external gecko driver executable, maven will run all 
unit tests, integration tests and selenium tests.
---
## Junit 5 notes

Make sure to import und use the right annotation. `@Test`must be org.junit.jupiter.api.Test. 
(jupiter is the new Junit5 architecture).

Make sure not to use @BeforeClass/@AfterClass but use the new @BeforeAll/@AfterAll. 

Don't use the old SpringRunner. Use @ExtendWith(SpringExtension.class)

---
## Links
 * https://github.com/mozilla/geckodriver 

