const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
const Recipe = require('../models/recipe.js')

// starts with /recipes 

router.get('/', async (req, res) => {
    try {   
        // finds the recipes of the user
        const allRecipes = await Recipe.find({ owner: req.session.user._id})
    
        res.render('recipes/index.ejs', {
            recipes: allRecipes,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

// add new recipe
router.get('/new', async (req, res) => {
    try {
        res.render('recipes/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

// add new recipe in database
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

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        res.render('recipes/show.ejs', {
            recipe: recipe,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }

})


router.delete('/:recipeId', async (req, res) => {
    try {
       await Recipe.findByIdAndDelete(req.params.recipeId)

       res.redirect('/recipes')
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

router.get('/:recipeId/edit', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)

        res.render('recipes/edit.ejs', {
            recipe: recipe,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

router.put('/:recipeId', async (req, res) => {
    try {
        const currentRecipe = await Recipe.findById(req.params.recipeId)

        if (currentRecipe.owner.equals(req.session.user._id)){
            await currentRecipe.updateOne(req.body)
            res.redirect(`/recipes/${req.params.recipeId}`)
        }else{
            res.send('You dont have permission to edit this')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }

})
module.exports = router;