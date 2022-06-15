let D5 = 0
let D4 = 0
let D3 = 0
let D2 = 0
let D1 = 0
mbitbot_airbox.oled_init()
mbitbot_airbox.oled_font_size(OLED_Size.size1)
mbitbot_airbox.PMS3003_SET(soft_serial.serial_2, soft_serial.serial_1, setMode.setmode2)
let strip = neopixel.create(DigitalPin.P12, 2, NeoPixelMode.RGB)
strip.setBrightness(15)
basic.forever(function () {
    mbitbot_airbox.get_pms3003(soft_serial.pms_serial_2, soft_serial.pms_serial_1)
    basic.pause(1000)
    D1 = mbitbot_airbox.data_pms3003(PMS5003_data.data_1)
    D2 = mbitbot_airbox.data_pms3003(PMS5003_data.data_2)
    D3 = mbitbot_airbox.data_pms3003(PMS5003_data.data_3)
    D4 = mbitbot_airbox.dht11(DigitalPin.P8, DHTState.temp)
    D5 = mbitbot_airbox.dht11(DigitalPin.P8, DHTState.humid)
    if (D5 < 60) {
        basic.showIcon(IconNames.Happy)
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (D5 < 70) {
        basic.showIcon(IconNames.Asleep)
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (D5 < 80) {
        basic.showIcon(IconNames.Sad)
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    } else if (D5 < 100) {
        basic.showIcon(IconNames.Skull)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
    logyun.connect_logyun(
    soft_serial.serial_13,
    soft_serial.serial_14,
    "The Muscle",
    "hawkeye101200"
    )
    logyun.logyun_thingspeak(
    "E0Y90IK1T4UXK82K",
    D1,
    D2,
    D3,
    D4,
    D5
    )
    logyun.logyun_googlesheet(
    "1twzdFEyyjmKD6zXmi0Fp84ANBxPlXqBjzsRlyj4wNhE",
    convertToText(D1),
    convertToText(D2),
    convertToText(D3),
    convertToText(D4),
    convertToText(D5)
    )
    basic.pause(15000)
})
control.inBackground(function () {
    basic.pause(3000)
    while (true) {
        mbitbot_airbox.oled_clear()
        mbitbot_airbox.oled_showString(0, 0, "AirBox")
        mbitbot_airbox.oled_showString(0, 1, "PM 1.0:" + D1)
        mbitbot_airbox.oled_showString(0, 2, "PM 2.5:" + D2)
        mbitbot_airbox.oled_showString(0, 3, "PM 10 :" + D3)
        basic.pause(3000)
        mbitbot_airbox.oled_clear()
        mbitbot_airbox.oled_showString(0, 0, "AirBox")
        mbitbot_airbox.oled_showString(0, 1, "Temp :" + D4)
        mbitbot_airbox.oled_showString(0, 2, "Humid :" + D5)
        basic.pause(3000)
    }
})
