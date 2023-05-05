const router = require('express').Router();

const cors = require("cors");

const { EmployerSignup, EmployeeSignup, AdminLogin, Login, getAllEmployees, getAllemployersEmployeeByEmploerId, getAllEmployers, getAllEmployeesByEmployerID } = require("./controllers/admincontrollers")
const { profileInsert, updateProfiles, getProfiles } = require('./controllers/profileController')
const { GetEmail, EmailOtp, changePasswordForget } = require('./controllers/forgetpasswordcontrollers')

const { task, getalltasks, getbyemployerid, getbyemployeeid, deletetask, updateschedule, getalltasksWithEmployeeProfileByEmployerId, CreateTimeIn, CreateBreak, CreateTimeOut } = require("./controllers/schedulecontrollers")
const { CreateContact, getContactEmployer, getContactAdmin } = require('./controllers/contactController')
const { CreateLeaveRequest, UpdateRequestStatus, getRequestByEmployerId, getRequestByEmployeeId } = require('./controllers/leaveController')
const { CreateService, UpdateService, getService, getServiceById } = require('./controllers/servicesController')
const { CreateInvoice, getTotalHoursAndInvoiceNo, getInvoicesByEmployeeId, getInvoicesById, sendInvoice, getInvoicesByEmployerId } = require('./controllers/invoiceController')


router.use(cors())

router.post('/EmployerSignup', EmployerSignup)

router.post('/EmployeeSignup', EmployeeSignup)

router.post('/AdminLogin', AdminLogin)

router.post('/Login', Login)

router.post('/profileInsert', profileInsert)

router.post('/updateProfiles', updateProfiles)

router.post('/task', task)

router.get('/getalltasks', getalltasks)

router.get('/getbyemployerid/:id', getbyemployerid)

router.get('/getbyemployeeid/:id', getbyemployeeid)

router.post('/deletetask', deletetask)

router.post('/updateschedule', updateschedule)

router.get('/getAllEmployers', getAllEmployers)

router.get('/getAllEmployees', getAllEmployees)
router.post('/GetEmail', GetEmail)

router.post('/EmailOtp', EmailOtp)

router.post('/changePasswordForget', changePasswordForget)

router.get('/getProfiles/:id', getProfiles)

router.get('/getAllEmployeesByEmployerID/:id', getAllEmployeesByEmployerID)

router.get('/getalltasksWithEmployeeProfileByEmployerId/:employer_id', getalltasksWithEmployeeProfileByEmployerId)

router.get('/getAllemployersEmployeeByEmploerId/:id', getAllemployersEmployeeByEmploerId)

router.post('/CreateContact', CreateContact)

router.get('/getContactEmployer/:id', getContactEmployer)

router.get('/getContactAdmin', getContactAdmin)

router.post('/CreateTimeIn', CreateTimeIn)

router.post('/CreateBreak', CreateBreak)

router.post('/CreateTimeOut', CreateTimeOut)

router.post('/CreateLeaveRequest', CreateLeaveRequest)

router.post('/UpdateRequestStatus', UpdateRequestStatus)

router.get('/getRequestByEmployerId/:employer_id', getRequestByEmployerId)

router.get('/getRequestByEmployeeId/:employee_id', getRequestByEmployeeId)

router.post('/CreateService', CreateService)

router.post('/UpdateService', UpdateService)

router.get('/getService', getService)

router.get('/getServiceById/:id', getServiceById)

router.post('/CreateInvoice', CreateInvoice)

router.get('/getTotalHoursAndInvoiceNo/:employee_id', getTotalHoursAndInvoiceNo)

router.get('/getInvoicesByEmployeeId/:employee_id', getInvoicesByEmployeeId)

router.get('/getInvoicesById/:id', getInvoicesById)

router.post('/sendInvoice', sendInvoice)

router.get('/getInvoicesByEmployerId/:employer_id', getInvoicesByEmployerId)

module.exports = router;