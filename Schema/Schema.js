var mongoose = require('mongoose');
var btoa = require('btoa');
var util = require('../public/utils/utility.js');
var counterSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    count: {type: Number, required: true, defualt: 0}
});

var urlschema = new mongoose.Schema({
    _id: {type: Number},
    url: {type: String},
    shortenUrl : {type : String},
    createdAt : {type: Date, required: true}
});

var URL = mongoose.model('URL', urlschema);
var Counter = mongoose.model('Counter', counterSchema);


urlschema.pre('save', function(next){
    
    console.log('API: --> Performing pre save operations');
    var docs = this;
    Counter.findOneAndUpdate({_id : 'url_count'}, {$inc : { count : 1}}, function(err, counter){
        if(err){
            return console.log('API: --> Some error in incrementing the counter');
        }
        console.log('API: --> Pre save operation complete, saving data now');
        docs._id = counter.count;
        docs.shortenUrl = util.encrypt(counter.count);
        console.log(docs);
        next();
        
    })
    
})

module.exports = {
    URL : URL,
    Counter: Counter
};