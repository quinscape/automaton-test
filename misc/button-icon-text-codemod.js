export default function transformer(file, api) {
    const j = api.jscodeshift;

    return j(file.source)
        .findJSXElements("Button")
        .replaceWith(path => {
            //console.log(path)

            let iconNode, textNode;

            const jsxElement = path.value;
            const {openingElement: {attributes}} = jsxElement;
            const attrs = [];
            for (let i = 0; i < attributes.length; i++)
            {
                if (attributes[i].name.name === "icon")
                {
                    iconNode = attributes[i].value
                }
                else if (attributes[i].name.name === "text")
                {
                    textNode = attributes[i].value
                }
                else
                {
                    attrs.push(attributes[i]);
                }
            }

            //console.log({iconNode, textNode});

            let kids = [];
            if (iconNode)
            {
                kids.push(
                    {type: "JSXText", value: "\n ", raw: "\n "},
                    {
                        "type": "JSXElement",
                        "openingElement": {
                            "type": "JSXOpeningElement",
                            "name": {
                                "type": "JSXIdentifier",
                                "name": "Icon"
                            },
                            "selfClosing": true,
                            "attributes": [
                                {
                                    "type": "JSXAttribute",
                                    "name": {
                                        "type": "JSXIdentifier",
                                        "name": "className"
                                    },
                                    "value": {
                                        "type": "Literal",
                                        "value": iconNode.value,
                                        "raw": iconNode.raw
                                    }
                                }
                            ]
                        },
                        "children": [],
                        "closingElement": null
                    })
            }

            if (textNode)
            {
                if (textNode.type !== "JSXExpressionContainer")
                {
                    textNode.type = "JSXText";
                    textNode.raw = textNode.value;
                }
                kids.push(
                    {type: "JSXText", value: "\n ", raw: "\n "},
                    textNode,
                )
            }
            else
            {
                attrs.push(
                    {
                        "type": "JSXAttribute",
                        "name": {
                            "type": "JSXIdentifier",
                            "name": "text"
                        },
                        "value": {
                            "type": "Literal",
                            "value": "",
                            "raw": "\"\""
                        }
                    }
                );

                console.warn("WARNING: Missing <Button text=\"...\"/> in " + file.path)
            }

            kids.push(
                {type: "JSXText", value: "\n ", raw: "\n "}
            );

            jsxElement.openingElement.attributes = attrs;

            jsxElement.openingElement.selfClosing = false;
            jsxElement.closingElement = {
                type: "JSXClosingElement",
                name: {
                    type: "JSXIdentifier",
                    name: "Button"
                }

            };
            jsxElement.children = kids;
            return jsxElement;
        })
        .toSource();
}
