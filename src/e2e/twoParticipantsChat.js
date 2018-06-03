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
    
const webdriver2 = require('selenium-webdriver');
const By2 = webdriver2.By2;

var chromeCapabilities2 = webdriver2.Capabilities.chrome();

var chromeOptions2 = {
    'args': ['--use-fake-ui-for-media-stream', '--start-maximized', '--test-type']
};

chromeCapabilities2.set('chromeOptions', chromeOptions2);

const driver2 = new webdriver2.Builder()
    .withCapabilities(chromeCapabilities2)
    .build();

driver.navigate().to('localhost:3000')
    .then(() => driver2.navigate().to('localhost:3000'))
    //Iniciamos sesion con el primer participante
    .then(() => driver.findElement(By.css('#userName')).clear())
    .then(() => driver.sleep(1000))
    .then(() => driver.findElement(By.css('#userName')).sendKeys("Sergio Rivas 1"))
    .then(() => driver.findElement(By.css('#sessionId')).clear())
    .then(() => driver.sleep(1000))
    .then(() => driver.findElement(By.css('#sessionId')).sendKeys("Sesion 1"))
    .then(() => driver.findElement(By.css('#join-button')).click())
    .then(() => driver.sleep(1000))
    //Iniciamos sesion con el segundo participante
    .then(() => driver2.findElement(By.css('#userName')).clear())
    .then(() => driver2.sleep(1000))
    .then(() => driver2.findElement(By.css('#userName')).sendKeys("Sergio Rivas 2"))
    .then(() => driver2.findElement(By.css('#sessionId')).clear())
    .then(() => driver2.sleep(1000))
    .then(() => driver2.findElement(By.css('#sessionId')).sendKeys("Sesion 1"))
    .then(() => driver2.findElement(By.css('#join-button')).click())
    .then(() => driver2.sleep(2000))
    //Enviamos un mensaje con el primer participante
    .then(() => driver.findElement(By.css('#chatbutton')).click())
    .then(() => driver.sleep(1000))
    .then(() => driver.findElement(By.css('#message')).sendKeys("Mensaje de prueba"))
    .then(() => driver.sleep(1000))
    .then(() => driver.findElement(By.css('#sendbutton')).click())
    .then(() => driver.sleep(2000))
    .then(() => driver.findElement(By.css('.closebtn')).click())
    .then(() => driver.sleep(1000))
    //Comprobamos que es bien recibido por el segundo participante
    .then(() => driver2.findElement(By.css('#chatbutton')).click())
    .then(() => driver2.sleep(1000))
    .then(() => driver2.findElement(By.css('.username')).getText())
    .then((value) => {
        var str = value.split(": ");
        console.log("Recibido el mensaje: " + str[1]);
    })
    .then(() => driver2.findElement(By.css('.closebtn')).click())
    .then(() => driver2.sleep(1000))
    //Salimos de la llamada
    .then(() => driver.findElement(By.css('#callendbutton')).click())
    .then(() => driver.sleep(1000))
    .then(() => driver2.findElement(By.css('#callendbutton')).click())
    .then(() => driver2.sleep(1000))
    .then(() => console.log("Funciona correctamente"))
    //Cerramos los navegadores
    .then(() => driver.quit())
    .then(() => driver2.quit());