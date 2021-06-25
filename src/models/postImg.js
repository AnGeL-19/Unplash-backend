const {Schema, model} = require('mongoose');

const PostImgShema = Schema({
    label: {
        type: String,
        required: [true, 'label is obligatory']
    },
    img: {
        type: String,
        required: [true, 'image is obligatory']
    }
    
});

PostImgShema.methods.toJSON = function(){
    const {__v, _id ,...postImg } = this.toObject();
    postImg.id = _id;
    return postImg;
}

module.exports = model('PostImg', PostImgShema);