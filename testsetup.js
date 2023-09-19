// const {By, Builder} = require('selenium-webdriver');
// const {suite} =  require('selenium-webdriver/testing');
// const assert = require('assert');

// suite(env=>{
//     describe("Accounts listesi testleri",()=>{
//         let driver;
        
//         before(async()=>{
//             driver = await new Builder().forBrowser('chrome').build();
//         });
//         after(async()=>{
//             await driver.quit();
//         });
//         it("Test kullanıcısı oluşturma",async()=>{
//             await driver.get("http://35.239.91.104:4000/");
//             await driver.findElement(By.id('name')).sendKeys('tsName');
//             await driver.findElement(By.id('surname')).sendKeys('tsSurname');
//             await driver.findElement(By.id('email')).sendKeys('tsEmail@tsEmail')
//             await driver.findElement(By.id('password')).sendKeys('tsPassword')

//             await driver.findElement(By.id('submit')).click()

//             let userlist = await driver.findElement(By.id('userList'));
//             let users = await userlist.findElements(By.tagName('li'));
//             let testuser = users[users.length-1];
            
//             assert.equal(await testuser.getText(),'tsName tsSurname - tsEmail@tsEmail');
//         });
//     });
// });

const { Builder, By, Key, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

// Headless Chrome ayarları
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless'); // Tarayıcıyı headless modda başlat

// WebDriver'ı oluştur
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

// Web sitesine git
driver.get('http://35.239.91.104:4000/');

// Formu doldur
driver.findElement(By.id('name')).sendKeys('John');
driver.findElement(By.id('surname')).sendKeys('Doe');
driver.findElement(By.id('email')).sendKeys('johndoe@example.com');
driver.findElement(By.id('password')).sendKeys('secretpassword');

// Formu gönder
driver.findElement(By.id('submit')).click();

// Listeyi kontrol et
driver.wait(async () => {
    const list = await driver.findElement(By.id('userList'));
    const ulElement = await list.findElements(By.tagName('ul'));
    const liElements = await ulElement[0].findElements(By.tagName('li'));
    const lastLi = liElements[liElements.length - 1];
    const text = await lastLi.getText();
    return text.includes('John Doe - johndoe@example.com');
  }, 5000).then(() => {
    console.log('Form başarıyla gönderildi ve listeye eklendi.');
  }).catch(error => {
    console.error('Hata oluştu:', error);
  }).finally(() => {
    // WebDriver'ı kapat
    driver.quit();
  });