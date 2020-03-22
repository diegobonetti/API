'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/customer', 'CustomerController.readAll');

Route.post('/customer', 'CustomerController.create').validator('User');

Route.post('/instructor', 'InstructorController.create');
Route.post('/activity', 'ActivityController.create');

Route.post('/instructor_act', 'InstructorController.addActivity');

Route.post('/class', 'ClassController.create');