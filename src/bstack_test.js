"use script";
import mocha from 'mocha';
import chai from 'chai';
let assert = require('assert');
const {Builder, By, until} = require('selenium-webdriver');

// Input capabilities
let capabilities = {
    'project' : 'GDC Intro Tests',
    'browserName' : 'iPhone',
    'device' : 'iPhone 7',
    'realMobile' : 'true',
    'os_version' : '10.3',
    'browserstack.user' : 'aronpatterson1',
    'browserstack.key' : 'C3ZkFZxEUF5cg6efcNS9',
    'browserstack.video' : true,
    'browserstack.networkLogs' : 'true',
    'browserstack.debug' : 'true',
    'browserstack.console' : 'errors',
};

global.driver = new Builder().
    usingServer('http://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(capabilities).
    build();

driver.USE_PROMISE_MANAGER = false;

//import './tests/login_spec.js';


describe('Login Process', function() {
    before(function() {
        // runs before all tests in this block
    });
    after(async function() {
        await driver.quit();
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(async function() {
    });
    describe('Connect to Login Page and log in', function() {
        it('Send login info', async function() {
            await driver.get('https://staginglrv.guns.com/login');
            await driver.sleep(500);
            await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com');
            await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys('secret');
            await driver.sleep(500);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
            await driver.sleep(4500);
            const pageTitle = await driver.getTitle();
            await assert.equal(pageTitle, "Guns :: Home Page");
        });
        it('Add item to Cart', async function() {
            const mobileSearchButton = await driver.wait(
                until.elementLocated(By.className('mobile-search-btn')),
                20000
            );
            await mobileSearchButton.click();
            await driver.sleep(1000);
            await driver.findElement(By.id('search')).sendKeys('34010');

            const mobileSearchButton = await driver.wait(
                until.elementLocated(By.className('mobile-search-btn')),
                20000
            );
            await driver.findElement(By.xpath("/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a")).click();
            await driver.sleep(1000);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click();
            await driver.sleep(2000);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click();
            await driver.sleep(1000);
            await driver.findElement(By.className("swal2-confirm")).click();
            const pageTitle = await driver.getTitle();
            await assert.equal(pageTitle, "Guns :: HI-POINT 340");
        });
        it('Cart process', async function() {
            await driver.findElement(By.className("mobile-cart-link")).click();
            await driver.sleep(2000);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[1]/div[4]/a[1]")).click();
            await driver.sleep(2000);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[5]/div/div/div/div[2]/label/input")).click();
            await driver.sleep(1000);
            await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[5]/div/div/div/div[3]/button[2]")).click();
            await driver.sleep(4000);
            const pageTitle = await driver.getTitle();
            await assert.equal(pageTitle, "Guns :: Checkout");
        });
    })
});

// let m = main();
// m.next();
//
// function* main() {
//     try {
//         let driver = getDriver();
//
//         yield visitLoginPage(driver);
//         let usernameField = driver.findElement(By.id('email'));
//         let passwordField = driver.findElement(By.id('password'));
//
//         usernameField.sendKeys( "user001" );
//         passwordField.sendKeys( "qwerty" );
//
//         let submitButton = driver.findElement(By.xpath("//button[contains(text(),'Login')]"));
//
//         submitButton.click();
//
//         let currentUrl = yield getCurrentUrl(driver);
//
//         console.log(currentUrl);
//     }
//     catch (error) {
//         console.log(error);
//         driver.quit();
//     }
// }
//
// function getDriver() {
//     return new webdriver.Builder()
//         .usingServer('http://hub-cloud.browserstack.com/wd/hub')
//         .withCapabilities(capabilities)
//         .build();
// }
//
// function visitLoginPage(driver) {
//     driver.get('https://staginglrv.guns.com/login');
//
//     let promise = driver.wait(
//         until.elementLocated(By.id('email')),
//         2000);
//
//     promise.then(onFulfill, onReject);
//
//     function onFulfill(element) {
//         m.next();
//     }
//
//     function onReject(error) {
//         let thisError = new Error('Could not load page');
//         m.throw(thisError);
//         driver.quit();
//     }
// }

// function getCurrentUrl(driver) {
//     driver.getCurrentUrl().then(function(value) {
//         m.next( value );
//     });
// }


// let loginToSite = ()=> driver.sleep(2000)
//     .then(()=> driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com'))
//     .then(()=> driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys("secret"))
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click())
//     .catch(()=> console.log("Error"));
//
// let addToCart = ()=> driver.sleep(2000)
//     .then(()=> driver.findElement(webdriver.By.className('mobile-search-btn')).click()) // click on mobile search btn
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.id('search')).sendKeys('34010')) // send 34010 to search
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a")).click()) // click on search link
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click()) // click on PLP2 link
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click()) // add item to cart
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.className("swal2-confirm")).click()) // click OK after we've added to Cart
//     .then(()=> driver.findElement(webdriver.By.className("mobile-cart-link")).click()) // click on Cart
//     .then(()=> driver.sleep(2000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[1]/div[4]/a[1]")).click()) // click on Proceed to Checkout
//     .then(()=> driver.sleep(2000)) // wait until Age Verification modal pops up
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[4]/div/div/div/div[2]/label/input")).click()) //
//     .then(()=> driver.sleep(1000))
//     .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div[4]/div/div/div/div[3]/button[2]")).click()) //
//     .then(()=> driver.sleep(4000))
//     .then(()=> driver.quit())
//     .catch(()=> console.log("Error"));


// let loginTest = ()=> {
//     return driver.sleep(1000).then(() => {
//         return driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com').then(() => {
//             return driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys("secret").then(() => {
//                 return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
//             })
//         })
//     })
// };
// let returnTest = ()=> {
//     return driver.sleep(1000).then(()=> {
//         return driver.findElement(webdriver.By.className('mobile-search-btn')).click().then(() => {
//             return driver.findElement(webdriver.By.id('search')).sendKeys('34010').then(() => {
//                 return driver.sleep(2000).then(() => {
//                     return driver.findElement(webdriver.By.xpath("//a[@href = '/firearms/handguns/semi-auto/34010']")).click().then(() => {
//                         return driver.sleep(1000).then(() => {
//                             return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click().then(() => {
//                                 return driver.sleep(1000).then(() => {
//                                     return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click().then(() => {
//                                         return driver.sleep(1000).then(() => {
//                                             return driver.findElement(webdriver.By.className("swal2-confirm")).click().then(() => {
//                                                 return driver.findElement(webdriver.By.className("mobile-cart-link")).click().then(() => {
//                                                     return driver.sleep(3000).then(() => {
//                                                         console.log('in Cart?');
//                                                         driver.quit()
//                                                     })
//                                                 })
//                                             })
//                                         })
//                                     })
//                                 })
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// };

//
// // SUCCESS
// promise.then((details)=>{
//     console.log("Test proceeding. " . details)
// });
// // FAILURE
// promise.then(null, (error)=> {
//     console.log("This test has failed. " . error)
// });

// // setup our main script
// driver
//     .then(()=> driver.get('https://staginglrv.guns.com/login') && loginToSite())
//     .then (
//         addToCart()
//     );
