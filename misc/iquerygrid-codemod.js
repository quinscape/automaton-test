/**
 * Code mode to rename all IQueryGrid imports to DataGrid
 *
 */
export default function transformer(file, api) {

    const j = api.jscodeshift;

    return j(file.source)
        .find(j.ImportDeclaration)
        .filter( path => {
            const importDecl = path.value;
            if (importDecl.source.value !== "@quinscape/automaton-js")
            {
                return false;
            }
            const iqImport = importDecl.specifiers.find( spec => spec.imported.name === "IQueryGrid")
            if (!iqImport)
            {
                return false;
            }

            return true;
        })
        .replaceWith(path => {

            return j.importDeclaration(
                path.value.specifiers.map( spec => {
                    if (spec.imported.name === "IQueryGrid")
                    {
                        const localName = spec.local.name;
                        return j.importSpecifier(j.identifier("DataGrid"),j.identifier(localName));
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
        .toSource({
            trailingComma: false
        });
}

module.exports.parser = 'babylon';
