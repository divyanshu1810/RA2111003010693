"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
function validateRequest(location, schema) {
    return async (req, res, next) => {
        try {
            const validatedSchema = await schema.parseAsync(req[location]);
            req[location] = validatedSchema;
            next();
        }
        catch (error) {
            return res.status(500).json({
                error,
            });
        }
    };
}
exports.validateRequest = validateRequest;
//# sourceMappingURL=index.js.map