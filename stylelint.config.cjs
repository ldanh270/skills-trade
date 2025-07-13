module.exports = {
    plugins: ['stylelint-order', 'stylelint-scss'],
    customSyntax: 'postcss-scss',
    extends: [],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'order/properties-order': [
            {
                groupName: 'Positioning',
                properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
            },
            {
                groupName: 'Box Model',
                properties: [
                    'display',
                    'width',
                    'height',
                    'margin',
                    'padding',
                    'box-sizing',
                    'overflow',
                    'flex',
                    'grid',
                    'gap',
                ],
            },
            {
                groupName: 'Visual',
                properties: [
                    'background',
                    'border',
                    'border-radius',
                    'box-shadow',
                    'opacity',
                    'visibility',
                ],
            },
            {
                groupName: 'Typography',
                properties: [
                    'font',
                    'font-size',
                    'font-weight',
                    'line-height',
                    'letter-spacing',
                    'text-align',
                    'color',
                ],
            },
            {
                groupName: 'Misc',
                properties: [
                    'transition',
                    'transform',
                    'animation',
                    'cursor',
                    'user-select',
                    'pointer-events',
                    'content',
                ],
            },
        ],
    },
}
