
const {Router} = require('express');
const {check} = require('express-validator');
const { upImgPost,getImgPosts,deleteImgPost, getSearchPost } = require('../controllers/uploadImgCtrl');
const { checkInputs } = require('../middlewares/check-inputs');

const router =  Router();

router.post('/', [
    check('label', 'label is required').not().isEmpty(),
    check('urlImg', 'Url is required').not().isEmpty(),
    checkInputs
],upImgPost);

router.get('/', getImgPosts);

router.delete('/:id', 
            [   
                check('id','Id is required').not().isEmpty(),
                check('id','Id is not mongo').isMongoId(),
                checkInputs
            ],deleteImgPost);

router.get('/search/:label', 
    check('label', 'label is required').not().isEmpty(),
    checkInputs
,getSearchPost);

module.exports = router;