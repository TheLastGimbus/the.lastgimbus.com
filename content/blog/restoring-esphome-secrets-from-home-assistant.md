---
title: "Restoring ESPHome secrets from Home Assistant"
date: 2022-03-01T12:15:00+01:00
draft: false
---

Hi there 👋 !

If you're as a big brain as me 🧠 and, for example, you fried your only PC with your ESPHome's `secrets.yaml` file...

...and now you can't update, nor make new devices because you don't have your api password or encryption key...

...do not worry! You can restore them from Home Assistant itself! Here is how:

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
