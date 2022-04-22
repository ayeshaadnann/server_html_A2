const books = require("../models/book");

module.exports = {
    index: (req, res) => {
        books.find({})
        .then(books => {
        res.render("home", {
        data: books
            })
        })
        .catch(error => {
         console.log(`Error  users not found: ${error.message}`)
        res.redirect("/home");
        });
    },
    load_page: (req, res) => {
        books.find({})
        .then(books => {
        res.render("DeleteABook", {
        data: books
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            res.redirect("/home");
        });
    },
    add: (req, res) => {
        res.render("addNewBook");
    },

    create: (req, res, next) => {
        let bookParams = {
            name: req.body.name,
            author: req.body.author,
            link: req.body.link
        };

        books.create(bookParams)
            .then(user => {
                res.locals.redirect = "/home";
                res.locals.books;
                next(); 
            })
            .catch(error => {
                next(error);
            });
    },

    bookRequest: (req,res, next) => {
        let bookId = req.params.id;
        books.findById(bookId)
            .then(book => {
                res.render("book", {
                    data: book
                })            
            })
            .catch(error => {
                res.redirect ("/home");
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    delete: (req, res, next) => {
        let bookId = req.params.bookId;
        books.findOneAndDelete({book:bookId})
            .then(() => {
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error  can not deleting  book: ${error.message}`);
                next();
            });
    }
};