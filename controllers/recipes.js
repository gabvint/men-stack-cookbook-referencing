const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
const Recipe = require('../models/recipe.js')

// starts with /recipes 

router.get('/', async (req, res) => {
    try {   
        const allRecipes = await Recipe.find({}).populate('owner')
    
        res.render('recipes/index.ejs', {
            recipes: allRecipes,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    try {
        res.render('recipes/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body)
        newRecipe.owner = req.session.user._id

        await newRecipe.save()

        res.redirect('/recipes')
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})



module.exports = router;