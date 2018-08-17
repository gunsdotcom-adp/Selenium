"use strict";
const {Builder, By, until} = require('selenium-webdriver');
import chai from 'chai';
import assert from 'assert';
import chaiWebdriver from 'chai-webdriver';
let capabilities = {
    'project' : 'GDC Intro Tests',
    'device' : 'iPhone 7',
    'browserName' : 'iPhone',
    'os_version' : '10.3',
    'realMobile' : 'true',
    'browserstack.user' : 'aronpatterson1',
    'browserstack.key' : 'C3ZkFZxEUF5cg6efcNS9',
    'browserstack.video' : true,
    'browserstack.networkLogs' : 'true',
    'browserstack.debug' : 'true',
    'browserstack.console' : 'errors',
};
let driver = new Builder().
usingServer('http://hub-cloud.browserstack.com/wd/hub').
withCapabilities(capabilities).
build();
driver.USE_PROMISE_MANAGER = false;


describe('Connect to Login Page and log in', function() {
    before(async function() {
    });
    after(async function() {
        await driver.quit();
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(async function() {
    });
    it('Send login info', async function() {
        let loginField = '/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input';

        await driver.get('https://staginglrv.guns.com/login');
        const findLoginField = driver.wait(until.elementLocated(By.xpath(loginField)),20000);
        await driver.wait(findLoginField.findElement(By.xpath(loginField)).sendKeys('selenium@aroonline.com'));
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys('secret');
        await driver.sleep(500);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
        await driver.sleep(2000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: Home Page");
    });
    it.only('Add item to Cart', async function() {
        const removeCart = driver.wait(until.elementLocated(By.xpath('//*[contains(text(),\'Remove from Cart\')]')),20000);
        async function addOrRemove() { // if there's already one in the cart, remove with a click so we can add another
            if(removeCart) {
                await driver.findElement(By.xpath('//*[contains(text(),\'Remove from Cart\')]')).click();
                await driver.sleep(1000);
                await driver.findElement(By.className("swal2-confirm")).click();
                await driver.sleep(1000);
                await console.log('remove is present');
            } else {
                await driver.sleep(1000);
                await console.log('sleep instead of remove');
            }
        }
        await driver.sleep(2000);
        await driver.findElement(By.className('mobile-search-btn')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('search')).sendKeys('34010');
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click();
        await driver.sleep(3000);
        await addOrRemove();
        await driver.findElement(By.xpath("//*[contains(text(),'Add to Cart')]")).click();
        await driver.sleep(1000);
        await driver.findElement(By.className("swal2-confirm")).click();
        await driver.sleep(4000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: HI-POINT 340");
    });
    it('Cart process', async function() {
        await driver.sleep(2000);
        await driver.findElement(By.className("mobile-cart-link")).click();
        await driver.sleep(3000);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[1]/div[4]/a[1]")).click();
        await driver.sleep(3000);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[5]/div/div/div/div[2]/label/input")).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[5]/div/div/div/div[3]/button[2]")).click();
        await driver.sleep(4000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: Checkout");
    });
    // it('Checkout process', async function() {
    //     await driver.findElement(By.id("credit-card")).sendKeys('4111111111111111');
    //     await driver.findElement(By.id('month')).sendKeys('12');
    //     await driver.findElement(By.id('year')).sendKeys('2022');
    //     await driver.findElement(By.id('csc')).sendKeys('123');
    //     await driver.findElement(By.id('first-name')).sendKeys('Selenium');
    //     await driver.findElement(By.id('last-name')).sendKeys('Joe');
    //     await driver.findElement(By.id('street-address-1')).sendKeys('123 Anywhere St');
    //     await driver.findElement(By.id('city')).sendKeys('Anytown');
    //     await driver.findElement(By.id('state')).sendKeys('MN');
    //     await driver.findElement(By.id('zip-code')).sendKeys('55337');
    //     await driver.findElement(By.id('phone')).sendKeys('555-555-5555');
    //     await driver.sleep(2000);
    //     await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/button")).click();
    //     const pageTitle = await driver.getTitle();
    //     await assert.equal(pageTitle, "Guns :: Checkout Success");
    // });
});