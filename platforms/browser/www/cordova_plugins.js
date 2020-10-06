cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.joandilee.imeiplugin/www/imeiplugin.js",
        "id": "com.joandilee.imeiplugin.imeiplugin",
        "pluginId": "com.joandilee.imeiplugin",
        "clobbers": [
            "imeiplugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.joandilee.imeiplugin": "0.1",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-whitelist": "1.2.2"
}
// BOTTOM OF METADATA
});