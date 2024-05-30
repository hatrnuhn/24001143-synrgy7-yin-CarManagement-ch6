export const checkMandatoryEnvVars = new Promise<void>((resolve, reject) => {
    const messages: string[] = [];
    if(!process.env.JWT_SECRET) messages.push('Please define a value for JWT_SECRET in the Environment variables');
    if(!process.env.DATABASE_URL?.startsWith('postgres')) messages.push('Please provide a postgres url for DATABASE_URL in the Environment variables');

    if (messages.length > 0) {
        reject(new Error(messages.join('\n')));
    } else {
        resolve();
    }
})
