export const errorHandler = (error, req, res, next) => {
    console.log(error.name);

    if(error.name === "CastError") {
        return res.status(400).json({error: "malformatted id"});
    }

    if(error.name === "ValidationError") {
        return res.status(400).json({error: "Invalid Data", error});
    }

    if(error.name === "ZodError") {
        return res.status(400).json({error: "Invalid Inputs"});
    }

    if(error.name === "JsonWebTokenError") {
        return res.status(400).json({error: "Token Error"});
    }

    res.status(500).json({error});
}