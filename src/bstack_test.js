"use script";
import webdriver from 'selenium-webdriver';
let By = webdriver.By;
let until = webdriver.until;

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

let driver = new webdriver.Builder().
    usingServer('http://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(capabilities).
    build();

let loginToSite = ()=> driver.sleep(1000)
    .then(()=> driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com'))
    .then(()=> driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys("secret"))
    .then(()=> driver.sleep(1000))
    .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click())
    .catch(()=> console.log("Error"));

let addToCart = ()=> driver.sleep(1000)
    .then(()=> driver.findElement(webdriver.By.className('mobile-search-btn')).click())
    .then(()=> driver.findElement(webdriver.By.id('search')).sendKeys('34010'))
    .then(()=> driver.sleep(2000))
    .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/nav/div/div[2]/div[2]/div/div/div[1]/div/ul[1]/li/a")).click())
    .then(()=> driver.sleep(1000))
    .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click())
    .then(()=> driver.sleep(1000))
    .then(()=> driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click())
    .then(()=> driver.sleep(1000))
    .then(()=> driver.findElement(webdriver.By.className("swal2-confirm")).click())
    .then(()=> driver.findElement(webdriver.By.className("mobile-cart-link")).click())
    .then(()=> driver.sleep(3000))
    .then(() => {
        console.log('in Cart');
        driver.quit()
    });


// let loginTest = ()=> {
//     return driver.sleep(1000).then(() => {
//         return driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input')).sendKeys('selenium@aroonline.com').then(() => {
//             return driver.findElement(webdriver.By.xpath('/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input')).sendKeys("secret").then(() => {
//                 return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/button")).click();
//             })
//         })
//     })
// };
let returnTest = ()=> {
    return driver.sleep(1000).then(()=> {
        return driver.findElement(webdriver.By.className('mobile-search-btn')).click().then(() => {
            return driver.findElement(webdriver.By.id('search')).sendKeys('34010').then(() => {
                return driver.sleep(2000).then(() => {
                    return driver.findElement(webdriver.By.xpath("//a[@href = '/firearms/handguns/semi-auto/34010']")).click().then(() => {
                        return driver.sleep(1000).then(() => {
                            return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[4]/div[2]/ul/li[1]/div/div[1]/div[1]/a")).click().then(() => {
                                return driver.sleep(1000).then(() => {
                                    return driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[2]/div[2]/div[3]/div[2]/button")).click().then(() => {
                                        return driver.sleep(1000).then(() => {
                                            return driver.findElement(webdriver.By.className("swal2-confirm")).click().then(() => {
                                                return driver.findElement(webdriver.By.className("mobile-cart-link")).click().then(() => {
                                                    return driver.sleep(3000).then(() => {
                                                        console.log('in Cart?');
                                                        driver.quit()
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};

//
// // SUCCESS
// promise.then((details)=>{
//     console.log("Test proceeding. " . details)
// });
// // FAILURE
// promise.then(null, (error)=> {
//     console.log("This test has failed. " . error)
// });

// setup our main script
driver
    .get('https://staginglrv.guns.com/login')
    .then(
        loginToSite
    )
    .then (
        addToCart
    );
