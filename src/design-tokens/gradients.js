/**
 *  * Weather gradient design tokens
  * Each token has:
* - name: semantic identifier
 * - value: actual CSS gradient
  *
* IMPORTANT:
 * UI & logic must reference tokens,
  * never hardcode gradient strings.
*/

export const WEATHER_GRADIENTS = {
  CLEAR: {
name: 'clear',
 value: 'linear-gradient(135deg, #56ccf2, #2f80ed)'
},

  CLOUDY: {
name: 'cloudy',
 value: 'linear-gradient(135deg, #757f9a, #d7dde8)'
},

  RAIN: {
name: 'rain',
 value: 'linear-gradient(135deg, #2c3e50, #4ca1af)'
},

  SNOW: {
name: 'snow',
 value: 'linear-gradient(135deg, #83a4d4, #b6fbff)'
},

  HOT: {
name: 'hot',
 value: 'linear-gradient(135deg, #ff7e00, #ffb347)'
}
}

 