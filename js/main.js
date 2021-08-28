// Libs and Globals
const refang = window.refang;
const defang = window.defang;
const form_html = document.getElementById('form');
const report_html = document.getElementById('report');
const output_field = document.getElementById('output');
const sample = {
    'name': '', 'size': '',
    'md5': '', 'sha1': '', 'sha256': ''
};
var ready_urls;

// FUNCTIONS
// https://stackoverflow.com/a/23945027
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}

// https://stackoverflow.com/a/52788557
function createTable() {
    const empTable = document.createElement('table');
    empTable.setAttribute('id', 'dynamic-domains-table');
    if(document.getElementById('lightSwitch').checked){
        empTable.setAttribute('class', 'table table-dark table-sm table-bordered');
    } else{
        empTable.setAttribute('class', 'table table-light table-sm table-bordered');
    }

    var tr = empTable.insertRow(-1);
    const arrHead = ["Url", "Search (Domain Only)"];
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th');
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('domains-table');
    div.appendChild(empTable);
}
// ADD A NEW ROW TO THE TABLE
function addRow(text) {
    const tbl = document.getElementById('dynamic-domains-table');
    const rowCnt = tbl.rows.length;        // GET TABLE ROW COUNT.
    var tr = tbl.insertRow(rowCnt);      // TABLE ROW.
    tr = tbl.insertRow(rowCnt);
    // c = cells
    for (var c = 0; c < 2; c++) {
        var td = document.createElement('td');          // TABLE DEFINITION.
        td = tr.insertCell(c);
        if (c == 0) {           // FIRST COLUMN.
            // ADD A BUTTON.
            var txtInput = document.createElement('input');
            // SET INPUT ATTRIBUTE.
            txtInput.setAttribute('type', 'text');
            txtInput.setAttribute('value', text);
            txtInput.setAttribute('class', 'form-control form-control-sm m-1');
            txtInput.readOnly = true;
            td.appendChild(txtInput);
        } else {
            // CREATE AND ADD TEXTBOX IN EACH CELL.
            const aUrlscan = document.createElement('a');
            const aGoogle = document.createElement('a');
            const aDomainTools = document.createElement('a');
            const aVT = document.createElement('a');
            const aSafeBrowsing = document.createElement('a');
            const aURLHause = document.createElement('a');
            // In case current url/domain was defanged
            const r = refang(text);
            aUrlscan.setAttribute('href', `https://urlscan.io/search/#domain%3A${extractHostname(r)}`);
            aUrlscan.setAttribute('class', 'btn btn-warning btn-sm m-1');
            aUrlscan.setAttribute('target', '_blank');
            aUrlscan.setAttribute('rel', 'noopener noreferrer');
            aUrlscan.innerHTML = 'Urlscan';
            aGoogle.setAttribute('href', `https://google.com/search?q=site%3A${extractHostname(r)}`);
            aGoogle.setAttribute('class', 'btn btn-success btn-sm m-1');
            aGoogle.setAttribute('target', '_blank');
            aGoogle.setAttribute('rel', 'noopener noreferrer');
            aGoogle.innerHTML = 'Google';
            aDomainTools.setAttribute('href', `https://whois.domaintools.com/${extractHostname(r)}`);
            aDomainTools.setAttribute('class', 'btn btn-secondary btn-sm m-1');
            aDomainTools.setAttribute('target', '_blank');
            aDomainTools.setAttribute('rel', 'noopener noreferrer');
            aDomainTools.innerHTML = 'Domain Tools';
            aVT.setAttribute('href', `https://www.virustotal.com/gui/domain/${extractHostname(r)}`);
            aVT.setAttribute('class', 'btn btn-info btn-sm');
            aVT.setAttribute('target', '_blank');
            aVT.setAttribute('rel', 'noopener noreferrer');
            aVT.innerHTML = 'VT';
            aSafeBrowsing.setAttribute('href', `https://transparencyreport.google.com/safe-browsing/search?url=${extractHostname(r)}`);
            aSafeBrowsing.setAttribute('class', 'btn btn-success btn-sm m-1');
            aSafeBrowsing.setAttribute('target', '_blank');
            aSafeBrowsing.setAttribute('rel', 'noopener noreferrer');
            aSafeBrowsing.innerHTML = 'SafeBrowsing';
            aURLHause.setAttribute('href', `https://urlhaus.abuse.ch/browse.php?search=${extractHostname(r)}`);
            aURLHause.setAttribute('class', 'btn btn-secondary btn-sm m-1');
            aURLHause.setAttribute('target', '_blank');
            aURLHause.setAttribute('rel', 'noopener noreferrer');
            aURLHause.innerHTML = 'URLHause';


            // td.setAttribute('style', 'width:20%')
            td.appendChild(aUrlscan);
            td.appendChild(aGoogle);
            td.appendChild(aDomainTools);
            td.appendChild(aVT);
            td.appendChild(aSafeBrowsing);
            td.appendChild(aURLHause);
        }
    }
}


