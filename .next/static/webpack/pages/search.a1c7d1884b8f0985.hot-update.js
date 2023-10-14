"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/search",{

/***/ "./src/hooks/useDogFilter.ts":
/*!***********************************!*\
  !*** ./src/hooks/useDogFilter.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _s = $RefreshSig$();\n\n\n\nconst useDogFilter = dogData => {\n  _s();\n\n  const [selectedBreed, setSelectedBreed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [ageMin, setAgeMin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [ageMax, setAgeMax] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [isAscending, setIsAscending] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const [sortBy, setSortBy] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"breed\");\n  const [cityFilter, setCityFilter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [stateFilter, setStateFilter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [zipFilter, setZipFilter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const filterDogs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {\n    let filteredDogs = [...dogData];\n\n    if (selectedBreed) {\n      filteredDogs = filteredDogs.filter(dog => dog.breed === selectedBreed);\n    }\n\n    if (ageMin !== null) {\n      filteredDogs = filteredDogs.filter(dog => dog.age >= ageMin);\n    }\n\n    if (ageMax !== null) {\n      filteredDogs = filteredDogs.filter(dog => dog.age <= ageMax);\n    }\n\n    filteredDogs.sort((a, b) => {\n      if (sortBy === \"breed\") {\n        return isAscending ? a.breed.localeCompare(b.breed) : b.breed.localeCompare(a.breed);\n      } else {\n        return isAscending ? a.age - b.age : b.age - a.age;\n      }\n    });\n\n    if (cityFilter) {\n      filteredDogs = filteredDogs.filter(dog => dog.city?.toLowerCase() === cityFilter.toLowerCase());\n    }\n\n    if (stateFilter) {\n      filteredDogs = filteredDogs.filter(dog => dog.state?.toLowerCase() === stateFilter.toLowerCase());\n    }\n\n    if (zipFilter) {\n      filteredDogs = filteredDogs.filter(dog => dog.zip_code === zipFilter);\n    }\n\n    return filteredDogs;\n  }, [dogData, selectedBreed, ageMin, ageMax, isAscending, sortBy, cityFilter, stateFilter, zipFilter]);\n  return {\n    selectedBreed,\n    setSelectedBreed,\n    ageMin,\n    setAgeMin,\n    ageMax,\n    setAgeMax,\n    isAscending,\n    setIsAscending,\n    sortBy,\n    setSortBy,\n    cityFilter,\n    setCityFilter,\n    stateFilter,\n    setStateFilter,\n    zipFilter,\n    setZipFilter,\n    filterDogs\n  };\n};\n\n_s(useDogFilter, \"0baDeOlq1L2Kjy6+ylfnzPtCwi0=\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useDogFilter);\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNVLFFBQUosS0FBaUJmLFNBQTlDLENBQWY7SUFDRDs7SUFFRCxPQUFPRyxZQUFQO0VBQ0QsQ0ExQzZCLEVBMEMzQixDQUNEbEIsT0FEQyxFQUVEQyxhQUZDLEVBR0RFLE1BSEMsRUFJREUsTUFKQyxFQUtERSxXQUxDLEVBTURFLE1BTkMsRUFPREUsVUFQQyxFQVFERSxXQVJDLEVBU0RFLFNBVEMsQ0ExQzJCLENBQTlCO0VBc0RBLE9BQU87SUFDTGQsYUFESztJQUVMQyxnQkFGSztJQUdMQyxNQUhLO0lBSUxDLFNBSks7SUFLTEMsTUFMSztJQU1MQyxTQU5LO0lBT0xDLFdBUEs7SUFRTEMsY0FSSztJQVNMQyxNQVRLO0lBVUxDLFNBVks7SUFXTEMsVUFYSztJQVlMQyxhQVpLO0lBYUxDLFdBYks7SUFjTEMsY0FkSztJQWVMQyxTQWZLO0lBZ0JMQyxZQWhCSztJQWlCTEM7RUFqQkssQ0FBUDtBQW1CRCxDQW5GRDs7R0FBTWxCOztBQXFGTiwrREFBZUEsWUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvaG9va3MvdXNlRG9nRmlsdGVyLnRzP2M3YTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEb2cgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY29uc3QgdXNlRG9nRmlsdGVyID0gKGRvZ0RhdGE6IERvZ1tdKSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZEJyZWVkLCBzZXRTZWxlY3RlZEJyZWVkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbYWdlTWluLCBzZXRBZ2VNaW5dID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFthZ2VNYXgsIHNldEFnZU1heF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQXNjZW5kaW5nLCBzZXRJc0FzY2VuZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW3NvcnRCeSwgc2V0U29ydEJ5XSA9IHVzZVN0YXRlPFwiYnJlZWRcIiB8IFwiYWdlXCI+KFwiYnJlZWRcIik7XG4gIGNvbnN0IFtjaXR5RmlsdGVyLCBzZXRDaXR5RmlsdGVyXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3RhdGVGaWx0ZXIsIHNldFN0YXRlRmlsdGVyXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbemlwRmlsdGVyLCBzZXRaaXBGaWx0ZXJdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgZmlsdGVyRG9ncyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBsZXQgZmlsdGVyZWREb2dzID0gWy4uLmRvZ0RhdGFdO1xuXG4gICAgaWYgKHNlbGVjdGVkQnJlZWQpIHtcbiAgICAgIGZpbHRlcmVkRG9ncyA9IGZpbHRlcmVkRG9ncy5maWx0ZXIoKGRvZykgPT4gZG9nLmJyZWVkID09PSBzZWxlY3RlZEJyZWVkKTtcbiAgICB9XG5cbiAgICBpZiAoYWdlTWluICE9PSBudWxsKSB7XG4gICAgICBmaWx0ZXJlZERvZ3MgPSBmaWx0ZXJlZERvZ3MuZmlsdGVyKChkb2cpID0+IGRvZy5hZ2UgPj0gYWdlTWluKTtcbiAgICB9XG5cbiAgICBpZiAoYWdlTWF4ICE9PSBudWxsKSB7XG4gICAgICBmaWx0ZXJlZERvZ3MgPSBmaWx0ZXJlZERvZ3MuZmlsdGVyKChkb2cpID0+IGRvZy5hZ2UgPD0gYWdlTWF4KTtcbiAgICB9XG5cbiAgICBmaWx0ZXJlZERvZ3Muc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKHNvcnRCeSA9PT0gXCJicmVlZFwiKSB7XG4gICAgICAgIHJldHVybiBpc0FzY2VuZGluZ1xuICAgICAgICAgID8gYS5icmVlZC5sb2NhbGVDb21wYXJlKGIuYnJlZWQpXG4gICAgICAgICAgOiBiLmJyZWVkLmxvY2FsZUNvbXBhcmUoYS5icmVlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNBc2NlbmRpbmcgPyBhLmFnZSAtIGIuYWdlIDogYi5hZ2UgLSBhLmFnZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjaXR5RmlsdGVyKSB7XG4gICAgICBmaWx0ZXJlZERvZ3MgPSBmaWx0ZXJlZERvZ3MuZmlsdGVyKFxuICAgICAgICAoZG9nKSA9PiBkb2cuY2l0eT8udG9Mb3dlckNhc2UoKSA9PT0gY2l0eUZpbHRlci50b0xvd2VyQ2FzZSgpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZUZpbHRlcikge1xuICAgICAgZmlsdGVyZWREb2dzID0gZmlsdGVyZWREb2dzLmZpbHRlcihcbiAgICAgICAgKGRvZykgPT4gZG9nLnN0YXRlPy50b0xvd2VyQ2FzZSgpID09PSBzdGF0ZUZpbHRlci50b0xvd2VyQ2FzZSgpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh6aXBGaWx0ZXIpIHtcbiAgICAgIGZpbHRlcmVkRG9ncyA9IGZpbHRlcmVkRG9ncy5maWx0ZXIoKGRvZykgPT4gZG9nLnppcF9jb2RlID09PSB6aXBGaWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZERvZ3M7XG4gIH0sIFtcbiAgICBkb2dEYXRhLFxuICAgIHNlbGVjdGVkQnJlZWQsXG4gICAgYWdlTWluLFxuICAgIGFnZU1heCxcbiAgICBpc0FzY2VuZGluZyxcbiAgICBzb3J0QnksXG4gICAgY2l0eUZpbHRlcixcbiAgICBzdGF0ZUZpbHRlcixcbiAgICB6aXBGaWx0ZXIsXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRCcmVlZCxcbiAgICBzZXRTZWxlY3RlZEJyZWVkLFxuICAgIGFnZU1pbixcbiAgICBzZXRBZ2VNaW4sXG4gICAgYWdlTWF4LFxuICAgIHNldEFnZU1heCxcbiAgICBpc0FzY2VuZGluZyxcbiAgICBzZXRJc0FzY2VuZGluZyxcbiAgICBzb3J0QnksXG4gICAgc2V0U29ydEJ5LFxuICAgIGNpdHlGaWx0ZXIsXG4gICAgc2V0Q2l0eUZpbHRlcixcbiAgICBzdGF0ZUZpbHRlcixcbiAgICBzZXRTdGF0ZUZpbHRlcixcbiAgICB6aXBGaWx0ZXIsXG4gICAgc2V0WmlwRmlsdGVyLFxuICAgIGZpbHRlckRvZ3MsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VEb2dGaWx0ZXI7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsInVzZURvZ0ZpbHRlciIsImRvZ0RhdGEiLCJzZWxlY3RlZEJyZWVkIiwic2V0U2VsZWN0ZWRCcmVlZCIsImFnZU1pbiIsInNldEFnZU1pbiIsImFnZU1heCIsInNldEFnZU1heCIsImlzQXNjZW5kaW5nIiwic2V0SXNBc2NlbmRpbmciLCJzb3J0QnkiLCJzZXRTb3J0QnkiLCJjaXR5RmlsdGVyIiwic2V0Q2l0eUZpbHRlciIsInN0YXRlRmlsdGVyIiwic2V0U3RhdGVGaWx0ZXIiLCJ6aXBGaWx0ZXIiLCJzZXRaaXBGaWx0ZXIiLCJmaWx0ZXJEb2dzIiwiZmlsdGVyZWREb2dzIiwiZmlsdGVyIiwiZG9nIiwiYnJlZWQiLCJhZ2UiLCJzb3J0IiwiYSIsImIiLCJsb2NhbGVDb21wYXJlIiwiY2l0eSIsInRvTG93ZXJDYXNlIiwic3RhdGUiLCJ6aXBfY29kZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/hooks/useDogFilter.ts\n"));

/***/ })

});