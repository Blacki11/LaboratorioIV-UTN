class sprintController{
    constructor(){

    }
    async create(req, res){
        try {
            const { title, description } = req.body;
            const task = await Sprint.create({ title, description });
            res.status(201).json(task);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    }
    async getAll(req, res){
        try {

        }
        catch (err) {

        }
    }
    async getOne(req, res){
        try {

        }
        catch (err) {

        }
    }
    async update(req, res){
        try {

        }
        catch (err) {

        }
    }
    async delete(req, res){
        try {

        }
        catch (err) {

        }
    }
}

export default new sprintController();