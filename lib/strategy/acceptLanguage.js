var acceptLanguage = require('negotiator/lib/language');

/**
 * Stragety =  acceptLanguage
 * This strategy reads the accept-language header from the user request.
 * It uses the great `negotiator` module to determine the best language/locale.
 * Header example: 'en;q=0.8, es, pt'
 *
 */

module.exports = function(options) {
  options = options || {};

  return {
    name: 'acceptLanguage',

    /**
     * acceptLanguage specific function that returns the sorted accepted languages for the user request.
     * @param {Object} req    connect / express request object
     * @returns {Array} sorted accepted languages array
     */
    getLocalesFrom: function(req) {
      if (!req) return false;
      var preferredLocales = acceptLanguage(req.headers['accept-language'], options.locales);
      return preferredLocales;
    },

    /**
     * gets the locale from the given strategy
     *
     * @param {Object} req    connect / express request object
     * @return {String|false}     Locale if the locale was found with the given strategy, otherwise false.
     */
    getLocaleFrom: function(req) {
      if (!req) return false;
      var preferredLocales = getLocalesFrom(req);
      return preferredLocales && preferredLocales[0];
    },

    /**
     * Stores the locale to the given strategy.
     * Note: not all strategies have to implement this. Most likely this is suitable for cookie or session strategy.
     *
     * @param {Object} req    connect / express request object
     * @param {Object} res    connect / express response object
     * @param {String} locale the locale like `en` or `de-CH`
     * @return {Boolean}        true if stored sucessfully, otherwise false
     */
    storeLocaleTo: function(req, res, locale) {
      console.error('i18n acceptLanguage strategy. function storeLocaleTo not implemented');
    }

  };
};

