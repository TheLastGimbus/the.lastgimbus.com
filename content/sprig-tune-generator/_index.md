---
title: "Sprig Tune Generator"
date: 2023-02-04T16:18:22+01:00
draft: false
---

# MIDI-to-Sprig 🎼->📜

Sprig is an awesome game console that you can get only by creating a game for it!

https://sprig.hackclub.com/

<img src="https://user-images.githubusercontent.com/27078897/186769641-5b1181b4-9969-4276-9fa0-9f15140e4a9b.jpg" width="350px" height="217px">

It comes with ultra-simple JavaScript game engine which allows you to start gaming very fast!

Below is a converter that takes a midi file - which you can create by, for example, making your own music with a piano keyboard 🎹...

...and spits out code understood by the Sprig engine, so you can play your own cool music in your games!

Select a `.mid` file:

{{< sprig-tune-generator >}}

Then, use this in your code as such:

```javascript
// PASTED FROM GEN
// a list of all tracks found in the midi file
let tracks = [ ...
...];

tracks.forEach((e) => playTune(e));
// done! playing your music now!
```
