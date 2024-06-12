const Product = require('../models/product.js')
const getProduct=async(req,res)=>{
/*   throw new Error("error testing"); */
  const {featured, company, name, sort, fields, numericFilter} = req.query;
  const queryObject = {};
  if(featured){
    queryObject.featured = featured==='true'?true:false;
  }
  if(company){
    queryObject.company = company;
  }
  if(name){
    queryObject.name = { $regex: name, $options:'i' };
  }

  if(numericFilter){
    const operationMap = {
      '<':'$lt',
      '>':'$gt',
      '>=':'$gte',
      '<=':'$lte',
      '=':'$eq'
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g
    let filters = numericFilter.replace(regEx, (match)=>`-${operationMap[match]}-`);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item)=>{
      const [field, operator, value] = item.split('-');
      if(options.includes(field)){
        queryObject[field]={[operator]:Number(value)};
      }
      
    })
  }
  console.log(queryObject);
  let result = Product.find(queryObject);
  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  else{
    result = result.sort('createAt');
  }

  if(fields){
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page-1)*limit;
  result.limit(limit).skip(skip); 
  const product = await result;
  res.json({products:product, nbHits:product.length});
}

const getProductStatic=async(req,res)=>{
  const product = await Product.find({name:'vase table'});
  res.json({products:product, nbHits:product.length});
}

module.exports = {
  getProduct,
  getProductStatic
}