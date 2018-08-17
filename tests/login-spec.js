
let test = require('selenium-webdriver/testing');

test.describe('Connect to Login Page and log in', ()=> {
    test.it('Send login info', async ()=> {
        await driver.get('https://staginglrv.guns.com/login');
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com');
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys('secret');
        await driver.sleep(500);
        await driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
        await driver.sleep(4500);
        await driver.quit();
    })
});

function* addToCart() {
    yield driver.sleep(2000);
    yield driver.findElement(webdriver.By.className('mobile-search-btn')).click();
    yield sleep(1000);
    yield driver.findElement(webdriver.By.id('search')).sendKeys('34010');
    yield sleep(1000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a")).click();
    yield sleep(1000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click();
    yield sleep(2000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click();
    yield sleep(1000);
    yield driver.findElement(webdriver.By.className("swal2-confirm")).click();
    yield driver.findElement(webdriver.By.className("mobile-cart-link")).click();
    yield sleep(2000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[1]/div[4]/a[1]")).click();
    yield sleep(2000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[4]/div/div/div/div[2]/label/input")).click()
    yield sleep(1000);
    yield driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[4]/div/div/div/div[3]/button[2]")).click();
    yield sleep(4000);
    yield driver.quit();
}
