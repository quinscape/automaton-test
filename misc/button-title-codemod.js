
function getAttribute(attributes, name)
{
    for (let i = 0; i < attributes.length; i++)
    {
        const attribute = attributes[i]
        if (attribute.name.name === name)
        {
            return attribute.value.value
        }
    }
    return null
}


export default function transformer(file, api) {
    const j = api.jscodeshift;

    return j(file.source)
        .findJSXElements("Button")
        .replaceWith(path => {
            //console.log(path)

            let iconNode, textNode;

            const jsxElement = path.value;
            const {openingElement: {attributes}} = jsxElement;

            const ttAttr = getAttribute(attributes, "tooltip")
            const txtAttr = getAttribute(attributes, "text")
            if (ttAttr && txtAttr && ttAttr === txtAttr)
            {
                console.log("Found in", file.path, "line ", jsxElement.loc.start.line + ", column " + jsxElement.loc.start.column )
            }

            return jsxElement;
        })
        .toSource();
}
