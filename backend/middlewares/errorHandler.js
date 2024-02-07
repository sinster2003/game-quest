export const errorHandler = (error, req, res, next) => {
    console.log(error.name);

    if(error.name === "CastError") {
        return res.status(400).json({error: "malformatted id"});
    }

    if(error.name === "ValidationError") {
        return res.status(400).json({error: "Invalid Data"});
    }

    if(error.name === "ZodError") {
        return res.status(400).json({error: error.message});
    }

    res.status(500).json({error: "Something went wrong"});
}