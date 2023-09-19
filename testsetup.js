
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

// // Web sitesine git

// // Formu doldur
// driver.findElement(By.id('name')).sendKeys('John');
// driver.findElement(By.id('surname')).sendKeys('Doe');
// driver.findElement(By.id('email')).sendKeys('johndoe@example.com');
// driver.findElement(By.id('password')).sendKeys('secretpassword');

// // Formu gönder
// driver.findElement(By.id('submit')).click();

// // Listeyi kontrol et
// driver.wait(async () => {
//     const list = await driver.findElement(By.id('userList'));
//     const ulElement = await list.findElements(By.tagName('ul'));
//     const lastLiElement = await ulElement[ulElement.length - 1];
//     const text = await lastLiElement.getText();
//     return text.includes('John Doe - johndoe@example.com');
//   }, 5000).then(() => {
//     console.log('Form başarıyla gönderildi ve listeye eklendi.');
//   }).catch(error => {
//     console.error('Hata oluştu:', error);
//   }).finally(() => {
//     // WebDriver'ı kapat
//     driver.quit();
//   });

  (async () => {
    try {
      // Web sitesine git
      await driver.get('http://35.239.91.104:4000/');
  
      // Formu doldur
      await driver.findElement(By.id('name')).sendKeys('John');
      await driver.findElement(By.id('surname')).sendKeys('Doe');
      await driver.findElement(By.id('email')).sendKeys('johndoe@example.com');
      await driver.findElement(By.id('password')).sendKeys('secretpassword');
  
      // Formu gönder
      await driver.findElement(By.id('submit')).click();
  
      // Yeni sayfa yüklenmesini bekleyin
      await driver.wait(until.elementLocated(By.id('userList')), 5000);
  
      // Listeyi kontrol et
      const list = await driver.findElement(By.id('userList'));
      const ulElement = await list.findElement(By.tagName('ul'));
      const lastLiElement = await ulElement.findElement(By.xpath('//li[last()]'));
      const text = await lastLiElement.getText();
  
      if (text.includes('John Doe - johndoe@example.com')) {
        console.log('Form başarıyla gönderildi ve listeye eklendi.');
      } else {
        console.log('Form gönderimi başarısız veya liste güncellenmedi.');
      }
    } catch (error) {
      console.error('Hata oluştu:', error);
    } finally {
      // WebDriver'ı kapat
      await driver.quit();
    }
  })();