DevTinder Api List
-authRouter
Post /signup
Post /login
Post /logout

-profileRouter
Get /profile/view
Patch /profile/edit
Patch /profile/password. //forgot password do it your own

-connectionRequestRouter
Post /request/send/intersted/:userId
Post /request/send/ignored/:userId
Post /request/review/accepeted/:requestId
Post /request/review/rejected/:requestId

Post /request/send/:status/:userId
Post /request/review/:status/:requestId

-userRouter

- Get /user/connections
  Get /user/requests/recevived
  Get /user/feed -gets you the profiles of other users on platform

Status : Ignore , intrested ,appacepted, rejected
