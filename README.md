# Analyziz 🔬
https://analyziz.online

A web app inspired by [CyberChef](https://github.com/gchq/CyberChef) which aims to make the work of infosec analysts easier.

If you answer yes to one or more of the below then this tool is suitable for you:

- Hate defanging/refanging 🦷 urls and domains by hand? ✅
    - Does looking up the domain on Urlscan, DomainTools, Google sound good? ✅
- Calculate hashes of samples then look them up on VT *without submitting the sample there*? ✅
- How about getting everything you are working on in plain text? ✅
- Does achieving the above via a web browser sound convenient? ✅



Features:
- Calculate MD5, SHA1, SHA256 hashes for files.
    - Lookup hashes on [VirusTotal](https://www.virustotal.com/)
- Defang and Refang URLs.
    - Lookup domains on:
        - [Urlscan.io](http://urlscan.io/)
        - Whois via [DomainTools](https://www.domaintools.com/)
        - Google search (using site operator) [Google](https://google.com)
- Present the hashes, defanged/refanged domains, and urls in text format for easy copy/pasta.

-----

**Note:** The tool only does look ups when using VirusTotal and Urlscan. <u>No submissions are made and no data is collected by the tool.</u>

-----

# Usage
Visit: https://analyziz.online

Or download the code from the releases and put it on a local web server.

# Installing (optional)
## Dependencies
- node
    - npm packages:
        - [browserify](https://browserify.org/)
        - [minify](https://github.com/coderaiser/minify)
        - [fanger](https://github.com/ninoseki/fanger)
- [Crypto-JS](https://github.com/brix/crypto-js) (via [CDNJS](https://cdnjs.com/libraries/crypto-js))

```bash
npm install -g browserify
npm install . # To install fanger
browserify browser.js  -o js/libs.js # to make fanger work in the browser
wget https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js -O js/crypto-js.min.js
# above is for downloading the crypto-js.min.js library on your own, CDN: https://cdnjs.com/libraries/crypto-js

# install deps for creating production build
npm i minify -g # https://github.com/coderaiser/minify
# run prod_build script
# OR run the commands inside the script manually
chmod +x prod_build.sh
./prod_build.sh
# Now the build can be found at prod/dist.zip
```


# Credits

- Inspired me to make the tool: https://github.com/gchq/CyberChef
- Used the following for hashing files: https://github.com/brix/crypto-js
- Used the following for Defanging and Refanging domains and urls: https://github.com/ninoseki/fanger
- http://urlscan.io/
- https://www.virustotal.com/
- https://www.domaintools.com/


# Contribution
Contributions are welcomed. Whether you wish to introduce a new feature, fix bugs, or make general improvements. Make a pull request or open an issue and we'll discuss it.