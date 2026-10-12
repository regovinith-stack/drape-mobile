// 1) copies the 3D engine into www so the app works fully offline
// 2) adds the Android permissions Drape needs (safe to run many times)
const fs = require('fs');
const path = require('path');

const three = path.join('node_modules', 'three', 'build', 'three.min.js');
if (!fs.existsSync(three)) { console.error('Run "npm install" first.'); process.exit(1); }
fs.copyFileSync(three, path.join('www', 'three.min.js'));
console.log('✓ copied three.min.js');

const manifest = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifest)) { console.log('(android/ not created yet, run: npx cap add android, then npm run android)'); process.exit(0); }
let x = fs.readFileSync(manifest, 'utf8');
const perms = ['INTERNET', 'CAMERA', 'ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION', 'POST_NOTIFICATIONS'];
const features = ['android.hardware.camera', 'android.hardware.location.gps'];
let add = '';
for (const p of perms) if (!x.includes('android.permission.' + p)) add += `    <uses-permission android:name="android.permission.${p}" />\n`;
for (const f of features) if (!x.includes(f)) add += `    <uses-feature android:name="${f}" android:required="false" />\n`;
if (add) { x = x.replace('</manifest>', add + '</manifest>'); fs.writeFileSync(manifest, x); }
console.log('✓ Android permissions ready');
