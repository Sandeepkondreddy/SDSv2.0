cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.joandilee.imeiplugin/www/imeiplugin.js",
        "id": "com.joandilee.imeiplugin.imeiplugin",
        "clobbers": [
            "imeiplugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-imeigetter/www/IMEIGetter.js",
        "id": "cordova-plugin-imeigetter.IMEIGetter",
        "clobbers": [
            "cordova.plugins.IMEIGetter"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "com.joandilee.imeiplugin": "0.1",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-imeigetter": "1.0"
};
// BOTTOM OF METADATA
});