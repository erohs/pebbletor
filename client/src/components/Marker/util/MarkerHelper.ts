export class MarkerHelper {
    static getPointAtPercentage = (pathNode: SVGPathElement, percentage: number) => {
        const length = (pathNode.getTotalLength() / 100) * percentage;
        const svgPoint = pathNode.getPointAtLength(length);
        return [svgPoint.x, svgPoint.y];
    }

    static getClosestPoint = (pathNode: SVGPathElement, point: [number, number]) => {
        let pathLength = pathNode.getTotalLength(), precision = 8, best, bestLength = 0, bestDistance = Infinity;

        for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
            if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                best = scan;
                bestLength = scanLength;
                bestDistance = scanDistance;
            }
        }

        precision /= 2;
        while (precision > 0.5) {
            let before, after, beforeLength, afterLength, beforeDistance, afterDistance;
            if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                best = before;
                bestLength = beforeLength;
                bestDistance = beforeDistance;
            } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                best = after;
                bestLength = afterLength;
                bestDistance = afterDistance;
            } else {
                precision /= 2;
            }
        }

        best = [best?.x, best?.y];
        return best;

        function distance2(p: { x: number, y: number }) {
            var dx = p.x - point[0],
                dy = p.y - point[1];
            return dx * dx + dy * dy;
        }
    }
}
