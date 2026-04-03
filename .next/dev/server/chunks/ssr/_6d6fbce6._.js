module.exports = [
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dev$2d$inspector$40$2$2e$0$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_eslint$40$9$2e$39$2e$4_jiti$40$2$2e$6$2e$1_$5f$react$40$19$2e$2$2e$3_typescr_lg76iuwcnyevuxakfsaxi2stmi$2f$node_modules$2f$react$2d$dev$2d$inspector$2f$es$2f$Inspector$2f$Inspector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: {
        default: '新应用 | 扣子编程',
        template: '%s | 扣子编程'
    },
    description: '扣子编程是一款一站式云端 Vibe Coding 开发平台。通过对话轻松构建智能体、工作流和网站，实现从创意到上线的无缝衔接。',
    keywords: [
        '扣子编程',
        'Coze Code',
        'Vibe Coding',
        'AI 编程',
        '智能体搭建',
        '工作流搭建',
        '网站搭建',
        '网站部署',
        '全栈开发',
        'AI 工程师'
    ],
    authors: [
        {
            name: 'Coze Code Team',
            url: 'https://code.coze.cn'
        }
    ],
    generator: 'Coze Code',
    // icons: {
    //   icon: '',
    // },
    openGraph: {
        title: '扣子编程 | 你的 AI 工程师已就位',
        description: '我正在使用扣子编程 Vibe Coding，让创意瞬间上线。告别拖拽，拥抱心流。',
        url: 'https://code.coze.cn',
        siteName: '扣子编程',
        locale: 'zh_CN',
        type: 'website'
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Coze Code | Your AI Engineer is Here',
    //   description:
    //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
    //   // images: [''],
    // },
    robots: {
        index: true,
        follow: true
    }
};
function RootLayout({ children }) {
    const isDev = process.env.COZE_PROJECT_ENV === 'DEV';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        "data-inspector-line": "67",
        "data-inspector-column": "4",
        "data-inspector-relative-path": "src/app/layout.tsx",
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            "data-inspector-line": "68",
            "data-inspector-column": "6",
            "data-inspector-relative-path": "src/app/layout.tsx",
            className: `antialiased`,
            children: [
                isDev && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dev$2d$inspector$40$2$2e$0$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_eslint$40$9$2e$39$2e$4_jiti$40$2$2e$6$2e$1_$5f$react$40$19$2e$2$2e$3_typescr_lg76iuwcnyevuxakfsaxi2stmi$2f$node_modules$2f$react$2d$dev$2d$inspector$2f$es$2f$Inspector$2f$Inspector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Inspector"], {
                    "data-inspector-line": "69",
                    "data-inspector-column": "18",
                    "data-inspector-relative-path": "src/app/layout.tsx"
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 55,
                    columnNumber: 19
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Inspector",
    ()=>Inspector,
    "defaultHotkeys",
    ()=>defaultHotkeys
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Inspector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Inspector() from the server but Inspector is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js <module evaluation>", "Inspector");
const defaultHotkeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call defaultHotkeys() from the server but defaultHotkeys is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js <module evaluation>", "defaultHotkeys");
}),
"[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Inspector",
    ()=>Inspector,
    "defaultHotkeys",
    ()=>defaultHotkeys
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Inspector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Inspector() from the server but Inspector is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js", "Inspector");
const defaultHotkeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call defaultHotkeys() from the server but defaultHotkeys is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js", "defaultHotkeys");
}),
"[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dev$2d$inspector$40$2$2e$0$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_eslint$40$9$2e$39$2e$4_jiti$40$2$2e$6$2e$1_$5f$react$40$19$2e$2$2e$3_typescr_lg76iuwcnyevuxakfsaxi2stmi$2f$node_modules$2f$react$2d$dev$2d$inspector$2f$es$2f$Inspector$2f$Inspector$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dev$2d$inspector$40$2$2e$0$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_eslint$40$9$2e$39$2e$4_jiti$40$2$2e$6$2e$1_$5f$react$40$19$2e$2$2e$3_typescr_lg76iuwcnyevuxakfsaxi2stmi$2f$node_modules$2f$react$2d$dev$2d$inspector$2f$es$2f$Inspector$2f$Inspector$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dev-inspector@2.0.1_@types+react@19.2.14_eslint@9.39.4_jiti@2.6.1__react@19.2.3_typescr_lg76iuwcnyevuxakfsaxi2stmi/node_modules/react-dev-inspector/es/Inspector/Inspector.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dev$2d$inspector$40$2$2e$0$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_eslint$40$9$2e$39$2e$4_jiti$40$2$2e$6$2e$1_$5f$react$40$19$2e$2$2e$3_typescr_lg76iuwcnyevuxakfsaxi2stmi$2f$node_modules$2f$react$2d$dev$2d$inspector$2f$es$2f$Inspector$2f$Inspector$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
];

//# sourceMappingURL=_6d6fbce6._.js.map