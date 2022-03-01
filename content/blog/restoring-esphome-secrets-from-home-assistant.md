---
title: "Restoring ESPHome secrets from Home Assistant"
date: 2022-03-01T12:15:00+01:00
draft: false
---

Hi there 👋 !

If you're as a big brain as me 🧠 and, for example, you fried your only PC with your [ESPHome](https://esphome.io/)'s `secrets.yaml` file...

...and now you can't update, nor make new devices because you don't have your api password or encryption key...

...do not worry! You can restore them from [Home Assistant](https://www.home-assistant.io/) itself! Here is how:

> In case you landed here by accident: ESPHome is a super-cool system that allows you to make your own devices like WiFi thermometers, plugs, etc very easily! Check it out: https://esphome.io/
> 
> Home Assistant is a gigachad solution for smart home - it unites all of your Phillips Hue's, Google Home's and Xiaomi's into one, open-source, ✨beautiful✨ dashboard. It's a main usecase of ESPHome. Check it out too: https://www.home-assistant.io/

--- 

They are all stored in `config/.storage/core.config_entries` file 🌈

Open it in some text editor and search for `"password"` or `"noise_psk"` - here they are! Not hashed, not salted, just plain-text 😀

> // Sadly, you can't restore your `web_server` credentials like that :( - but they are not as important 👍

<sub>(for me, it looked like this:)</sub>
```bash
matiii@gimbpc:~$ ssh matiii@matih.duckdns.org
matiii@rpic:~$ cd docker/hass/config/
matiii@rpic:~/docker/hass/config$ grep "noise_psk" .storage/core.config_entries 
                    "noise_psk": "my_encryption_keys_E9KbabCF6occ6kodczlZssGQ="
                    "noise_psk": "my_encryption_keys_E9KbabCF6occ6kodczlZssGQ="
                    "noise_psk": "my_encryption_keys_E9KbabCF6occ6kodczlZssGQ="
                    ...
matiii@rpic:~/docker/hass/config$ grep "password" .storage/core.config_entries 
                    "password": "my_api_password_",
                    "password": "my_api_password_",
                    "password": "my_api_password_",
                    ...
matiii@rpic:~/docker/hass/config$ 
```

<p style="font-size: 300%;">😌😌😌</p>
