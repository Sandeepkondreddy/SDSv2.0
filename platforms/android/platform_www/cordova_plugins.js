cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.joandilee.imeiplugin/www/imeiplugin.js",
        "id": "com.joandilee.imeiplugin.imeiplugin",
        "clobbers": [
            "imeiplugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-device": "2.0.3",
    "com.joandilee.imeiplugin": "0.1"
};
// BOTTOM OF METADATA
});