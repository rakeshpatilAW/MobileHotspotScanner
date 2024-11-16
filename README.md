# Hotspot Scanner App

A simple React Native app to manage and scan for connected devices on a mobile hotspot.

## Features

- Check if hotspot is enabled.
- Display the device's IP address.
- Find and list connected devices to the hotspot.

## Setup & Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/hotspot-scanner-app.git
    cd hotspot-scanner-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app on an emulator or connected device:

    - For iOS:

      ```bash
      npx react-native run-ios
      ```

    - For Android:

      ```bash
      npx react-native run-android
      ```

4. Make sure to configure any required permissions in your `AndroidManifest.xml` or `Info.plist` (such as WiFi and location permissions).

## Limitations

- **Android 13 (API level 33) and newer:**
  The method used to manage and scan connected devices may not work on Android 13 due to new security restrictions and role-based access introduced in that version. As of Android 13, apps are restricted from accessing certain system-level functionalities like hotspot management without specific privileges, which are not granted to normal apps.

  - The app's ability to scan and interact with connected devices may be limited or unavailable on devices running Android 13 or later.
  - You may need to update the app or implement new workarounds if running on Android 13 or later.

## Usage

- The app will automatically fetch the device IP and show it on the screen.
- You can also scan for connected devices and see their IP and MAC addresses.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or fixes!

## License

MIT License
