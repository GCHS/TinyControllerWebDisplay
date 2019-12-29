# TinyControllerWebDisplay
A joypad viewer for [OBS](https://obsproject.com). Add as a browser source.

For anti-fingerprinting, the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) does not present any controllers until a button has been pressed. As such, TinyControllerWebDisplay will not show up until a button on a controller has been pressed. Once a button on a controller has been pressed, TinyControllerWebDisplay will display the state of that controller and only that controller until it is restarted. To display a specific controller number, append a fragment after the URL; `#0` at the end for the first controller, `#1` for the second, etc. If you would prefer something other than an Xbox One Elite pad or a DualShock 4 v2, the image assets can be replaced, so long as the filenames are kept. However, the trigger arcs will need to be in the same place, and all moving components will still move in the same directions by the same amount.

TinyControllerWebDisplay takes two optional URL parameters: `?color=F00&type=bar`. To use these in OBS, you need to uncheck the "Local file" option and prefix the filepath with `file://` (add an extra `/` on Windows: `file:///C:...`).

To display a DualShock 4 v2 instead of an Xbox One Elite pad, replace `bar` with `ps4`, `ds4`, `ds4_v2`, or `ds4_rev2`; eg `type=ds4`.

To display a fightstick, use `type=fightstick`, `fight_stick`, `arcadestick`, or `arcade_stick`. If your stick maps the shoulder bumpers to the top row of buttons, add `&bumpers_up=true` to the end of the URL.

To display a hitbox, use `type=hitbox`.

To change the color of the light on the pad displays or the buttons and sticktop on the stick/box displays, replace `F00` with a different [hexcode](https://www.codeconquest.com/hex-color-codes/). TCWD understands `RGB`, `RGBA`, `RRGGBB`, and `RRGGBBAA` color formats.