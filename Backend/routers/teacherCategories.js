const {TeacherCategory} = require('../models/teacherCategory'); //Takes the teacherCategory from Model class and used here as TeacherCategory
const express = require('express');
const { Teacher } = require('../models/teacher');
const router = express.Router();

//GET ALL METHOD (SEARCH/FIND/READ)
router.get(`/`, async (req, res) =>{
    const teacherCategoryList = await TeacherCategory.find();

    if(!teacherCategoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(teacherCategoryList);
})

//GET BY ID METHOD (READ)
router.get('/:id', async(req,res)=>{
    const teacherCategory = await TeacherCategory.findById(req.params.id);

    if(!teacherCategory) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(teacherCategory);
})

//PUT METHOD (UPDATE)
router.put('/:id',async (req, res)=> {
    const teacherCategory = await TeacherCategory.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!teacherCategory)
    return res.status(400).send('the category cannot be created!')

    res.send(teacherCategory);
})

//POST METHOD (CREATE/NEW)
router.post('/', async (req,res)=>{
    let teacherCategory = new TeacherCategory({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

//(Working on DB side but crashes program first) Come back over and check, 2 methods below 
//2 methods are await and promise 
    teacherCategory = await teacherCategory.save();

    if(!TeacherCategory)
    return res.status(400).send('the category cannot be created!')
 
    res.send(TeacherCategory);
})
/*
teacherCategory.save().then ((createdteacherCategory => {
    res.status(201).json(createdteacherCategory)
})).catch((err)=> {
    res.status(500).json({
        error: err,
        success: false
    })
})
})
*/



//DELETE METHOD (DELETE)
router.delete('/:id', async (req,res)=>{
    //url will be api/v1/teachercategories/IDwhichWillBeDeleted, (working correctly)
//this doesn't use async and await it uses promise with .then which different from the post method above
    //find by id, params finds id from front end and then returns a teacherCateogry Document/Object (=>) 
    TeacherCategory.findByIdAndRemove(req.params.id).then (teacherCategory => {
        if(teacherCategory) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{ //Catches a server error
       return res.status(500).json({success: false, error: err}) 
    })


    })



module.exports =router;