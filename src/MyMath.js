class MyMath {
    constructor() {

    }

    constrain(num, min, max) {
        const MIN = min
        const MAX = max
        const parsed = parseInt(num)
        return Math.min(Math.max(parsed, MIN), MAX)
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }


    map(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    vhToPx(vh) {
        return window.innerHeight * (vh / 100)
    }

    vwToPx(vw) {
        return window.innerWidth * (vw / 100)
    }

    pxToVh(px) {
        return px * (100 / window.innerHeight)
    }

    pxToVw(px) {
        return px * (100 / window.innerWidth)
    }

    mapRange(n, start1, stop1, start2, stop2, withinBounds) {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    }

}

