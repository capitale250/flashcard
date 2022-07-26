// // company.ts

// import { arg, extendType, inputObjectType, intArg, list, nonNull, objectType, stringArg } from "nexus";

// export const CompanyInputType = inputObjectType({
//     name: 'CompanyInputType',
//     definition(t) {
//         t.string('name')
//         t.string('contactPerson')
//         t.string('bio')
//         t.string('email')
//         t.string('website')
//         t.list.field('trades', {type: 'TradeInputType'})
//         t.list.field('roles', {type: 'RoleInputType'})
//     }
// })

// export const Company = objectType({
//     name: 'Company',
//     definition(t) {
//         t.nonNull.int('id')
//         t.string('name')
//         t.string('contactPerson')
//         t.string('bio')
//         t.string('email')
//         t.string('website')
//         t.field('industry', {
//             type: 'Industry',
//             resolve: (parent, _, ctx) => {
//                 return ctx.db.company.findUnique({
//                     where: {id: parent.id}
//                 }).industry()
//             }
//         })
//         t.nonNull.list.nonNull.field('trades', {
//             type: 'Trade',
//             resolve: (parent, _, ctx) => {
//                 return ctx.db.company.findUnique({
//                     where: {id: parent.id}
//                 }).trades()
//             }
//         })
//         t.nonNull.list.nonNull.field('roles', {
//             type: 'Role',
//             resolve: (parent, _, ctx) => {
//                 return ctx.db.company.findUnique({
//                     where: {id: parent.id}
//                 }).roles()
//             }
//         })
//     }
// })

// export const CompanyQuery = extendType({
//     type: 'Query',
//     definition(t) {
//         // get all companies
//         t.list.field('companies', {
//             type: 'Company',
//             resolve(_root, _args, ctx) {
//                 return ctx.db.company.findMany()
//             }
//         })
//         // get company by id
//         t.field('company', {
//             type: 'Company',
//             args: {
//                 id: nonNull(intArg())
//             },
//             resolve(_root, args, ctx) {
//                 return ctx.db.company.findUnique({
//                     where: {id: args.id}
//                 })
//             }
//         })
//         t.list.field('trades', {
//             type: 'Trade',
//             resolve(_root, _args, ctx) {
//                 return ctx.db.trade.findMany()
//             }
//         })
//         t.list.field('roles', {
//             type: 'Role',
//             resolve(_root, _args, ctx) {
//                 return ctx.db.role.findMany()
//             }
//         })
//     }
// })

// export const CompanyMutation = extendType({
//     type: 'Mutation',
//     definition(t) {
//         // create a new company
//         t.nonNull.field('createCompany', {
//             type: 'Company',
//             args: {
//                 id: intArg(),
//                 name: nonNull(stringArg()),
//                 contactPerson: nonNull(stringArg()),
//                 bio: nonNull(stringArg()),
//                 email: nonNull(stringArg()),
//                 website: nonNull(stringArg()),
//                 trades: arg({
//                     type: list('TradeInputType'),
//                 }),
//                 roles: arg({
//                     type: list('RoleInputType')
//                 })
//             },
//             resolve(_root, args, ctx) {
//                 const newTrade = args.trades?.map((trade) => {
//                     return { name: trade?.name }
//                   }) || [];
//                   const newRole= args.roles?.map((role) => {
//                     return { name: role?.name }
//                   }) || []
//                 return ctx.db.company.create({
//                     data: {
//                         name: args.name,
//                         contactPerson: args.contactPerson,
//                         bio: args.bio,
//                         email: args.email,
//                         website: args.website,
//                         trades: {
//                             connectOrCreate: {
//                                 where: {
//                                     id: args.id || undefined
//                                 },
//                                 create: newTrade ||undefined
                               
//                             }
//                         },
//                         roles: {
//                             connectOrCreate: {
//                                 where: {
//                                     id: args.id || undefined
//                                 },
//                                 create: newRole ||undefined
                               
//                             }
//                         }
//                     }
//                 })
//             }
//         })
//         // update a company by id
//         t.field('updateCompany', {
//             type: 'Company',
//             args: {
//                 id: nonNull(intArg()),
//                 name: stringArg(),
//                 contactPerson: stringArg(),
//                 bio: stringArg(),
//                 email: stringArg(),
//                 website: stringArg(),
//             },
//             resolve(_root, args, ctx) {
//                 return ctx.db.company.update({
//                     where: {id: args.id},
//                     data: {
//                         name: args.name,
//                         contactPerson: args.contactPerson,
//                         bio: args.bio,
//                         email: args.email,
//                         website: args.website,
//                     }
//                 })
//             }
//         })
//         // delete a company by id
//         t.field('deleteCompany', {
//             type: 'Company',
//             args: {
//                 id: nonNull(intArg())
//             },
//             resolve(_root, args, ctx) {
//                 return ctx.db.company.delete({
//                     where: {id: args.id}
//                 })
//             }
//         })
//     }
// })

// // trade.ts

// export const TradeInputType = inputObjectType({
//     name: 'TradeInputType',
//     definition(t) {
//         t.string('name')
//         t.field('company', {type: 'CompanyInputType'})
//     }
// })

// // role.ts

// export const RoleInputType = inputObjectType({
//     name: 'RoleInputType',
//     definition(t) {
//         t.string('name')
//         t.field('company', {type: 'CompanyInputType'})
//         t.list.field('skills', {type: 'SkillInputType'})
//     }
// })