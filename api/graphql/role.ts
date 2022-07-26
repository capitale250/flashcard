import { objectType, extendType, stringArg, nonNull, intArg,list,arg,inputObjectType} from 'nexus'



// role.ts
export const Role = objectType({
    name: 'Role',
    definition(t) {
        t.nonNull.int('id');
        t.string('name');
        t.field('company', {
            type: 'Company',
            resolve: (parent, _, ctx) => {
                return ctx.db.role
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .company();
            },
        });
        t.list.field('skills', {
            type: 'Skill',
            resolve: (parent, _, ctx) => {
                return ctx.db.role
                    .findUnique({
                        where: { id: parent.id || undefined },
                    })
                    .skills();
            },
        });
    },
});
export const RoleMutation = extendType({
    type: 'Mutation',
    definition(t) {
        // create a new company
        t.nonNull.field('createRole', {
            type: 'Role',
            args: {
                id: intArg(),
                name: nonNull(stringArg()),
                contactPerson: nonNull(stringArg()),
                bio: nonNull(stringArg()),
                email: nonNull(stringArg()),
                website: nonNull(stringArg()),
                roleId: intArg(),
                roles: arg({
                    type: list('RoleInputType'),
                }),
            },
            resolve(_root, args, ctx) {
                return ctx.db.company.create({
                    data: {
                        name: args.name,
                        contactPerson: args.contactPerson,
                        bio: args.bio,
                        email: args.email,
                        website: args.website,
                        roles: {
                            connect: [{ id: args.roleId || undefined }],
                        },
                    },
                });
            },
        });
        
    },
});




export const RoleInputType = inputObjectType({
    name: 'RoleInputType',
    definition(t) {
        t.string('name')  
    }
})
