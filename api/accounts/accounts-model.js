const db = require('../../data/db-config.js')

const getAll = () => {
  // KODLAR BURAYA
  return db('accounts');
 }

const getById = id => {
  // KODLAR BURAYA
  return db("accounts").where('id',id).first();

}
const getByName = name =>{
  //select * from accounts where name = '{name}' limit 1 --> SQL'de .a[irim methodu
  return db("accounts").where("name",name).first();
}

const create = async (account) => {
  // KODLAR BURAYA

  const [id] = await db("accounts").insert(account)
  return getById(id);

}


// const updateById = (id, account) => {
//   // KODLAR BURAYA



// }

// const deleteById = id => {
//   // KODLAR BURAYA
// }

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  // updateById,
  // deleteById,
}
