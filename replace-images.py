import sys

file = sys.argv[1]

# find all <img> tags in a file, and replace them with standard markown ![alt](src) tags
# ignore width, height, and other attributes

with open(file, 'r') as f:
    text = f.read()

# find all <img> tags
import re
pattern = re.compile(r'<img.*?>')
imgs = pattern.findall(text)

# replace each <img> tag with markdown ![alt](src) tag
for img in imgs:
    # find src
    pattern = re.compile(r'src="(.*?)"')
    src = pattern.findall(img)[0]
    # find alt
    # don't cry if it's lacking
    pattern = re.compile(r'alt="(.*?)"')
    try:
        alt = pattern.findall(img)[0]
    except:
        alt = ''
    # replace
    text = text.replace(img, '![{0}]({1})'.format(alt, src))

# write to file
with open(file, 'w') as f:
    f.write(text)

