/**
 * # routes/users.js
 * @author: jetbrains
 * @author: Jaime A. Mendez M. <jam65st@gmail.com> (updates 20221209)
 */

const router = require( 'express' ).Router();

/* GET users listing. */
router.get( '/',
            (
		            request,
		            response,
		            next // Next Function
            ) =>
            {
	            response.send( 'respond with a resource' );
            }
);

module.exports = router;
