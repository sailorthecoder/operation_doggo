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

/***/ "./src/hooks/usePagination.ts":
/*!************************************!*\
  !*** ./src/hooks/usePagination.ts ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _s = $RefreshSig$();\n\n\n\nconst usePagination = ({\n  initialData,\n  filterFunction,\n  pageSize = 25\n}) => {\n  _s();\n\n  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);\n  const [totalItems, setTotalItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const totalPages = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setIsLoading(true);\n    const filteredData = filterFunction(initialData);\n    const startIndex = (currentPage - 1) * pageSize;\n    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);\n    setTotalItems(filteredData.length);\n    setData(paginatedData);\n    setIsLoading(false);\n  }, [initialData, filterFunction, currentPage, pageSize]);\n\n  const handleNextPage = () => {\n    if (currentPage < totalPages) {\n      setCurrentPage(prevPage => prevPage + 1);\n    }\n  };\n\n  const handlePrevPage = () => {\n    if (currentPage > 1) {\n      setCurrentPage(prevPage => prevPage - 1);\n    }\n  };\n\n  return {\n    data,\n    currentPage,\n    totalPages,\n    handleNextPage,\n    handlePrevPage,\n    setCurrentPage,\n    isLoading\n  };\n};\n\n_s(usePagination, \"ItXEepUpa/ap2dSwmrghwR64p88=\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (usePagination);\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvdXNlUGFnaW5hdGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUdBLE1BQU1HLGFBQWEsR0FBRyxDQUFDO0VBQ3JCQyxXQURxQjtFQUVyQkMsY0FGcUI7RUFHckJDLFFBQVEsR0FBRztBQUhVLENBQUQsS0FJSTtFQUFBOztFQUN4QixNQUFNLENBQUNDLElBQUQsRUFBT0MsT0FBUCxJQUFrQlIsK0NBQVEsQ0FBUSxFQUFSLENBQWhDO0VBQ0EsTUFBTSxDQUFDUyxXQUFELEVBQWNDLGNBQWQsSUFBZ0NWLCtDQUFRLENBQVMsQ0FBVCxDQUE5QztFQUNBLE1BQU0sQ0FBQ1csVUFBRCxFQUFhQyxhQUFiLElBQThCWiwrQ0FBUSxDQUFTLENBQVQsQ0FBNUM7RUFDQSxNQUFNLENBQUNhLFNBQUQsRUFBWUMsWUFBWixJQUE0QmQsK0NBQVEsQ0FBVSxJQUFWLENBQTFDO0VBRUEsTUFBTWUsVUFBVSxHQUFHYiw4Q0FBTyxDQUN4QixNQUFNYyxJQUFJLENBQUNDLElBQUwsQ0FBVU4sVUFBVSxHQUFHTCxRQUF2QixDQURrQixFQUV4QixDQUFDSyxVQUFELEVBQWFMLFFBQWIsQ0FGd0IsQ0FBMUI7RUFLQUwsZ0RBQVMsQ0FBQyxNQUFNO0lBQ2RhLFlBQVksQ0FBQyxJQUFELENBQVo7SUFDQSxNQUFNSSxZQUFZLEdBQUdiLGNBQWMsQ0FBQ0QsV0FBRCxDQUFuQztJQUNBLE1BQU1lLFVBQVUsR0FBRyxDQUFDVixXQUFXLEdBQUcsQ0FBZixJQUFvQkgsUUFBdkM7SUFDQSxNQUFNYyxhQUFhLEdBQUdGLFlBQVksQ0FBQ0csS0FBYixDQUFtQkYsVUFBbkIsRUFBK0JBLFVBQVUsR0FBR2IsUUFBNUMsQ0FBdEI7SUFDQU0sYUFBYSxDQUFDTSxZQUFZLENBQUNJLE1BQWQsQ0FBYjtJQUNBZCxPQUFPLENBQUNZLGFBQUQsQ0FBUDtJQUNBTixZQUFZLENBQUMsS0FBRCxDQUFaO0VBQ0QsQ0FSUSxFQVFOLENBQUNWLFdBQUQsRUFBY0MsY0FBZCxFQUE4QkksV0FBOUIsRUFBMkNILFFBQTNDLENBUk0sQ0FBVDs7RUFVQSxNQUFNaUIsY0FBYyxHQUFHLE1BQU07SUFDM0IsSUFBSWQsV0FBVyxHQUFHTSxVQUFsQixFQUE4QjtNQUM1QkwsY0FBYyxDQUFFYyxRQUFELElBQWNBLFFBQVEsR0FBRyxDQUExQixDQUFkO0lBQ0Q7RUFDRixDQUpEOztFQU1BLE1BQU1DLGNBQWMsR0FBRyxNQUFNO0lBQzNCLElBQUloQixXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7TUFDbkJDLGNBQWMsQ0FBRWMsUUFBRCxJQUFjQSxRQUFRLEdBQUcsQ0FBMUIsQ0FBZDtJQUNEO0VBQ0YsQ0FKRDs7RUFNQSxPQUFPO0lBQ0xqQixJQURLO0lBRUxFLFdBRks7SUFHTE0sVUFISztJQUlMUSxjQUpLO0lBS0xFLGNBTEs7SUFNTGYsY0FOSztJQU9MRztFQVBLLENBQVA7QUFTRCxDQTlDRDs7R0FBTVY7O0FBZ0ROLCtEQUFlQSxhQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9ob29rcy91c2VQYWdpbmF0aW9uLnRzP2M2NGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRG9nLCBVc2VQYWdpbmF0aW9uUHJvcHMgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY29uc3QgdXNlUGFnaW5hdGlvbiA9ICh7XG4gIGluaXRpYWxEYXRhLFxuICBmaWx0ZXJGdW5jdGlvbixcbiAgcGFnZVNpemUgPSAyNSxcbn06IFVzZVBhZ2luYXRpb25Qcm9wcykgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZTxEb2dbXT4oW10pO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlPG51bWJlcj4oMSk7XG4gIGNvbnN0IFt0b3RhbEl0ZW1zLCBzZXRUb3RhbEl0ZW1zXSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBhZ2VTaXplKSxcbiAgICBbdG90YWxJdGVtcywgcGFnZVNpemVdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgY29uc3QgZmlsdGVyZWREYXRhID0gZmlsdGVyRnVuY3Rpb24oaW5pdGlhbERhdGEpO1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICAgIGNvbnN0IHBhZ2luYXRlZERhdGEgPSBmaWx0ZXJlZERhdGEuc2xpY2Uoc3RhcnRJbmRleCwgc3RhcnRJbmRleCArIHBhZ2VTaXplKTtcbiAgICBzZXRUb3RhbEl0ZW1zKGZpbHRlcmVkRGF0YS5sZW5ndGgpO1xuICAgIHNldERhdGEocGFnaW5hdGVkRGF0YSk7XG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfSwgW2luaXRpYWxEYXRhLCBmaWx0ZXJGdW5jdGlvbiwgY3VycmVudFBhZ2UsIHBhZ2VTaXplXSk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dFBhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykge1xuICAgICAgc2V0Q3VycmVudFBhZ2UoKHByZXZQYWdlKSA9PiBwcmV2UGFnZSArIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQcmV2UGFnZSA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPiAxKSB7XG4gICAgICBzZXRDdXJyZW50UGFnZSgocHJldlBhZ2UpID0+IHByZXZQYWdlIC0gMSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBjdXJyZW50UGFnZSxcbiAgICB0b3RhbFBhZ2VzLFxuICAgIGhhbmRsZU5leHRQYWdlLFxuICAgIGhhbmRsZVByZXZQYWdlLFxuICAgIHNldEN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVBhZ2luYXRpb247XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlUGFnaW5hdGlvbiIsImluaXRpYWxEYXRhIiwiZmlsdGVyRnVuY3Rpb24iLCJwYWdlU2l6ZSIsImRhdGEiLCJzZXREYXRhIiwiY3VycmVudFBhZ2UiLCJzZXRDdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJzZXRUb3RhbEl0ZW1zIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidG90YWxQYWdlcyIsIk1hdGgiLCJjZWlsIiwiZmlsdGVyZWREYXRhIiwic3RhcnRJbmRleCIsInBhZ2luYXRlZERhdGEiLCJzbGljZSIsImxlbmd0aCIsImhhbmRsZU5leHRQYWdlIiwicHJldlBhZ2UiLCJoYW5kbGVQcmV2UGFnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/hooks/usePagination.ts\n"));

/***/ })

});