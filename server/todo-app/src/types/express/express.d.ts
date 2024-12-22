// types/express.d.ts

declare namespace Express {
    export interface Request {
        user?: any; // Example custom property
    }
}

// declare module Express {
//     interface Request {
//         user: {
//             id: any;
//         };
//     }
// }