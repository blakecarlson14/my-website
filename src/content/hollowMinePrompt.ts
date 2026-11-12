// The prompt The Hollow Mine was built from, shown on /hollow-mine. Local file paths are replaced
// with placeholders; everything else is as it was sent.
export const hollowMinePrompt = String.raw`Build me an original 2D side-scrolling platformer in Godot 4, in this folder.

Godot is installed at:
[path to Godot]\Godot_v4.7.2-stable_win64_console.exe
Use that console exe from the command line for imports, headless checks and test runs.

GAME
- Classic platformer feel: run left to right, the camera follows the player and stays centered on them (smoothed Camera2D with limits at the level edges).
- Enemies are defeated by jumping on them: only contact from above (player falling, feet above the enemy's top) kills the enemy and bounces the player; touching an enemy from the side or below hurts the player.
- Include 2-3 enemy types with different movement (e.g. a patrolling crawler, a hopping one, a flying/swooping one), a few hazards (pits, spikes or falling rocks), checkpoints, a lives/health system, and a respawn.
- One complete stage, about 4 minutes for a first-time player, with a clear ending: a goal area at the far right that triggers a "Stage Clear" screen with time and score, plus a restart option.
- A simple title screen and a pause menu.

LOOK AND FEEL
- 16-bit pixel art style: low internal resolution (e.g. 384x216 or 320x180) scaled up with nearest-neighbor filtering, pixel snapping on.
- Gothic, cinematic mood set in an abandoned mineshaft: dark stone, wooden supports, rails and minecarts, chains, lanterns, glowing crystals or ore veins.
- Glowing light effects: CanvasModulate for darkness, PointLight2D on lanterns, crystals, the player and some enemies, with flicker on torches; WorldEnvironment glow/bloom; light dust or ember particles.
- At least 4 parallax background layers (Parallax2D or ParallaxBackground) scrolling at different speeds, from distant cavern walls to near foreground supports, plus at least one foreground layer in front of the player.
- Make all art yourself. Generate the pixel-art sprites, tiles and backgrounds procedurally (a GDScript or a script that writes PNGs) instead of downloading assets. The character and enemies must be original designs, not copies of any existing game's characters.
- Optional: simple generated sound effects (jump, stomp, hurt, pickup) if practical.

HOW TO WORK
- Work in small steps and write files a few at a time. Do not try to write the whole project in one response.
- Order: project.godot and folder structure -> art generation -> player controller -> camera and parallax -> tilemap/level layout -> enemies and stomp logic -> lighting and effects -> UI, ending and menus.
- After each step, run Godot headless (e.g. --headless --import, then a short scripted test run) to make sure the project loads with no script errors before moving on.
- When it's done, run the game so I can play it, and tell me the controls and how to launch it from the Godot editor.`;
