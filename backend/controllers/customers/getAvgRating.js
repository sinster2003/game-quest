import Rating from "../../models/ratings.js"

const getAvgRating = async (req, res) => {
  const id = req.params.id;
  
  // aggregate pipeline for avg
  const rating = await Rating.aggregate([
    {
        $group: {
            _id: "$game_id", 
            ratingAvg: {
                $avg: "$rating"
            },
            ratingCount: {
                $count: {}
            }
        }
    }
  ]).exec();

  // average rating for the specified game
  res.status(200).json(rating.find(rating => rating._id.toString() === id));
}

export default getAvgRating