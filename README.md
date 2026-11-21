# Chilkey ND75 – SignalRGB Plugin

Per-key RGB control of the **Chilkey ND75** keyboard in [SignalRGB](https://signalrgb.com).

| | |
|---|---|
| Device | Chilkey ND75 (wired USB) |
| USB ID | VID `0x36B5` / PID `0x2BA7` (reports as "Paw75 wireless keyboard", SONiX) |
| LEDs | 80 keys, 16×6 grid |
| Tested on | SignalRGB 2.5.86, Windows 11 |

## Install
1. Download `Chilkey_ND75.js`.
2. Copy it to `Documents\WhirlwindFX\Plugins\`.
3. Close the ND75 Driver (`DeviceDriver.exe`) if it's running.
4. Restart SignalRGB (tray icon → Exit, then reopen).
5. **Chilkey ND75** appears under Devices.

## Features
- Per-key colour from any SignalRGB effect
- Forced-colour mode and shutdown colour
- Uses the keyboard's live-preview path, which doesn't write to flash, so streaming doesn't wear the keyboard

## Limitations
- **Wired only.** The 2.4G dongle (`0C45:FEFE`) is not supported.
- **The built-in screen is not controlled.** Upload GIFs with the official ND75 Driver: quit SignalRGB, upload, close the driver, then reopen SignalRGB. The GIF stays on the keyboard.
- The ND75 Driver and SignalRGB can't control the keyboard at the same time.

## Protocol
HID interface 3, usage page `0xFF13`, 65-byte feature reports (report ID 0):

```
04 20 00 00 00 00 00 00 08   header: 8 data packets follow
8 × 64 bytes                 [ledIndex, R, G, B] per LED, offset = ledIndex × 4
04 02                        apply
```

LED indexes come from the official driver's `layouts/rgb-keyboard.xml`.

## Credits
Plugin by **Dum1**. Protocol reverse engineered from the official ND75 Driver.