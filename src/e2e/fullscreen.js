const webdriver = require('selenium-webdriver');
const By = webdriver.By;

var chromeCapabilities = webdriver.Capabilities.chrome();

var chromeOptions = {
    'args': ['--use-fake-ui-for-media-stream', '--start-maximized', '--test-type']
};

chromeCapabilities.set('chromeOptions', chromeOptions);

const driver = new webdriver.Builder()
    .withCapabilities(chromeCapabilities)
    .build();

driver.navigate().to('localhost:3000')
    .then(() => driver.findElement(By.css('#userName')).clear())
    .then(() => driver.findElement(By.css('#userName')).sendKeys("Sergio Rivas"))
    .then(() => driver.findElement(By.css('#sessionId')).clear())
    .then(() => driver.findElement(By.css('#sessionId')).sendKeys("Sesion 1"))
    .then(() => driver.findElement(By.css('#join-button')).click())
    .then(() => driver.sleep(2000))
    .then(() => driver.findElement(By.css('#cropfreebutton')).click())
    .then(() => driver.sleep(5000))
    .then(() => driver.findElement(By.css('#cropfreebutton')).click())
    .then(() => driver.sleep(1000))
    .then(() => driver.findElement(By.css('#callendbutton')).click())
    .then(() => driver.sleep(1000))
    .then(() => console.log("Funciona correctamente"))
    .then(() => driver.quit());