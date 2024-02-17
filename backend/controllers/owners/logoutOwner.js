const logoutOwner = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1
    });

    res.status(200).json({
        message: "User logged out successfully"
    });
}   

export default logoutOwner;