"use strict";
const {Builder, By, until} = require('selenium-webdriver');
import chai from 'chai';
import assert from 'assert';
import fs from 'fs';
import yaml from 'js-yaml';
import argv from 'yargs';
let browserName = '"toString": argv.browserName';
let realMobile = '"toString": argv.realMobile';

function loadKeys() {
    let ymlFile = fs.readFileSync('keys.yml', 'utf8');
    return yaml.load(ymlFile);
}
const { BROWSERSTACK, GUNS } = loadKeys();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}
const { PROJECT } = loadConfig();

let capabilities = {
    'project' : PROJECT.name,
    'device' : PROJECT.device,
    'browserName' : browserName,
    'browserstack.user' : BROWSERSTACK.username,
    'browserstack.key' : BROWSERSTACK.key,
    'browserstack.video' : true,
    'browserstack.networkLogs' : 'true',
    'browserstack.debug' : 'true',
    'browserstack.console' : 'errors',
};

if(realMobile) {
    capabilities.push({'realMobile', realMobile});
}

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
        await driver.get('https://staginglrv.guns.com/login');
        await driver.sleep(4000);
        await driver.findElement(By.xpath('descendant::*[@id=\'email\'][2]')).sendKeys(GUNS.username);
        await driver.findElement(By.xpath('descendant::*[@id=\'password\'][2]')).sendKeys(GUNS.password);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('descendant::*[@type=\'submit\'][2]')).click();
        await driver.sleep(2000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, 'Guns :: Home Page');
    });
    it('Add item to Cart', async function() {
        await driver.sleep(2000);
        await driver.findElement(By.className('mobile-search-btn')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('search')).sendKeys('34010');
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//a[contains(@href,\'/firearms/handguns/semi-auto/34010\')][text()=\'34010\']')).click();
        await driver.sleep(3000);
        await driver.findElement(By.xpath('descendant::a[contains(@href,\'/firearms/handguns/semi-auto/34010\')][text()=\'HI-POINT\'][1]')).click();
        await driver.sleep(6000);
        await driver.findElement(By.xpath('//*[contains(text(),\'Remove from Cart\')]'))
            .then(async function() {
                await console.log('Remove from Cart found, handling...');
                await driver.findElement(By.xpath('//*[contains(text(),\'Remove from Cart\')]')).click();
                await driver.sleep(2000);
                await driver.findElement(By.className('swal2-cancel')).click();
            })
            .catch (()=> {

            });
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[contains(text(),\'Add to Cart\')]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.className('swal2-confirm')).click();
        await driver.sleep(4000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, 'Guns :: Shopping Cart');
    });
    it('Cart process', async function() {
        await driver.sleep(2000);
        await driver.findElement(By.xpath('descendant::*[contains(text(),\'Proceed To Checkout\')][2]')).click();
        await driver.sleep(3000);
        await driver.findElement(By.xpath('descendant::*[@type=\'checkbox\'][2]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('descendant::*[contains(text(),\'Continue\')][3]')).click();
        await driver.sleep(4000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: Checkout");
    });
    it('Checkout process', async function() {
        await driver.findElement(By.id("credit-card")).sendKeys('4111111111111111');
        await driver.findElement(By.xpath('//*[@id=\'month\']/option[3]')).click();
        await driver.findElement(By.id('year')).sendKeys('2022');
        await driver.findElement(By.id('csc')).sendKeys('123');
        await driver.findElement(By.id('first-name')).sendKeys('Selenium');
        await driver.findElement(By.id('last-name')).sendKeys('Joe');
        await driver.findElement(By.id('street-address-1')).sendKeys('123 Anywhere St');
        await driver.findElement(By.id('city')).sendKeys('Anytown');
        await driver.findElement(By.xpath('//*[@id=\'state\']/option[27]')).click();
        await driver.findElement(By.id('zip-code')).sendKeys('55337');
        await driver.findElement(By.id('phone')).sendKeys('555-555-5555');
        await driver.sleep(2000);
        await driver.findElement(By.xpath('descendant::*[contains(text(),\'Place Order\')][1]')).click();
        await driver.sleep(10000);
        const pageTitle = await driver.getTitle();
        await assert.equal(pageTitle, "Guns :: Checkout Success");
    });
});