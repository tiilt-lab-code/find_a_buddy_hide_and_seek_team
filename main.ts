radio.onReceivedNumber(function (receivedNumber) {
    if (hide_mode == 0 || find_a_buddy_mode == 1 && start_find == 1) {
        if (recent_max_device == radio.receivedPacket(RadioPacketProperty.SerialNumber)) {
            recent_max = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > recent_max) {
            recent_max_device = radio.receivedPacket(RadioPacketProperty.SerialNumber)
            recent_max = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        }
        led.plotBarGraph(
        Math.map(recent_max, -100, -42, 0, 9),
        9
        )
    }
})
input.onButtonPressed(Button.AB, function () {
    if (find_a_buddy_mode == 0) {
        if (hide_mode == 0) {
            hide_mode = 1
            radio.setTransmitPower(7)
            basic.showString("hide")
        } else {
            hide_mode = 0
            recent_max = -120
            recent_max_device = 0
            basic.showString("seek")
        }
    } else {
        start_find = 1
        radio.setGroup(randint(0, 1))
        recent_max = -120
        basic.showIcon(IconNames.Yes)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (input.runningTime() - latest_shake > 3000) {
        shake_count = 0
    }
    shake_count += 1
    latest_shake = input.runningTime()
    if (shake_count >= 10) {
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.showIcon(IconNames.Square)
        start_hide_and_seek()
    }
})
function start_hide_and_seek () {
    start_find = 0
    find_a_buddy_mode = 0
    recent_max = -120
    recent_max_device = 0
    hide_mode = 1
    radio.setTransmitPower(7)
    basic.showString("hide")
}
let hide_mode = 0
let start_find = 0
let shake_count = 0
let latest_shake = 0
let recent_max_device = 0
let recent_max = 0
let find_a_buddy_mode = 0
find_a_buddy_mode = 1
recent_max = -120
recent_max_device = 0
latest_shake = 0
shake_count = 0
start_find = 0
basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # # . # #
    # # . # #
    `)
basic.forever(function () {
    if (find_a_buddy_mode == 0) {
        if (hide_mode == 1) {
            radio.sendNumber(0)
            basic.pause(200)
        }
    } else {
        if (start_find == 1) {
            radio.sendNumber(0)
            basic.pause(200)
        }
    }
})
