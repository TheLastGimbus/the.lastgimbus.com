---
title: "Dual booting Windows *after* encrypted Ubuntu"
date: 2021-12-02T22:33:24+01:00
draft: true
---

Hi there 👋! Soo, this is first post ever 🤭! But don't worry, I won't overwhelm this post with any introductions and will just jump to the point 🎉

If you want to have both Linux and Windows on your PC, you probably already know you can dual-boot them. For most people, it's Windows first and Linux later. In that case, you're all good, because your distro installer will guide you all the way and handle all partition stuff safely 🥰

But if you already have Ubuntu, and want to add Windows to it, **brace yourself**. If you are paranoiac, and installed Ubuntu **with encryption** like me, then you need to prepare for a long journey ;_; - this is what this post will be about

I am making this post because when I wanted to do this, I've searched for literally *5 hours* and found *absolutely nothing*, while I thought this is one of the most common situations out there 🤐

## TL;DR - you *don't* want to do this ;_;
If you are a Ubuntu soyboy like me and don't have time to mess with partitioning and filesystems, you want to avoid doing this at any chance - unless you don't already have 1000 customizations and 50GB of IDEs installed, you probably want to just back up your stuff, install Windows on clear drive and install Ubuntu afterwards.

<img src="/blog/dual-booting-windows-after-encrypted-ubuntu/what-ubuntu-do-you-use.webp" alt="Ubuntu chad meme" width="300"/>

If you didn't resign yet, read along

<sub>Ps. If your Ubuntu is not encrypted, it's not *that* bad - you can just pick first tutorial from Google and should be fine. We are talking about encrypted installation from now on</sub>

## My setup
I did all of this on setup described below. If any of your stuff is different (you use different distro, newer Ubuntu version, ZSF instead of LVM or something) I can't tell if any of steps will work
- Normal x64 (amd64) laptop (no ARM processor or anything)
- Standard modern bios (I think mine is also UEFI (because it's a modern laptop) but doesn't have super flashy gui, just [standard blue+gray-ish stuff](https://us.v-cdn.net/6029997/uploads/editor/x6/0j7x16iix2ls.jpg)
- Secure boot disabled
- 1TB NVMe disk (yours can be SSD/HDD, this doesn't matter)
- Ubuntu 21.04 - installed by "Erase disk and install Ubuntu" -> "Use LVM" -> "Encrypt"

## What we need to do
Windows can't do any of cool "resize other os and install in remaining free space" automatically like most Linux distros - so we will need to do everything manually:
1. Resize Linux partition to make free unallocated space on disk
2. Boot up windows installer from USB
3. Choose free space in windows installer

But because encrypted ubuntu requires you to use LVM, step 1. will take us some effort

LVM stands for Logical Volume Manager - I will not get deeper into this <sup><sub>(since I don't understand it myself)</sub></sup>, but this is some cool new way to "easily" manage, resize and modify ~~partitions~~ volumes

<sup><sub>I put "easily" in quotes because while it allows you to do stuff that classic partitions couldn't, it's more complicated to actually use -_-</sub></sup>

# TODO: The rest


