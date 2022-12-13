/**
 * API
 * # routes/api.js
 *
 * @author: Jaime A. Mendez M. <jam65st@gmail.com> (updates 20221209)
 */

const usersPath = "/v1/users",
      {
	      addUserToDB,
	      removeUserFromDB,
	      confirmUserEmailToDB
      }         = require( "../api" + usersPath ),
      router    = require( 'express' ).Router();

/* CREATE: User */
router.post( usersPath,
             (
		             request,
		             response,
		             next // Next Function
             ) => addUserToDB( request, response, next ) );

/* VERIFY; USER email */
router.get( `${ usersPath }/verify/:Id`,
            (
		            request,
		            response,
		            next // Next Function
            ) => confirmUserEmailToDB( request, response, next ) );

/* REMOVE: User */
router.delete( usersPath,
               (
		               request,
		               response,
		               next // Next Function
               ) => removeUserFromDB( request, response, next ) );

module.exports = router;