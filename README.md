## Remeash-App

### Prerequisites

* nvm (node version manager)
* NodeJS
* react-native cli
* Android SDK 
* Android SDK tools

### Installation 

* `$ nvm use`
* `$ npm install`

### Develop

* `$ react-native run-android`

### Select between -local and -remote

* Comment line `6` and uncomment line `7` for `local`(lan), or viceversa for `remote`(heroku), from `src/API.js`file
* Change string at `android/app/src/main/res/values/strings.xml` to `tpFiuba-local` or `tpFiuba-remote` (Optional)

### Build .apk 

* `$ cd android`
* `$ ./gradlew assembleRelease`

Generated APK can be found at:
`android/app/build/outputs/apk/release/app-release.apk`

