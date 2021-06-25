const { request , response } = require('express');

const PostImg = require('../models/postImg');

const upImgPost = async(req = request, res = response) => {

    const {label, urlImg} = req.body; 

    const data = {
        label,
        img:urlImg
    }

    try{
        const postImg = new PostImg(data);
        await postImg.save();

        res.status(201).json({
            ok: true,
            postImg
        });
    }catch(err){
        res.status(400).json(err);
    }

}

const deleteImgPost = async(req = request, res = response) => {

    const {id} = req.params; 

    try{
        console.log(id);
        const postImg = await PostImg.findByIdAndDelete(id);
    
        res.status(201).json({
            ok: true,
            postImg
        });
    }catch(err){
        res.status(400).json(err);
    }

}

const getImgPosts = async(req = request, res = response) => {


    try{
        const postImgs = await (await PostImg.find()).reverse();
        res.status(201).json(postImgs);
    }catch(err){
        res.status(400).json(err);
    }

}

const getSearchPost = async(req = request, res = response) => {

    const {label} = req.params;

    try{
        const postImgs = await PostImg.find({"label":label});
        if(postImgs.length !== 0){
            res.status(201).json({
                ok: true,
                postImgs
            });
        }else{
            res.status(404).json({
                ok: false,
                msg: "not foud"
            });
        }
        
    }catch(err){
        res.status(400).json(err);
    }

}


module.exports = {
    upImgPost,
    getImgPosts,
    deleteImgPost,
    getSearchPost
}