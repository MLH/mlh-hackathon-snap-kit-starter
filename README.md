# Introduction

This is a hackathon boilerplate for a messaging app using the Snap Kit Bitmoji SDK created by Major League Hacking. It is for hackers looking to get started quickly on a new hackathon project using Snap Kit.

# Prerequisites

This project requires the following tools:

* [Firebase](https://firebase.google.com/) - A mobile and web application development platform. Firebase’s Cloud Firestore will store and sync messages between users of your app.
* [Node.js](https://nodejs.org/en/download/) - An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
* [Snap Kit SDK](https://kit.snapchat.com/) - Lets hackers like you integrate some of Snapchat's best features across your hacks.

To get started, create a [Firebase](https://console.firebase.google.com/) and [Snap kit](https://kit.snapchat.com/) account if you haven't already, you can use your Snapchat credentials if you have one to log into Snap Kit. 

# Getting Started

### Step 1: Download or Clone the Github folder to your local directory

You can download the boiler plate code by selecting ***Download or Clone*** at the top of this page or clone the folder into a fresh folder by entering the following command

```
$ git clone https://github.com/SalceMLH/mlh-hackathon-snap-kit-starter.git
$ cd mlh-hackathon-snap-kit-starter
```

### Step 2: Configure Firebase in Your App**

Firebase’s Cloud Firestore will store and sync messages between users of your app. This will allow your app to send messages in real time between multiple users.

* Create a new Firebase project. Go to the [Firebase console](https://console.firebase.google.com/u/0/) and click “Add a project”  

* Click the `</>` icon to get your Firebase config. Copy your Firebase config and save it somewhere safe, we will be using this later.

* Click on the “Database” link. You’ll then be able to enable Cloud Firestore by clicking “Create database.” A dialog will prompt you about security rules. Select “Start in test mode” to allow all reads and writes. 


* Open `script.js`, and fill in the Firebase config from earlier. This will give your web app access to the Cloud Firestore.

```javascript
firebase.initializeApp({
  /* Fill in the following values based on your config. */
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});
```

### Step 3: Set Up a Web Server**

Now that you have Firebase configured, you’ll need to host your web app with a server in order to leverage the Skap Kit SDK. Open your terminal, and run the following command. Do keep in mind that [Node.js](https://nodejs.org/en/download/) is required to run the `http-server` command. 

```
$ npm install http-server -g
```

Once installed navigate to the folder that holds the sample project files and use the following command to start your server.

```
$ http-server
```

`http-server` will output a link to our server which in this case `http://127.0.0.1:8080`. The server address is equivalent to `localhost` so moving forward we will utilize the latter. Enter the following URL into your browser _be sure to replace the port number with the number provided by `http-server`)_

Open http://localhost:8080 to view it in your browser.


### Step 4: Configuring the Snap Kit SDK**

Before working with the Snap Kit Development Kit, you'll need to get your Snap Kit credentials. Navigate to the [Snap Kit Development Portal](https://tinyurl.com/y738hmag) and Create an account. Alternatively, you can login using your Snapchat account.

1. Add a new Snap application by hitting ht `+` symbol
2. Enable the Bitmoji Kit under `Kits` 
3. Add a redirect URL which is your localhost URL `http://localhost:8081/`
4. Configure your development environment by toggling the `web` client on.

### Step 5: Adding Bitmoji Kit to your app**


Now that we have configured all the starting steps to our application, we can now add the Bitmoji Kit to our application. We will be adding the Bitmoji Icon to our messaging bar. 

Open `index.html`, and add a `<div>` placeholder where our sticker picker would go

```html
<div class="controls">
  <input id="messageInput" type="text" placeholder="Type a message..."/>
  <i id="namePicker" class="material-icons">account_box</i>
  <div class="bitmojiStickerPicker"></div>
</div>
```
With our Sticker Picker in place, let's include the Snap Kit SDK using the following snippet

```javascript
<script>
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js, sjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://sdk.snapkit.com/js/v1/login_bitmoji.js";
    sjs.parentNode.insertBefore(js, sjs);
  }(document, 'script', 'bitmojikit-sdk'));
</script>
```

Copy and paste the snippet to the end of the `<body>` tag of `index.html` as shown.

```javascript
<!-- JS -->
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase.js"></script>
<script src="script.js"></script>
<script>
  /* Load the Bitmoji Kit SDK asynchronously */
  (function (d, s, id) {
    var js, sjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://sdk.snapkit.com/js/v1/login_bitmoji.js";
    sjs.parentNode.insertBefore(js, sjs);
  }(document, 'script', 'bitmojikit-sdk'));
</script>
```

Open the `script.js` file to add the `snapKitInit` function beneath the comment that reads `/* Setup Bitmoji Kit Web here */`

```
window.snapKitInit = () => {
  
};
```

The `snapKitInit` function will initialize the Snap Kit SDK once it's fully loaded.

Let's add a line of code to the initializer that will call the Bitmoji Sticker Picker. 

```javascript
window.snapKitInit = () => {
    snap.bitmojikit.mountBitmojiStickerPickerIcons();
};
```

The `mountBitmojiStickerPickerIcons` function will load the Bitmoji Sticker Picker once intialized by the `snapKitInit` function. The functions takes in the following three (3) arguments.

* `bitmojiWebPickerIconClass`(string): the class name of the sticker picker placeholder

* `uiOptions` (object): specifies options for the sticker picker
* `loginParamsObj` (object): specifies login and authentication information

Declare the class for the `bitmojiWebPickerIconClass` function to `bitmojiStickerPicker`. Let’s add that to our function call.

```javascript
/* Setup Bitmoji Kit Web here */
window.snapKitInit = () => {
  const bitmojiWebPickerIconClass = "bitmojiStickerPicker";
  
  snap.bitmojikit.mountBitmojiStickerPickerIcons(
    bitmojiWebPickerIconClass
  );
}
```

Declare the class for the `uiOptions` object to specify the options for the sticker picker. This object has two keys:

* `onStickerPickCallback`: Function will take in the Bitmoji image URL as an argument and will be called by the Bitmoji Kit when the user selects a Bitmoji
* `webpickerPosition`: The position of the sticker picker

```javascript
/* Setup Bitmoji Kit Web here */
window.snapKitInit = () => {
  const bitmojiWebPickerIconClass = "bitmojiStickerPicker";
  const uiOptions = {
    onStickerPickCallback: sendImage,
    webpickerPosition: "topLeft",
  };
  
  snap.bitmojikit.mountBitmojiStickerPickerIcons(
    bitmojiWebPickerIconClass,
    uiOptions
  );
}
```

Declare the class for the `loginParamsObj` object to allow users to log in and authenticate themselves. This object has three keys:

* `clientId`: A OAuth key that identifies your application.
* `redirectURI`: A string that is the linked to your web app.
* `scopeList`: An array that describes what we want to access.

```javascript
/* Setup Bitmoji Kit Web here */
window.snapKitInit = () => {
  const bitmojiWebPickerIconClass = "bitmojiStickerPicker";
  const uiOptions = {
    onStickerPickCallback: sendImage,
    webpickerPosition: "topLeft",
  };
  const loginParamsObj = {
    clientId: /* your client id here: */ "",
    redirectURI: "http://localhost:8081/",
    scopeList: [
       "user.bitmoji.avatar",
       "user.display_name",
    ]
  };
  
snap.bitmojikit.mountBitmojiStickerPickerIcons(
    bitmojiWebPickerIconClass,
    uiOptions,
    loginParamsObj
  );
}
```

You have now completed calling adding the Bitmoji Sticker Picker. Save your file, refresh the page, and you should see a sweet sticker picker!


# What's Included?
* [Firebase](https://firebase.google.com/) - A mobile and web application development platform. Firebase’s Cloud Firestore will store and sync messages between users of your app.
* [Node.js](https://nodejs.org/en/download/) - An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
* [Snap Kit SDK](https://kit.snapchat.com/) - Lets hackers like you integrate some of Snapchat's best features across your hacks.
* [Google Fonts](https://developers.google.com/fonts/docs/getting_started) - Google Fonts API to add fonts to your web pages

# Code of Conduct

We enforce a Code of Conduct for all maintainers and contributors of this Guide. Read more in [CONDUCT.md](https://github.com/SalceMLH/mlh-hackathon-snap-kit-starter/blob/master/CODE%20OF%20CONDUCT).

# License

The Hackathon Starter Kit is open source software [licensed as MIT](https://github.com/SalceMLH/mlh-hackathon-snap-kit-starter/blob/master/LICENSE).
