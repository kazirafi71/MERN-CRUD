const {
    all_data_postController,
    all_data_getController,
    delete_data_postController,
    update_data_postController,
    one_data_getController
} = require('../controllers/crudController')

const router = require('express').Router()

router.get('/get-data', all_data_getController)

router.post('/post-data', all_data_postController)

router.delete('/delete-data/:postId', delete_data_postController)

router.put('/update-data/:postId', update_data_postController)

router.get('/update-data/:postId', one_data_getController)


module.exports = router