const router = require('express').Router()
const accountsModel = require('./accounts-model')
const mw = require('./accounts-middleware')

// //check if "Serkan" is sent to check in postman
// router.get('/',(req,res)=>{
//     res.send("Serkan")
//   })

router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const uniqueId = await accountsModel.getById(req.params.id);
    uniqueId ? res.json(uniqueId):res.status(404).json({ message: "account not found" })
  } catch (error) {
    next(error)
  }
})

router.post('/',mw.checkAccountPayload,mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const insertAccountModel = {
      name:req.body.name,
      budget:req.body.budget
    }
    const insertedData = await accountsModel.create(insertAccountModel)
    res.status(201).json(insertedData)
    
  } catch (error) {
    
  }
})

// router.put('/:id', (req, res, next) => {
//   // KODLAR BURAYA
// });

// router.delete('/:id', (req, res, next) => {
//   // KODLAR BURAYA
// })

// router.use((err, req, res, next) => { // eslint-disable-line
//   // KODLAR BURAYA
// })

module.exports = router;
