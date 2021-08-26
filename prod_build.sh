echo "minifying main.html..."
minify main.html > index.html
echo "minifying web worker code..."
minify js/hashworker.js > js/hashworker.min.js
echo "minifying app main code..."
minify js/main.js > js/main.min.js
echo "minifying dark theme code..."
minify js/switch.js > js/switch.min.js
echo "minifying libraries..."
minify js/libs.js > js/libs.min.js

echo "copying production code..."
mkdir -p prod/dist/js && mkdir -p prod/dist/css && mkdir -p prod/dist/img
# copy production code
cp index.html prod/dist
cp js/*.min.js prod/dist/js
cp css/* prod/dist/css
cp img/* prod/dist/img
cp robots.txt prod/dist
echo "archiving production code (prod/dist.zip)"
# archive
zip -r prod/dist.zip prod/dist