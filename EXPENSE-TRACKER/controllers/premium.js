const User = require('../models/user');

exports.getLeaderBoardData = async (req, res) => {
    try {
        const leaderBoardData = await User.findAll({
            attributes: ['id', 'name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        });

        res.status(200).json({leaderBoardData});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};