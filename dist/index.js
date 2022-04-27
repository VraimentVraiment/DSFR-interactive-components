/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/hashtable.ts":
/*!******************************!*\
  !*** ./src/lib/hashtable.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VariantsHashTable)
/* harmony export */ });
class VariantsHashTable extends Map {
    constructor(watchKey) {
        super();
        this.watchKey = watchKey;
    }
    addVariant(variant) {
        const key = this.getHashKey(variant);
        if (!this.has(key)) {
            this.set(key, {});
        }
        const variants = this.get(key);
        variants[variant.variantProperties[this.watchKey]] = variant;
        return variants;
    }
    getHashKey(variant) {
        return Object
            .keys(variant.variantProperties)
            .filter(key => key !== this.watchKey)
            .sort()
            .map(key => variant.variantProperties[key])
            .join();
    }
}


/***/ }),

/***/ "./src/lib/loop.ts":
/*!*************************!*\
  !*** ./src/lib/loop.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loopThroughComponents)
/* harmony export */ });
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./states */ "./src/lib/states.ts");
/* harmony import */ var _hashtable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hashtable */ "./src/lib/hashtable.ts");


let count = 0;
function loopThroughComponents(components) {
    for (let i = 0; i < components.length; i++) {
        const componentStates = components[i]
            .variantGroupProperties["État"]
            .values;
        const variants = components[i]
            .children;
        const triggers = (0,_states__WEBPACK_IMPORTED_MODULE_0__.getComponentTriggers)(componentStates);
        loopThroughVariants(variants, triggers);
    }
}
function loopThroughVariants(variants, triggers) {
    const hashTable = new _hashtable__WEBPACK_IMPORTED_MODULE_1__["default"]("État");
    count += variants.length;
    for (let j = 0; j < variants.length; j++) {
        if (!variants[j].variantProperties["État"])
            continue;
        const hashedVariants = hashTable.addVariant(variants[j]);
        const hashedVariantsStates = Object.keys(hashedVariants);
        if (!(0,_states__WEBPACK_IMPORTED_MODULE_0__.everyTriggerMatch)(hashedVariantsStates, triggers))
            continue;
        (0,_states__WEBPACK_IMPORTED_MODULE_0__.addReactions)(hashedVariants, triggers);
    }
}


/***/ }),

/***/ "./src/lib/selection.ts":
/*!******************************!*\
  !*** ./src/lib/selection.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ selectComponents)
/* harmony export */ });
function selectComponents() {
    let selection = figma.currentPage.selection;
    return selection.length ?
        getComponentSets.inSelection(selection) :
        getComponentSets.inPage();
}
const getComponentSets = {
    inSelection(selection) {
        return selection.filter(({ type }) => {
            return type === "COMPONENT_SET";
        });
    },
    inPage() {
        return figma.currentPage
            .findAllWithCriteria({ types: ['COMPONENT_SET'] });
    }
};


/***/ }),

/***/ "./src/lib/states.ts":
/*!***************************!*\
  !*** ./src/lib/states.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addReactions": () => (/* binding */ addReactions),
/* harmony export */   "everyTriggerMatch": () => (/* binding */ everyTriggerMatch),
/* harmony export */   "getComponentTriggers": () => (/* binding */ getComponentTriggers),
/* harmony export */   "triggersMatch": () => (/* binding */ triggersMatch)
/* harmony export */ });
const POSSIBLE_TRIGGERS = [
    { type: "ON_HOVER", source: "Défaut", target: "Survol" },
    { type: "ON_CLICK", source: "Focus", target: "Cliqué" },
    { type: "ON_PRESS", source: "Survol", target: "Focus" },
];
function getComponentTriggers(stateValues) {
    return POSSIBLE_TRIGGERS.filter(triggersMatch(stateValues));
}
function triggersMatch(stateValues) {
    return ({ source, target }) => {
        return (stateValues.includes(source) &&
            stateValues.includes(target));
    };
}
function everyTriggerMatch(stateValues, triggers) {
    return triggers
        .every(triggersMatch(stateValues));
}
function addReactions(variants, triggers) {
    for (const { type, source, target } of triggers) {
        addReaction(variants[source], variants[target], { type });
    }
}
function addReaction(sourceVariant, targetVariant, trigger) {
    sourceVariant.reactions = [{
            trigger,
            action: {
                type: "NODE",
                navigation: "CHANGE_TO",
                destinationId: targetVariant.id,
                transition: null,
                preserveScrollPosition: false,
            }
        }];
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/selection */ "./src/lib/selection.ts");
/* harmony import */ var _lib_loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/loop */ "./src/lib/loop.ts");


