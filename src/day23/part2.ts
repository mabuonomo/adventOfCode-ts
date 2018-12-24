'use strict';

const fs1 = require('fs');
const data = fs1.readFileSync("./src/day23/input.txt")
    .toString()
    .split('\n')
    .map(v => {
        let match = v.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/);
        // console.log(match)
        return {
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
            z: parseInt(match[3], 10),
            r: parseInt(match[4], 10),
        };
    });

let strongest = null;
let max1 = -Infinity
let minx = Infinity, maxx = -Infinity,
    miny = Infinity, maxy = -Infinity,
    minz = Infinity, maxz = -Infinity;

data.forEach(nb => {
    minx = Math.min(nb.x, minx);
    maxx = Math.max(nb.x, maxx);
    miny = Math.min(nb.x, miny);
    maxy = Math.max(nb.x, maxy);
    minz = Math.min(nb.x, minz);
    maxz = Math.max(nb.x, maxz);

    if (nb.r > max1) {
        max1 = nb.r;
        strongest = nb;
    }
});

const mhd = (a, b) =>
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

let a = data.filter(v => mhd(v, strongest) <= strongest.r);
console.log('part 1:', a.length);

const countBots = bot => {
    let count = 0;
    data.forEach(nb => {
        if (mhd(bot, nb) <= nb.r) count++;
    });
    return count;
};

const inRangeOfVolume = (vol, bot) => {
    let cost = 0;
    if (bot.x > vol.xmax) {
        cost += bot.x - vol.xmax;
    } else if (bot.x < vol.xmin) {
        cost += vol.xmin - bot.x;
    }
    if (bot.y > vol.ymax) {
        cost += bot.y - vol.ymax;
    } else if (bot.y < vol.ymin) {
        cost += vol.ymin - bot.y;
    }
    if (bot.z > vol.zmax) {
        cost += bot.z - vol.zmax;
    } else if (bot.z < vol.zmin) {
        cost += vol.zmin - bot.z;
    }
    return cost <= bot.r;
};

const inRangeOfVolumeWorstCase = (vol, bot) => {
    let cost = 0;
    if (bot.x < vol.xmin) {
        cost += vol.xmax - bot.x;
    } else if (bot.x > vol.xmax) {
        cost += bot.x - vol.xmin;
    } else {
        cost += Math.max(bot.x - vol.xmin, vol.xmax - bot.x);
    }
    if (bot.y < vol.ymin) {
        cost += vol.ymax - bot.y;
    } else if (bot.y > vol.ymax) {
        cost += bot.y - vol.ymin;
    } else {
        cost += Math.max(bot.y - vol.ymin, vol.ymax - bot.y);
    }
    if (bot.z < vol.zmin) {
        cost += vol.zmax - bot.z;
    } else if (bot.z > vol.zmax) {
        cost += bot.z - vol.zmin;
    } else {
        cost += Math.max(bot.z - vol.zmin, vol.zmax - bot.z);
    }
    return cost;
};

const nearestPoint = (vol, bot) => {
    let nx = (bot.x > vol.xmax ? vol.xmax : bot.x < vol.xmin ? vol.xmin : bot.x),
        ny = (bot.y > vol.ymax ? vol.ymax : bot.y < vol.ymin ? vol.ymin : bot.y),
        nz = (bot.z > vol.zmax ? vol.zmax : bot.z < vol.zmin ? vol.zmin : bot.z);
    return {x: nx, y: ny, z: nz};
};

const botsInRange = (vol) => {
    let set = new Set();
    for (let nb of data) {
        if (inRangeOfVolume(vol, nb)) { set.add(nb); }
    }
    return set;
};
const countBotsReachVolume = (vol) => {
    let count = 0;
    for (let nb of data) {
        if (inRangeOfVolume(vol, nb)) count++;
    }
    return count;
};

const setEquals = (a, b) => {
    if (a.size !== b.size) { return false; }
    for (const item of a) { if (!b.has(item)) return false; }
    return true;
};

let vol = {
    xmin: Math.min(minx, miny, minz),
    xmax: Math.max(maxx, maxy, maxz),
    ymin: Math.min(minx, miny, minz),
    ymax: Math.max(maxx, maxy, maxz),
    zmin: Math.min(minx, miny, minz),
    zmax: Math.max(maxx, maxy, maxz),
};

const subdivide = vol => {
    if (vol.xmin === vol.xmax && vol.ymin === vol.ymax && vol.zmin === vol.zmax) {
        return null;
    }

    let xmid = Math.floor((vol.xmax - vol.xmin) / 2 + vol.xmin),
        ymid = Math.floor((vol.ymax - vol.ymin) / 2 + vol.ymin),
        zmid = Math.floor((vol.zmax - vol.zmin) / 2 + vol.zmin);

    return [
        { xmin: vol.xmin, xmax: xmid,     ymin: vol.ymin, ymax: ymid,     zmin: vol.zmin, zmax: zmid     },
        { xmin: xmid + 1, xmax: vol.xmax, ymin: vol.ymin, ymax: ymid,     zmin: vol.zmin, zmax: zmid     },
        { xmin: vol.xmin, xmax: xmid,     ymin: ymid + 1, ymax: vol.ymax, zmin: vol.zmin, zmax: zmid     },
        { xmin: xmid + 1, xmax: vol.xmax, ymin: ymid + 1, ymax: vol.ymax, zmin: vol.zmin, zmax: zmid     },
        { xmin: vol.xmin, xmax: xmid,     ymin: vol.ymin, ymax: ymid,     zmin: zmid + 1, zmax: vol.zmax },
        { xmin: xmid + 1, xmax: vol.xmax, ymin: vol.ymin, ymax: ymid,     zmin: zmid + 1, zmax: vol.zmax },
        { xmin: vol.xmin, xmax: xmid,     ymin: ymid + 1, ymax: vol.ymax, zmin: zmid + 1, zmax: vol.zmax },
        { xmin: xmid + 1, xmax: vol.xmax, ymin: ymid + 1, ymax: vol.ymax, zmin: zmid + 1, zmax: vol.zmax },
    ];
};

let origin2 = {x: 0, y: 0, z: 0};
let vols = [ vol ];
while (
    vols.length > 1 ||
    vols[0].xmin !== vols[0].xmax ||
    vols[0].ymin !== vols[0].ymax ||
    vols[0].zmin !== vols[0].zmax
) {
    let best = -Infinity;

    let newVols = [ ], sets = new Map();
    vols.reduce((acc, cur) =>
        acc.concat(subdivide(cur))
    , [ ]).forEach(v => {
        v.inRange = botsInRange(v);
        let c = v.inRange.size;
        if (c > best) {
            best = c;
            newVols = [ v ];
        } else if (c === best) {
            newVols.push(v);
        }
    });

    newVols.forEach(nv => {
        for (let bestSet of sets.keys()) {
            if (!setEquals(nv.inRange, bestSet)) { continue; }
            let d1 = mhd(nearestPoint(nv, origin2), origin2),
                d2 = mhd(nearestPoint(sets.get(bestSet), origin2), origin2);
            if (d1 < d2) {
                sets.set(bestSet, nv);
            }
            return;
        }
        sets.set(nv.inRange, nv);
    });
    vols = [...sets.values()];
}

let np = nearestPoint(vols[0], origin2);
// console.log(mhd(np, origin2), vols[0].inRange.size, np);
console.log(mhd(np, origin2));//, vols[0], np);