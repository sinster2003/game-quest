import Customer from '../../models/customers.js';
import Game from '../../models/games.js';
import Shop from '../../models/shops.js';
import Purchase from './../../models/purchases.js';

const buyGame = async (req, res) => {
    // customer_id
    const customerId = req.customer;

    // game_id, shop_id, amount from req.body
    const { gameId } = req.body;

    console.log(gameId);

    const {selling_shop: shopId} = await Game.findById(gameId).select("selling_shop");

    console.log(shopId);

    // validating gameId 
    const isGame = await Game.findById(gameId);

    if(!isGame) {
        return res.status(400).json({message: "Game Not Found"});
    }

    // validating shopId
    const isShop = await Shop.findById(shopId);

    if(!isShop) {
        return res.status(400).json({message: "Shop Not Found"});
    }

    // add purchases to purchase collect
    const purchase = new Purchase({
        customer_id: customerId,
        shop_id: isShop._id,
        game_id: isGame._id,
        amount: isGame.price,
        date_of_purchase: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    });

    await purchase.save();
    
    // refer game_id to customer
    await Customer.findByIdAndUpdate(customerId, {
        $push: {
            games: gameId
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });

    // respond
    res.status(200).json({message: `${isGame.title} Bought successfully`});
}

export default buyGame;