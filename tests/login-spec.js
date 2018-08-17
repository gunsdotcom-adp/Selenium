"use strict";
const {Builder, By, until} = require('selenium-webdriver');
import mocha from 'mocha';
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
    before(function() {
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
        await driver.get('https://staginglrv.guns.com/login');
        await driver.sleep(1500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com');
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys('secret');
        await driver.sleep(500);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
        await driver.sleep(4000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: Home Page");
    });
    it('Add item to Cart', async function() {
        let addToCartBtn;
        let addOrRemove;
        await driver.sleep(2000);
        await driver.findElement(By.className('mobile-search-btn')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('search')).sendKeys('34010');
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click();
        await driver.sleep(2000);
        addToCartBtn = driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button"));
        addOrRemove = ()=> { // if there's already one in the cart, remove with a click so we can add another
            if(chai.expect('.btn.btn-success').dom.to.contain.text("Remove from Cart")){
                return addToCartBtn.click();
            } else {
                return driver.sleep(1000) && console.log('sleep instead of remove');
            }
        };
        await addOrRemove;
        await addToCartBtn.click();
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
});