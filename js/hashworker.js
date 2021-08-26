importScripts('crypto-js.min.js');

// https://stackoverflow.com/a/33918579
function arrayBufferToWordArray(ab) {
    var i8a = new Uint8Array(ab);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
}


onmessage = function(e) {
    const file = e.data;
    const sample = {'name': file.name};
    const reader = new FileReaderSync();

    if(!file){  postMessage(undefined); return undefined; }

    const arrayBuffer = reader.readAsArrayBuffer(file);
    if (arrayBuffer) {
        // file contents, convert to CryptoJS word array
        const wa = arrayBufferToWordArray(arrayBuffer);
        // hash
        sample.md5 = CryptoJS.MD5(wa).toString();
        sample.sha1= CryptoJS.SHA1(wa).toString();
        sample.sha256= CryptoJS.SHA256(wa).toString();

        postMessage(sample);
    } else {
        postMessage(undefined);
    }
  }