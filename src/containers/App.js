import React, {PropTypes} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as todoActions from '../actions/TodoActions'

const App = ({todos, actions}) => (
    <div>
        <Header addTodo={actions.addTodo}/>
        <MainSection todos={todos} actions={actions}/>
    </div>
)

App.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: {
        addTodo: (text) => dispatch(todoActions.addTodo(text)),
        deleteTodo: (id) => dispatch(todoActions.deleteTodo(id)),
        editTodo: (id, text) => dispatch(todoActions.editTodo(id, text)),
        completeTodo: (id) => dispatch(todoActions.completeTodo(id)),
        completeAll: () => dispatch(todoActions.completeAll()),
        clearCompleted: () => dispatch(todoActions.clearCompleted())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
