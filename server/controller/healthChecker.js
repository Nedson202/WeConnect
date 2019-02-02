/**
 *@class
 */
class HealthChecker {
  /**
    *@param {any} req - request value
    *@param {any} res - response value
    *@return {json} response object gotten
    *@memberof HealthChecker
  */
  static getServerHealth(req, res) {
    return res.status(200).json({
      error: false,
      messsage: 'Health check successful, app is online'
    });
  }
}

export default HealthChecker;
