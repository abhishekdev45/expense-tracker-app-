const User = require('../models/user');
const Expense = require('../models/expense')

exports.getLeaderBoardData = async (req, res) => {
    try {
        const leaderboardData = await User.findAll({
            attributes: ['name'],
            include: [{
                model: Expense,
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('expenseAmount')), 'total_cost']
                ],
                group: ['UserId']
            }],
            raw: true
        });

        res.json(leaderboardData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
