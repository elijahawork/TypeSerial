// provides TypeScript stack errors
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

(function main() {
    throw new Error('Hello, world');
})();