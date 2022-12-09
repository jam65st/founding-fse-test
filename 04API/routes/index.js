/**
 * # routes/index.js
 * @author: jetbrains
 * @author: Jaime A. Mendez M. <jam65st@gmail.com> (updates 20221209)
 */

const express = require( 'express' ),
      router  = express.Router();

/* GET home page. */
router.get( '/',
            (
		            request,
		            response,
		            next // Next Function
            ) =>
            {
	            response.render(
			            'index',
			            { title: 'Express' }
	            );
            }
);

module.exports = router;
