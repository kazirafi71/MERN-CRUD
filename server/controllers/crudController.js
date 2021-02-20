const Crud = require('../models/CrudModel')

module.exports.all_data_getController = async (req, res, next) => {
    let crud = await Crud.find()
    try {
        return res.status(201).json({
            result: crud
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.one_data_getController = async (req, res, next) => {
    let {
        postId
    } = req.params
    console.log(postId)
    let crud = await Crud.findOne({
        _id: postId
    })
    try {
        return res.status(201).json({
            result: crud
        })
    } catch (error) {
        console.log(error)
    }
}




module.exports.all_data_postController = (req, res, next) => {
    let {
        name,
        email,
        password
    } = req.body
    // console.log(name,email,password)
    let crud = new Crud({
        name,
        email,
        password
    })
    crud.save()
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(e => {
            console.log(e)
        })
}


module.exports.delete_data_postController = async (req, res, next) => {

    let {
        postId
    } = req.params
    console.log(postId)
    let data = await Crud.findByIdAndDelete({
        _id: postId
    })
    try {
        return res.status(201).json({
            result: data
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports.update_data_postController = async (req, res, next) => {
    let {
        postId
    } = req.params
    let {
        name,
        email,
        password
    } = req.body
    let newData = {
        name,
        email,
        password
    }
    console.log(newData)
    console.log(postId)




    let data = await Crud.findByIdAndUpdate({
        _id: postId
    }, {
        $set: {
            name,
            email,
            password
        }
    }, {
        new: true
    })

    try {
        return res.status(201).json({
            result: data
        })
    } catch (error) {
        console.log(error)
    }
}