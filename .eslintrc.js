module.exports =
    {
        "installedESLint": true,
        "parser": "babel-eslint",
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true,
                "impliedStrict": true
            }
        },
        "plugins": [
            "flowtype",
            "import",
            "jsx-a11y",
            "react"
        ],
        "extends": [
            "eslint:recommended",
            "plugin:import/errors",
            "plugin:import/warnings",
            "plugin:react/recommended",
            "airbnb"
        ],
        "rules": {
            "max-len": ["warn", 200, 4],
            "curly": ["error", "all"],
            "indent": ["warn", 4, {"SwitchCase": 1}],
            "comma-dangle": ["error", "always-multiline"],
            "global-require": "off",
            "no-global-assign": "off",
            "no-unsafe-negation": "off",
            "linebreak-style": "off",
            "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
            "arrow-body-style": ["error", "as-needed"],
            "flowtype/use-flow-type": 1,
            "flowtype/boolean-style": ["error", "boolean"],
            "flowtype/define-flow-type": 1,
            "flowtype/delimiter-dangle": [2, "never"],
            "flowtype/generic-spacing": [2, "never"],
            "flowtype/no-weak-types": 2,
            "flowtype/require-parameter-type": 2,
            "flowtype/require-return-type": [2, "always", {"annotateUndefined": "never"}],
            "flowtype/require-valid-file-annotation": 2,
            "flowtype/semi": [2, "always"],
            "flowtype/space-after-type-colon": [2, "always"],
            "flowtype/space-before-generic-bracket": [2, "never"],
            "flowtype/space-before-type-colon": [2, "never"],
            "flowtype/type-id-match": [2, "^([A-Z][a-z0-9]+)+Type$"],
            "flowtype/union-intersection-spacing": [2, "always"],
            "flowtype/valid-syntax": 1,
            "react/jsx-indent": ["warn", 4],
            "react/jsx-indent-props": ["warn", 4],
            "react/jsx-filename-extension": "off",
            "react/require-extension": "off",
            "react/jsx-equals-spacing": ["error", "never"],
            "react/jsx-curly-spacing": ["warn", "never"],
            "import/no-named-as-default": "off"
        },
        "globals": {
            "fetch": false
        },
        "settings": {
            "flowtype": {
                "onlyFilesWithFlowAnnotation": true
            }
        }
    };
