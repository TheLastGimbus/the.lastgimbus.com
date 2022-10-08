---
title: "Creating FreeBuddy - Pt. 1 - Reverse Engineering"
date: 2022-09-27T10:04:05+02:00
draft: true
---

Okay, so I want to make my own app for my headphones... umm... how?

Luckily, [I watch Phineas and Ferb](https://www.youtube.com/watch?v=0gjt4L7GmG0), so I know what to do 😎 we're going to reverse-engineer those bastards!

## But *what* are we looking for?

Soo... hmmm... - we are looking for some *data* - data about headphones charge levels, ANC modes, and other stuff...

So we need to find some way to watch **_the data_** sent between headphones and app, and spot stuff that we are looking for

For example, if we find some stream of bytes, we will take a look at charge levels from the app (for example, left bud 60%, right bud 85%, and case 100%), and look for those numbers (possible placed one after the other), like: `[60, 85, 100]`

At this point we're not sure if it will be that easy (for example, Huawei didn't decide to represent them as 0 to 255, or in volts) - but there's a good chance it will 👍

## Where to look?

Bluetooth has two main types: Classic, and Low Energy (BLE)

 - BLE is more than just new hardware that uses less power - it's a whole way of organizing data into services, characteristics... - I will not cover this here, since there are many great articles, and FreeBuds don't use BLE to communicate

 - Classic is fairly simple - it also has some way of organizing stuff to services, but that's it. Once something is a service, it has its own ways to communicate.

We're gonna look at both. BLE will be easier, because we can easily view it with some app, like [nRF Connect](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp)

TODO: Screenshot that nRF shows nothing

Hmm... so no obvious traits here... maybe the official app will help us?

### De-compiling the official app

If we're not sure what protocol to look for, maybe the answer will be inside the app's code?

I tried using different java/apk decompilers, and most useful came out to be:
 - [Apktool](https://ibotpeaches.github.io/Apktool/) - tool for nicely unpacking apks for manifests, resources etc.
 - http://www.javadecompilers.com/ - online general tool for java - gave the best results

#### Stuff found in app resources

With Apktool, I got my hands on couple of interesting `.json`s and `.png`s