figma.skipInvisibleInstanceChildren = true;
const components = (0,_lib_selection__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_lib_loop__WEBPACK_IMPORTED_MODULE_1__["default"])(components);
figma.closePlugin();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJpRjtBQUNyQztBQUM1QztBQUNlO0FBQ2Ysb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZEQUFvQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrREFBaUI7QUFDM0M7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwREFBaUI7QUFDOUI7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekM7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQ0FBbUMsMEJBQTBCO0FBQzdEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBLE1BQU0sc0RBQXNEO0FBQzVELE1BQU0scURBQXFEO0FBQzNELE1BQU0scURBQXFEO0FBQzNEO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUCxjQUFjLGdCQUFnQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUCxpQkFBaUIsdUJBQXVCO0FBQ3hDLDBEQUEwRCxNQUFNO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7Ozs7OztVQ2xDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNBO0FBQy9DO0FBQ0EsbUJBQW1CLDBEQUFnQjtBQUNuQyxxREFBcUI7QUFDckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kc2ZyLWludGVyYWN0aXZlLWNvbXBvbmVudC8uL3NyYy9saWIvaGFzaHRhYmxlLnRzIiwid2VicGFjazovL2RzZnItaW50ZXJhY3RpdmUtY29tcG9uZW50Ly4vc3JjL2xpYi9sb29wLnRzIiwid2VicGFjazovL2RzZnItaW50ZXJhY3RpdmUtY29tcG9uZW50Ly4vc3JjL2xpYi9zZWxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZHNmci1pbnRlcmFjdGl2ZS1jb21wb25lbnQvLi9zcmMvbGliL3N0YXRlcy50cyIsIndlYnBhY2s6Ly9kc2ZyLWludGVyYWN0aXZlLWNvbXBvbmVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kc2ZyLWludGVyYWN0aXZlLWNvbXBvbmVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHNmci1pbnRlcmFjdGl2ZS1jb21wb25lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kc2ZyLWludGVyYWN0aXZlLWNvbXBvbmVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RzZnItaW50ZXJhY3RpdmUtY29tcG9uZW50Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhbnRzSGFzaFRhYmxlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3YXRjaEtleSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndhdGNoS2V5ID0gd2F0Y2hLZXk7XG4gICAgfVxuICAgIGFkZFZhcmlhbnQodmFyaWFudCkge1xuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEhhc2hLZXkodmFyaWFudCk7XG4gICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFyaWFudHMgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICB2YXJpYW50c1t2YXJpYW50LnZhcmlhbnRQcm9wZXJ0aWVzW3RoaXMud2F0Y2hLZXldXSA9IHZhcmlhbnQ7XG4gICAgICAgIHJldHVybiB2YXJpYW50cztcbiAgICB9XG4gICAgZ2V0SGFzaEtleSh2YXJpYW50KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzKHZhcmlhbnQudmFyaWFudFByb3BlcnRpZXMpXG4gICAgICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkgIT09IHRoaXMud2F0Y2hLZXkpXG4gICAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgICAubWFwKGtleSA9PiB2YXJpYW50LnZhcmlhbnRQcm9wZXJ0aWVzW2tleV0pXG4gICAgICAgICAgICAuam9pbigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGdldENvbXBvbmVudFRyaWdnZXJzLCBldmVyeVRyaWdnZXJNYXRjaCwgYWRkUmVhY3Rpb25zIH0gZnJvbSBcIi4vc3RhdGVzXCI7XG5pbXBvcnQgVmFyaWFudHNIYXNoVGFibGUgZnJvbSBcIi4vaGFzaHRhYmxlXCI7XG5sZXQgY291bnQgPSAwO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9vcFRocm91Z2hDb21wb25lbnRzKGNvbXBvbmVudHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50U3RhdGVzID0gY29tcG9uZW50c1tpXVxuICAgICAgICAgICAgLnZhcmlhbnRHcm91cFByb3BlcnRpZXNbXCLDiXRhdFwiXVxuICAgICAgICAgICAgLnZhbHVlcztcbiAgICAgICAgY29uc3QgdmFyaWFudHMgPSBjb21wb25lbnRzW2ldXG4gICAgICAgICAgICAuY2hpbGRyZW47XG4gICAgICAgIGNvbnN0IHRyaWdnZXJzID0gZ2V0Q29tcG9uZW50VHJpZ2dlcnMoY29tcG9uZW50U3RhdGVzKTtcbiAgICAgICAgbG9vcFRocm91Z2hWYXJpYW50cyh2YXJpYW50cywgdHJpZ2dlcnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvb3BUaHJvdWdoVmFyaWFudHModmFyaWFudHMsIHRyaWdnZXJzKSB7XG4gICAgY29uc3QgaGFzaFRhYmxlID0gbmV3IFZhcmlhbnRzSGFzaFRhYmxlKFwiw4l0YXRcIik7XG4gICAgY291bnQgKz0gdmFyaWFudHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFyaWFudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKCF2YXJpYW50c1tqXS52YXJpYW50UHJvcGVydGllc1tcIsOJdGF0XCJdKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGhhc2hlZFZhcmlhbnRzID0gaGFzaFRhYmxlLmFkZFZhcmlhbnQodmFyaWFudHNbal0pO1xuICAgICAgICBjb25zdCBoYXNoZWRWYXJpYW50c1N0YXRlcyA9IE9iamVjdC5rZXlzKGhhc2hlZFZhcmlhbnRzKTtcbiAgICAgICAgaWYgKCFldmVyeVRyaWdnZXJNYXRjaChoYXNoZWRWYXJpYW50c1N0YXRlcywgdHJpZ2dlcnMpKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGFkZFJlYWN0aW9ucyhoYXNoZWRWYXJpYW50cywgdHJpZ2dlcnMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdENvbXBvbmVudHMoKSB7XG4gICAgbGV0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmxlbmd0aCA/XG4gICAgICAgIGdldENvbXBvbmVudFNldHMuaW5TZWxlY3Rpb24oc2VsZWN0aW9uKSA6XG4gICAgICAgIGdldENvbXBvbmVudFNldHMuaW5QYWdlKCk7XG59XG5jb25zdCBnZXRDb21wb25lbnRTZXRzID0ge1xuICAgIGluU2VsZWN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLmZpbHRlcigoeyB0eXBlIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSBcIkNPTVBPTkVOVF9TRVRcIjtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpblBhZ2UoKSB7XG4gICAgICAgIHJldHVybiBmaWdtYS5jdXJyZW50UGFnZVxuICAgICAgICAgICAgLmZpbmRBbGxXaXRoQ3JpdGVyaWEoeyB0eXBlczogWydDT01QT05FTlRfU0VUJ10gfSk7XG4gICAgfVxufTtcbiIsImNvbnN0IFBPU1NJQkxFX1RSSUdHRVJTID0gW1xuICAgIHsgdHlwZTogXCJPTl9IT1ZFUlwiLCBzb3VyY2U6IFwiRMOpZmF1dFwiLCB0YXJnZXQ6IFwiU3Vydm9sXCIgfSxcbiAgICB7IHR5cGU6IFwiT05fQ0xJQ0tcIiwgc291cmNlOiBcIkZvY3VzXCIsIHRhcmdldDogXCJDbGlxdcOpXCIgfSxcbiAgICB7IHR5cGU6IFwiT05fUFJFU1NcIiwgc291cmNlOiBcIlN1cnZvbFwiLCB0YXJnZXQ6IFwiRm9jdXNcIiB9LFxuXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRUcmlnZ2VycyhzdGF0ZVZhbHVlcykge1xuICAgIHJldHVybiBQT1NTSUJMRV9UUklHR0VSUy5maWx0ZXIodHJpZ2dlcnNNYXRjaChzdGF0ZVZhbHVlcykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXJzTWF0Y2goc3RhdGVWYWx1ZXMpIHtcbiAgICByZXR1cm4gKHsgc291cmNlLCB0YXJnZXQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKHN0YXRlVmFsdWVzLmluY2x1ZGVzKHNvdXJjZSkgJiZcbiAgICAgICAgICAgIHN0YXRlVmFsdWVzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZXZlcnlUcmlnZ2VyTWF0Y2goc3RhdGVWYWx1ZXMsIHRyaWdnZXJzKSB7XG4gICAgcmV0dXJuIHRyaWdnZXJzXG4gICAgICAgIC5ldmVyeSh0cmlnZ2Vyc01hdGNoKHN0YXRlVmFsdWVzKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUmVhY3Rpb25zKHZhcmlhbnRzLCB0cmlnZ2Vycykge1xuICAgIGZvciAoY29uc3QgeyB0eXBlLCBzb3VyY2UsIHRhcmdldCB9IG9mIHRyaWdnZXJzKSB7XG4gICAgICAgIGFkZFJlYWN0aW9uKHZhcmlhbnRzW3NvdXJjZV0sIHZhcmlhbnRzW3RhcmdldF0sIHsgdHlwZSB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRSZWFjdGlvbihzb3VyY2VWYXJpYW50LCB0YXJnZXRWYXJpYW50LCB0cmlnZ2VyKSB7XG4gICAgc291cmNlVmFyaWFudC5yZWFjdGlvbnMgPSBbe1xuICAgICAgICAgICAgdHJpZ2dlcixcbiAgICAgICAgICAgIGFjdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiTk9ERVwiLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IFwiQ0hBTkdFX1RPXCIsXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25JZDogdGFyZ2V0VmFyaWFudC5pZCxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlU2Nyb2xsUG9zaXRpb246IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHNlbGVjdENvbXBvbmVudHMgZnJvbSBcIi4vbGliL3NlbGVjdGlvblwiO1xuaW1wb3J0IGxvb3BUaHJvdWdoQ29tcG9uZW50cyBmcm9tIFwiLi9saWIvbG9vcFwiO1xuZmlnbWEuc2tpcEludmlzaWJsZUluc3RhbmNlQ2hpbGRyZW4gPSB0cnVlO1xuY29uc3QgY29tcG9uZW50cyA9IHNlbGVjdENvbXBvbmVudHMoKTtcbmxvb3BUaHJvdWdoQ29tcG9uZW50cyhjb21wb25lbnRzKTtcbmZpZ21hLmNsb3NlUGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=