function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    };
    navigator.clipboard.writeText(text).then(function() {},
    function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function handleHashFieldsClick(e) {
    if(e.target.tagName === 'INPUT'){
        copyTextToClipboard(e.target.value);
    } else if(e.target.tagName === 'I') {
        e.target.parentNode.parentNode.childNodes.forEach(function (elem){
            if (elem.attributes){
                if(elem.attributes.type && elem.attributes.type.value==='text'){
                    copyTextToClipboard(elem.value);
                }
        }
        });
    } else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.childNodes.forEach(function (elem){
            if (elem.attributes){
                if(elem.attributes.type && elem.attributes.type.value==='text'){
                    copyTextToClipboard(elem.value);
                }
            }
        });
    } 
}

function handleDomains(e) {
    // clear table
    const tbl = document.getElementById('domains-table');
    tbl.innerHTML = "";
    // add new rows
    if(e.target.value){
        if(e.target.value.indexOf('.') > -1){
            createTable();
            var lines = e.target.value.split('\n');
            for(var i = 0; i < lines.length; i++){
                // if entry is a domain
                if(lines[i].indexOf('.') > -1){
                    addRow(lines[i]);
                }
            }
        }
        tbl.hidden = false;
    }
}

function handleFangRadios(){
    const urlsElem = document.getElementById('domains-textarea');
    const urls = urlsElem.value;
    const opt  = document.querySelector("input[name='defang-refang']:checked").value;
    if (opt === "none"){
        ready_urls = urls
    } else if (opt === "defang"){
        ready_urls = defang(urls)
    } else if (opt === "refang"){
        ready_urls = refang(urls);
    }
    urlsElem.value = ready_urls;
    const event = new Event('change');
    urlsElem.dispatchEvent(event)
}

////////
var ready = (callback) => {
    if (document.readyState != 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
}
ready(() => {
    // Copy Hashes to ClipBoard
    const hashFields = document.querySelectorAll('[id^=hash-');
    hashFields.forEach(function(elem){
        elem.addEventListener('click', handleHashFieldsClick)
    });
    
    const fangRadios = document.querySelectorAll('input[type=radio][name=defang-refang]');
    fangRadios.forEach(function(elem){
        elem.addEventListener('change', handleFangRadios)
    });
    
    document.getElementById('domains-textarea').addEventListener('change', handleDomains);
    // File Submission
    if (window.Worker) {
        const hash_md5 = document.getElementById('hash-md5');
        const hash_sha1 = document.getElementById('hash-sha1');
        const hash_sha256 = document.getElementById('hash-sha256');
        const vt_md5 = document.getElementById('vt-md5');
        const vt_sha1 = document.getElementById('vt-sha1');
        const vt_sha256 = document.getElementById('vt-sha256');
        const bazaar_md5 = document.getElementById('bazaar-md5');
        const bazaar_sha1 = document.getElementById('bazaar-sha1');
        const bazaar_sha256 = document.getElementById('bazaar-sha256');
        const hashWorker = new Worker("js/hashworker.min.js");
        hashWorker.onmessage = function(e) {
            sample.md5 = e.data.md5;
            sample.sha1 = e.data.sha1;
            sample.sha256 = e.data.sha256;
            // Worker hash results 
            hash_md5.value = sample.md5;
            hash_sha1.value = sample.sha1;
            hash_sha256.value =sample.sha256;
            vt_md5.setAttribute('href', `https://www.virustotal.com/gui/file/${sample.md5}/detection`);
            vt_sha1.setAttribute('href', `https://www.virustotal.com/gui/file/${sample.sha1}/detection`);
            vt_sha256.setAttribute('href', `https://www.virustotal.com/gui/file/${sample.sha256}/detection`);
            bazaar_md5.setAttribute('href', `https://bazaar.abuse.ch/browse.php?search=md5:${hash_md5.value}`);
            bazaar_sha1.setAttribute('href', `https://bazaar.abuse.ch/browse.php?search=sha1:${hash_sha1.value}`);
            bazaar_sha256.setAttribute('href', `https://bazaar.abuse.ch/browse.php?search=sha256:${hash_sha256.value}`);
        }
        // Handle sample upload
        document.getElementById('sample').addEventListener('change' , function(e){
            var files = e.target.files; // FileList object
            var file = files[0];
            sample.name = file.name;
            sample.size = file.size;
            hash_md5.value = 'Please wait...';
            hash_sha1.value = 'Please wait...';
            hash_sha256.value = 'Please wait...';
            hashWorker.postMessage(file);
        });
    }
    // Generate Button
    document.getElementById('generate').addEventListener('click',function(e){
        handleFangRadios();
        // $('#sample').trigger('change');
        var msg = ""
        if(sample.name){
            msg += `Sample Name: ${sample.name}\n` + 
            `Sample Size: ${sample.size}\n\n` +
            `Hashes:\n` +
            `MD5: ${sample.md5}\nSHA1: ${sample.sha1}\nSHA256: ${sample.sha256}\n\n`;
        } if (ready_urls) {
            msg += `Urls and Domains:\n${ready_urls}\n\n`;
        }
        form_html.hidden = true;;
        output_field.value = msg;
        const value = document.getElementById('sample').value;
        report_html.hidden = false;
    });
    // Back Button
    document.getElementById('back').addEventListener('click', function (e){
        report_html.hidden = true;
        form_html.hidden = false;
    });
});