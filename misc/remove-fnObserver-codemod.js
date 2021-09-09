/**
 * Code mode to rename all fnObserver imports to observer
 *
 */
export default function transformer(file, api) {

    const j = api.jscodeshift;

    return j(file.source)
        .find(j.ImportDeclaration)
        .filter( path => {
            const importDecl = path.value;
            if (importDecl.source.value !== "mobx-react-lite")
            {
                return false;
            }

            const iqImport = importDecl.specifiers.find( spec => {
                return spec.imported.name === "observer" && spec.local.name === "fnObserver";
            })
            if (!iqImport)
            {
                return false;
            }

            return true;
        })
        .replaceWith(path => {

            return j.importDeclaration(
                path.value.specifiers.map( spec => {
                        if (spec.imported.name === "observer")
                        {
                            return j.importSpecifier(j.identifier("observer"),null);
                        }
                        else
                        {
                            return spec;
                        }

                    }
                ),
                j.stringLiteral(path.value.source.value)
            )

        })
        .closest(j.Program)
        .find(j.CallExpression)
        .filter(path => path.value.callee.name === "fnObserver" )
        .replaceWith(path => {
            return j.callExpression(j.identifier("observer"), path.value.arguments)
        })
        .toSource({
            trailingComma: false
        });
}

module.exports.parser = 'babylon';
