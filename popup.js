// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
let cart = {
  //nordstrom:[url1, url2],
  //amazon:[url1, url2]
  // 
};

let keys =[];



function getCurrentTabTitleUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

   chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    var title = tab.title;
    var url = tab.url;

    keys.push(url);
    // var site = window.location;
  
    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.log('THIS IS THE URL PATH', url);
    // console.log('THIS IS THE site name', site);
    console.log('THIS IS THE TITLE', title);
    callback(title, url);
  });
}

 //set the current URL to a property
 function saveCurrentItemUrlToCart() {
   getCurrentTabTitleUrl((title, url) => {
     console.log('???????These are the pairs', title, url)
     cart.title = url;
     localStorage.setItem(title, url);
    }); 
  }


  
  function getSavedBackgroundColor(cart, callback) {  
    chrome.storage.local.get(function(localStorage){console.log('THIS IS THE STORAGE', localStorage)})
    saveCurrentItemUrlToCart();
    
    chrome.storage.sync.get(cart, (store) => {
      callback(chrome.runtime.lastError ? null : cart[store]);
    });
  }
  
  /**
   * Sets the given background color for url.
   *
   * @param {string} url URL for which background color is to be saved.
   * @param {string} color The background color to be saved.
   */
  // function saveCart(title, url) {
  //   var cart = {};
  //   cart[title] =[url];
  //   // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
  //   // optional callback since we don't need to perform any action once the
  //   // background color is saved.
  //   chrome.storage.sync.set(cart);
  // }
  
  // This extension loads the saved background color for the current tab if one
  // exists. The user can select a new background color from the dropdown for the
  // current page, and it will be saved as part of the extension's isolated
  // storage. The chrome.storage API is used for this purpose. This is different
  // from the window.localStorage API, which is synchronous and stores data bound
  // to a document's origin. Also, using chrome.storage.sync instead of
  // chrome.storage.local allows the extension data to be synced across multiple
  // user devices.
  document.addEventListener('DOMContentLoaded', () => {

    var storageKeys = Object.keys(localStorage);

    

    for( var key in localStorage ){
      console.log('THESE ARE KEYS', key)
      console.log('THESE ARE VALUES', localStorage[key])
      console.log(storageKeys);
    }


    // getCurrentTabTitleUrl((title) => {
    //   console.log('THIS IS YOUR CART!!!!!!!!', cart);
    //   console.log('KEYSSSSSSS!!!!!!!!', storageKeys);


    // });
  });

  
  // chrome.pageAction.onClicked.addListener(function callback)
  
  // function getCurrentPath() => {
    //   chrome.pageAction.onClicked.addListener(callback){
      
      //   }
      // }
    

      //   * Change the background color of the current page.
      //   *
      //   * @param {string} color The new background color.
      //   */
       
      //  //MIGHT NEED THIS TO SAVE A STORE
       
      //  // function saveChanges() {
      //  //   // Get a value saved in a form.
      //  //   var theValue= 'This should be a URL';
      //  //   // Check that there's some code there.
      //  //   if (!theValue) {
      //  //      return 'Error: No value specified';
      //  //   }
      //  //   // Save it using the Chrome extension storage API.
      //  //   chrome.storage.sync.set({'value': theValue}, function() {
      //  //     // Notify that we saved.
      //  //     console.log('Settings saved');
      //  //   });
      //  // }