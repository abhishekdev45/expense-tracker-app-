const User = require('../models/user');
const Expense = require('../models/expense')

exports.getLeaderBoardData = async (req, res) => {
    try {
        const leaderboardData = await User.findAll({
            attributes: ['id' ,'name' ,[sequelize.fn('SUM', sequelize.col('expenseAmount')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: [],
               }   
            ],
            group: ['user.id'],
            order:[['total_cost', 'DESC']]
           
        });

        res.status(200).json(leaderboardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
