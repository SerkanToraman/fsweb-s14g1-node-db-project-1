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

router.get('/:id',mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.existingAccount)
   
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
    next(error)
  }
})

router.put('/:id',mw.checkAccountPayload,mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const updatedAccountModel = {
      name:req.body.name,
      budget:req.body.budget
    }
    const updatedData = await accountsModel.updateById(req.params.id,updatedAccountModel);
    res.status(200).json(updatedData)
    
  } catch (error) {
    next(error)
  }

});

router.delete('/:id',mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json({message : `Account with ${req.params.id} id deleted`})
    
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
  res.status((err.status || 500)).json({
    customMessage:"Global error handler üzerinde hata oluştu",
    message:err.message
  })
})

module.exports = router;
