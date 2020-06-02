
module.exports.findCalc = function(req,res)
{  
  return res.render('calculator',{
      title: 'Calculator'
  });  
}