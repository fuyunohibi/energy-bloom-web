const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
    return new PrismaClient();
};

const globalObj = global;

const prisma = globalObj.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalObj.prismaGlobal = prisma;
}

module.exports = prisma;
