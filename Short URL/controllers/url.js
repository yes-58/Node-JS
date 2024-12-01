//const {nanoid} = require('nano-id'); //Using nano-id package to generate any random key of x no of characters.
const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    //Validation : URL present in body object or not.
    if(!body.url){
        return res.status(400).json({msg: 'URL is required.'});
    }
    //const shortID = nanoid(8); //Generating shortID of 8 characters using nanoid package
    const shortID = shortid();
    //Creating URL Entry in Database
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render('home',{id: shortID})
    //return res.json({id: shortID});
}

async function handleRedirectOriginalURL(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(shortId,{$push:{visitHistory:{timestamp: Date.now()}}});
    res.redirect(entry.redirectURL);

}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length, analytics:result.visitHistory});
}

module.exports={handleGenerateNewShortURL,handleRedirectOriginalURL,handleGetAnalytics};