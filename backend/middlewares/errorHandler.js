export const errorHandler = (error, req, res, next) => {
    console.log(error);

    if(error.name === "CastError") {
        return res.status(400).json({error: "malformatted id"});
    }

    if(error.name === "ValidationError") {
        return res.status(400).json({error: "Invalid Data", error});
    }

    if(error.name === "ZodError") {
        console.log(error);
        return res.status(400).json({error: `Invalid Inputs ${error}`});
    }

    if(error.name === "JsonWebTokenError") {
        return res.status(400).json({error: "Token Error"});
    }

    res.status(500).json({error});
}