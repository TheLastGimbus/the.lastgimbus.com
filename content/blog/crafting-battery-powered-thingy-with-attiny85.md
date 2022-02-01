---
title: "Crafting a battery-powered thingy with ATiny85"
date: 2022-01-31T21:14:30+01:00
draft: true
---

You may be reading this post because of two reasons:
 - A - you're looking for resources about reducing ATTiny85 power consumption + deep sleep
 - B - you are really bored and are stalking my personal life
 - <sub><sup> C you're my english teacher considering whether to rise my grade or never read this again</sup></sub>

With both `A` and `B` you should be satisfied - but `A` *may* leave you with unanswered questions, because I'll be talking mainly about my specific use-case (described below).

"Option-A-choosers" should also know that this isn't a typical "scroll down to copy-paste the answer". You should probably read the whole thing :wink:

## What I'll be crafting
Main idea is - a pretty, flashy heart that's ment as a gift :)

Besides being pretty and flashy, it would be awesome if it would also turn out :sparkles:useful:sparkles:

// TODO: Photo of final result

### What it will do
I want it to work like a standard light/torch - you have a single button that you click to enable it, then it changes modes, then it turns off. From user perspective, this is blatantly simple. But form electrical/programming side, it may be a challenge.

The modes/functions:
- some pretty animations like rainbow etc
- torch - 100% brightness with white color
- night light - dim and red-ish light - for walking around a house at night
- backlight - for a bike or night walk - red bright light blinking like a heartbeat
- showing battery level

## Parts
 - For base, I'll use this cheap, brown-ish, single-sided, 5x7cm prototype PCB

   <img src="/blog/crafting-battery-powered-thingy-with-attiny85/banggood_5x7-pcb.webp" width="250px">

   Double-sided green ones may be stronger, but would be a pain to solder since everything would touch the other side...

 - Battery will be taken care of by, beloved, TP4056 :heart:

   <img src="/blog/crafting-battery-powered-thingy-with-attiny85/tp4056.webp" width="200px">

   One thing I did, is replacing it's `R3` resistor with 10kOhm - this will limit the charging current to 130mA. This will be healthier for our battery. Check out this video: https://www.youtube.com/watch?v=6asCEBm4ZAw

   <img src="/blog/crafting-battery-powered-thingy-with-attiny85/tp4056_replaced-r3.webp" width="300px">
   
   Oh, and I'll also de-solder the USB port, since Digispark already has it

 - LEDs of choice are, of course, WS2812. I'll use the strip instead of bear-bones SMD's - it will save some mess with soldering
 - :drum::drum::drum: and at the heart of everything, will be _**the**_ ATTiny85 - precisely, a Digispark board:
 
   <img src="/blog/crafting-battery-powered-thingy-with-attiny85/digispark.webp" width="250px">

After laying everything out, this is how it initially looks:

<img src="/blog/crafting-battery-powered-thingy-with-attiny85/initially-after-soldering_front.webp" width="400px">
<img src="/blog/crafting-battery-powered-thingy-with-attiny85/initially-after-soldering_back.webp" width="400px">

## Making it low-power
...this is the part for all "option-A-choosers"

> Preamble: I am not a professional electronics engineer, and I didn't precisely measure every single step. I messed with this for 3 full days straight, and I'm gonna just tell you what I did :relieved:

Lifecycle we want to achieve:
- *The thingy* will be woken up by a button press, and will turn on the LEDs. In that mode, we don't care about the usage *that much*, but would be nice to bring it down too - that way, we could maybe have the "red backlight" mode running for long time :heart:

- ...after light is turned off, ATtiny goes to deep sleep. This is what we care about **the most**, since user could leave the thingy in that state for *a while* - maybe even a year. And we don't want to waste all the power *while turned off* - do we?

### Cutting away unnecessary parts
First off - [grab yourself a digispark schematic](/blog/crafting-battery-powered-thingy-with-attiny85/digispark-schematic.pdf)

Things from Digispark board that we can throw straight away - they waste power all the time:
- green power LED - this (as well as the red one) take hell lot of power - like 5mA~something => PWR on schematic
- big ass voltage regulator - I don't even know why they put it here - 99% of people will never use it - anyway, it also takes like 10~ish mA => MC78... on schematic

  In its place, I've also put small orange capacitor so the chip has nice smooth power :relieved:

There also is a 1KOhm pull-up resistor (R3 on schema) that keeps wasting power... but it's kinda required for USB communication... Solution? Solder it directly to USB-5V instead of VCC - this way it will only work with USB connected. Guy in this tutorial showed it nicely: https://www.instructables.com/Reducing-Battery-Power-Consumption-for-Digispark-A/ - but he suggests messing with a knife to cut the SMD resistor off (??) - I went ahead, de-soldered it altogether and used my own big ass THT one :relieved:

Ps. If you're evaluating if zener diodes for USB draw power or smth - don't. I tried de-soldering them, and it didn't make a µA difference :ok_hand:

#### Other hardware surprises
This may not apply to you, but it turned out that WS2812's also drain power *while off* :flushed:

Quite a lot of it, actually...

<img src="/blog/crafting-battery-powered-thingy-with-attiny85/ws2812-draining-while-off.webp" width="400px">

This :point_up: is 19-LEDs strip, draining 5.7mA (that's 0.3mA per LED) *while off*! My heart has 10 of those, so - consuming 0.3*10=3mA - with a 150mAh battery - it would go from 100% to 0 in 150/3/24 ~= 2 days - **while off**

That's why I had to add small mosfet transistor to cut the power from LEDs:

<img src="/blog/crafting-battery-powered-thingy-with-attiny85/mosfet-for-leds.webp" width="350px">
