import { field, not, value, and, component } from "@quinscape/automaton-js/lib/FilterDSL"


// console.log(
//     JSON.stringify(
//         and(
//             component(null,
//                 and(
//                     not(
//                         field("type").eq(
//                             value(
//                                 "Integer",
//                                 2
//                             )
//                         )
//                     ),
//                     field("name").lt(
//                         value("String", "h")
//                     )
//                 )
//             )
//         ),
//         null,
//         4
//     )
// )

const typeDocs = [
    {
        "name": "AppLogin",
        "description": "Database storage for spring security's remember-me feature",
        "fieldDocs": [
            {
                "name": "lastUsed",
                "description": "Last access of the login"
            },
            {
                "name": "series",
                "description": "Token series"
            },
            {
                "name": "token",
                "description": "Token"
            },
            {
                "name": "username",
                "description": "User name of the login"
            }
        ]
    },
    {
        "name": "AppUser",
        "description": "Application users. Used to authenticate users by spring security. Can have additional fields/relations (See UserInfoService)",
        "fieldDocs": [
            {
                "name": "lastLogin",
                "description": "last login of the user"
            },
            {
                "name": "password",
                "description": "encrypted password"
            },
            {
                "name": "created",
                "description": "Creation date of the user entry"
            },
            {
                "name": "roles",
                "description": "Spring security roles of the user within the application"
            },
            {
                "name": "disabled",
                "description": "true if the user account was disabled"
            },
            {
                "name": "id",
                "description": "user database id"
            },
            {
                "name": "login",
                "description": "User name / login"
            }
        ]
    },
    {
        "name": "AppAttachment",
        "description": "File/image attachments",
        "fieldDocs": [
            {
                "name": "contentId",
                "description": "Optional field to store external content-ids / meta data"
            },
            {
                "name": "description",
                "description": "Description of the attachment, might be former filename"
            },
            {
                "name": "id",
                "description": "attachment id"
            },
            {
                "name": "type",
                "description": "Attachment media type"
            }
        ]
    },
    {
        "name": "AppVersion",
        "description": "Stores merge version metadata",
        "fieldDocs": [
            {
                "name": "fieldMask",
                "description": "DB column 'field_mask'"
            },
            {
                "name": "created",
                "description": "Timestamp when the version was created"
            },
            {
                "name": "entityType",
                "description": "Entity type the version refers to"
            },
            {
                "name": "prev",
                "description": "Previous version for that entity or null"
            },
            {
                "name": "entityId",
                "description": "Id of the entity"
            },
            {
                "name": "id",
                "description": "Id of the version. Is the same as the version field in the entity."
            },
            {
                "name": "ownerId",
                "description": "Foreign key to the user who created the version"
            },
            {
                "name": "owner",
                "description": "User who created the version"
            }
        ]
    },
    {
        "name": "AppConfig",
        "description": "Database backing for the AppScope",
        "fieldDocs": [
            {
                "name": "name",
                "description": "Application name"
            },
            {
                "name": "scope",
                "description": "JSON of the current application scope"
            }
        ]
    },
    {
        "name": "AppUserConfig",
        "description": "Database backing for the UserScope",
        "fieldDocs": [
        ]
    },
    {
        "name": "AppTranslation",
        "description": "Datase backing for the application translations",
        "fieldDocs": [
            {
                "name": "processName",
                "description": "can contain a process name to limit the to just that process"
            },
            {
                "name": "created",
                "description": "creation date of the translation entry"
            },
            {
                "name": "translation",
                "description": "translation text"
            },
            {
                "name": "modified",
                "description": "last modified date for the translation entry"
            },
            {
                "name": "tag",
                "description": "translation tag/key"
            },
            {
                "name": "id",
                "description": "translation id"
            },
            {
                "name": "locale",
                "description": "locale code of the translation'"
            }
        ]
    }
];

typeDocs.sort((a,b) => a.name.localeCompare(b.name));

console.log(JSON.stringify(typeDocs, null, 4));
