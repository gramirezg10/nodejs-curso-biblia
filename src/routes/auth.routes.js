const { Router } = require('express');

module.exports = function({ AuthController }){
    const router = Router();

    router.post('/singup', AuthController.singUp);
    router.post('/singin', AuthController.singIn);

    return router;
}