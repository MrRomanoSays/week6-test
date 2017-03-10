const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "todo-app"
const db = new PouchDB(couch_base_uri + couch_dbname)
const {
    map,
    uniq,
    prop,
    omit,
    compose,
    drop
} = require('ramda')

//listTodos
function listTodos(cb) {
    db.allDocs({
        include_docs: true
    }, function(err, todos) {
        if (err) return cb(err)

        //compose showing label and active status
        const result = compose (
          map(obj=>omit('_rev', obj)),
          map(todo=>todo.doc)
        )(todos.rows)

        cb(null, result)
    })
}

//CREATE a new todo

function addTodo(todo, cb) {
    if (checkRequiredFields(todo)) {
        db.put(todo, function(err, addedTodo) {
            if (err) return cb(err)
            cb(null, addedTodo)
        })
    } else {
        cb({
            error: 'User attempted to add a blank todo',
            reason: 'Todo fields must contain text',
            name: 'Blank Todo',
            status: 400,
            message: 'You must enter text in your to do field.'
        })
    }
}


///////////////////////
/// HELPERS FUNCTIONS
///////////////////

function checkRequiredFields(todo) {
    return prop('_id', todo) && prop('label', todo) && prop('active', todo)
}







const dal = {
  listTodos: listTodos,
  addTodo: addTodo
}

module.exports = dal
